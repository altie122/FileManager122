use std::path::Path;
use directories::UserDirs;
use serde::Serialize;
use std::fs;

mod icons;

#[derive(Serialize)]
struct FileEntry {
    path: String,
    is_dir: bool,
    file_type: Option<String>,
}

#[tauri::command]
fn get_icon(path: String) -> Option<String> {
    icons::get_file_icon(&path)
}

#[tauri::command]
fn get_desktop_path() -> Option<String> {
    UserDirs::new()
        .and_then(|u| u.desktop_dir().map(|p| p.to_string_lossy().to_string()))
}

#[tauri::command]
fn list_dir(path: String) -> Result<Vec<FileEntry>, String> {
    let entries = fs::read_dir(&path)
        .map_err(|e| e.to_string())?
        .filter_map(|entry| entry.ok())
        .map(|entry| {
            let path_buf = entry.path();
            let is_dir = path_buf.is_dir();
            let file_type = if !is_dir {
                path_buf
                    .extension()
                    .and_then(|ext| ext.to_str())
                    .map(|s| s.to_string())
            } else {
                None
            };

            FileEntry {
                path: path_buf.display().to_string(),
                is_dir,
                file_type,
            }
        })
        .collect();

    Ok(entries)
}

#[tauri::command]
fn open(path: String) -> Result<(), String> {
    open::that(path).map_err(|e| e.to_string())
}


#[tauri::command]
fn has_child_folders(path: String) -> Result<bool, String> {
    let dir = Path::new(&path);

    if !dir.is_dir() {
        return Ok(false);
    }

    let entries = fs::read_dir(dir).map_err(|e| e.to_string())?;

    for entry in entries {
        if let Ok(entry) = entry {
            if entry.path().is_dir() {
                return Ok(true); // found at least one folder
            }
        }
    }

    Ok(false) // no subfolders found
}

#[tauri::command]
fn list_drives() -> Vec<String> {
    list_drives_platform()
}

#[cfg(target_os = "windows")]
fn list_drives_platform() -> Vec<String> {
    use windows::Win32::Storage::FileSystem::GetLogicalDriveStringsW;

    let mut buffer = vec![0u16; 256];
    let len = unsafe { GetLogicalDriveStringsW(Some(&mut buffer)) };

    let mut drives = Vec::new();
    if len > 0 {
        let mut start = 0;
        for i in 0..len as usize {
            if buffer[i] == 0 {
                if start < i {
                    let s = String::from_utf16_lossy(&buffer[start..i]);
                    drives.push(s);
                }
                start = i + 1;
            }
        }
    }
    drives
}

#[cfg(any(target_os = "linux", target_os = "macos"))]
fn list_drives_platform() -> Vec<String> {
    use sysinfo::Disks;

    let mut drives = Vec::new();
    let disks = Disks::new_with_refreshed_list();
    for disk in disks.list() {
        drives.push(disk.mount_point().to_string_lossy().to_string());
    }
    drives
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_desktop_path, list_dir, get_icon, open, has_child_folders, list_drives])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
