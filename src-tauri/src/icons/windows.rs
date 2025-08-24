use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;

use windows::core::PCWSTR;
use windows::Win32::Graphics::Gdi::{
    CreateCompatibleBitmap, CreateCompatibleDC, DeleteDC, DeleteObject, GetDIBits,
    GetObjectW, ReleaseDC, SelectObject, GetDC,
    BITMAP, BITMAPINFO, BITMAPINFOHEADER, DIB_RGB_COLORS,
};
use windows::Win32::UI::Shell::{SHGetFileInfoW, SHFILEINFOW, SHGFI_ICON, SHGFI_LARGEICON, SHGFI_USEFILEATTRIBUTES};
use windows::Win32::UI::WindowsAndMessaging::{DestroyIcon, DrawIconEx, HICON, DI_NORMAL};
use windows::Win32::Storage::FileSystem::FILE_ATTRIBUTE_NORMAL;

use image::{ImageBuffer, Rgba};
use image::ImageEncoder;
use base64::{engine::general_purpose, Engine as _};

pub fn get_file_icon(path: &str) -> Option<String> {
    let mut shfi = SHFILEINFOW::default();
    let wide: Vec<u16> = OsStr::new(path).encode_wide().chain(Some(0)).collect();

    unsafe {
      let result = SHGetFileInfoW(
        PCWSTR(wide.as_ptr()),
        FILE_ATTRIBUTE_NORMAL,
        Some(&mut shfi),
        std::mem::size_of::<SHFILEINFOW>() as u32,
        SHGFI_ICON | SHGFI_LARGEICON | SHGFI_USEFILEATTRIBUTES,
    );

        if result == 0 {
            println!("No Result");
            return None;
        }

        let hicon: HICON = shfi.hIcon;
        if hicon.is_invalid() {
            return None;
        }

        // Create a DC and bitmap to draw into
        let hdc_screen = GetDC(None);
        let hdc_mem = CreateCompatibleDC(Some(hdc_screen));
        let hbitmap = CreateCompatibleBitmap(hdc_screen, 32, 32);
        let old = SelectObject(hdc_mem, hbitmap.into());

        // Draw the icon into our bitmap
        let _ = DrawIconEx(hdc_mem, 0, 0, hicon, 32, 32, 0, None, DI_NORMAL);

        // Extract raw pixels
        let mut bmp = BITMAP::default();
        GetObjectW(
            hbitmap.into(),
            std::mem::size_of::<BITMAP>() as i32,
            Some(std::ptr::addr_of_mut!(bmp) as *mut _),
        );

        let mut bmi = BITMAPINFO {
            bmiHeader: BITMAPINFOHEADER {
                biSize: std::mem::size_of::<BITMAPINFOHEADER>() as u32,
                biWidth: 32,
                biHeight: -32, // top-down
                biPlanes: 1,
                biBitCount: 32,
                biCompression: 0,
                ..Default::default()
            },
            ..Default::default()
        };

        let mut pixels = vec![0u8; (32 * 32 * 4) as usize];
        let scanlines = GetDIBits(
            hdc_mem,
            hbitmap,
            0,
            32,
            Some(pixels.as_mut_ptr() as *mut _),
            &mut bmi,
            DIB_RGB_COLORS,
        );
        if scanlines == 0 {
            return None;
        }

        // Convert to ImageBuffer
        let img: ImageBuffer<Rgba<u8>, _> =
            ImageBuffer::from_raw(32, 32, pixels).unwrap();

        // Encode as PNG → base64
        let mut buf = Vec::new();
        let _ = image::codecs::png::PngEncoder::new(&mut buf)
            .write_image(&img, 32, 32, image::ExtendedColorType::Rgba8);

        // Cleanup
        SelectObject(hdc_mem, old);
        let _ = DeleteObject(hbitmap.into());
        let _ = DeleteDC(hdc_mem);
        ReleaseDC(None, hdc_screen);
        let _ = DestroyIcon(hicon);

        Some(general_purpose::STANDARD.encode(buf))
    }
}