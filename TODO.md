# TODO: File Manager Features

## Core File Operations ⚠️ **HIGH PRIORITY**

### Basic CRUD Operations

- [ ] **Delete files/folders** - Implement delete command in Rust backend with confirmation dialog
- [ ] **Rename files/folders** - Add rename functionality (backend + inline editing UI)
- [ ] **Copy files/folders** - Implement copy operation with progress tracking
- [ ] **Move/Cut files/folders** - Implement move operation (cut + paste)
- [ ] **Paste from clipboard** - Handle paste operation for copied/moved files
- [ ] **Undo/Redo** - Track operations and allow undo/redo (maintain operation history)
- [ ] **Trash/Recycle Bin integration** - Move deleted items to system trash instead of permanent delete

### File Operations UI

- [ ] Connect "New File" context menu item to actual `create_file` backend function
- [ ] Connect "New Folder" context menu item to actual `create_folder` backend function
- [ ] Add confirmation dialogs for destructive operations (delete, move)
- [ ] Add progress indicators for long-running operations (copy, move large files)
- [ ] Show error notifications for failed operations

## File Selection & Multi-Selection

- [ ] **Single file selection** - Click to select files (visual feedback)
- [ ] **Multi-select with Ctrl/Cmd** - Select multiple files with modifier key
- [ ] **Range selection with Shift** - Select range of files with shift-click
- [ ] **Select All** - Keyboard shortcut (Ctrl/Cmd+A) to select all files
- [ ] **Deselect All** - Clear selection functionality
- [ ] **Visual selection indicators** - Highlight selected files in table
- [ ] **Batch operations** - Apply operations to multiple selected files

## File Metadata & Display

### Metadata Collection (Backend)

- [ ] Add `size` field to `FileEntry` struct (file size in bytes)
- [ ] Add `modified_date` field to `FileEntry` (last modified timestamp)
- [ ] Add `created_date` field to `FileEntry` (creation date)
- [ ] Add `permissions` field to `FileEntry` (read/write/execute permissions)
- [ ] Update `list_dir` command to include metadata

### Metadata Display (Frontend)

- [ ] Add "Size" column to file table with human-readable format (KB, MB, GB)
- [ ] Add "Date Modified" column with formatted date/time
- [ ] Add "Date Created" column (optional)
- [ ] Add "Permissions" column (optional, for Unix/Linux)
- [ ] Show directory sizes (recursive calculation, with loading state)
- [ ] Update `FileEntry` TypeScript type to include new fields

## Sorting & Filtering

- [ ] **Sort by Name** - Alphabetical sorting (ascending/descending)
- [ ] **Sort by Type** - Sort by file extension
- [ ] **Sort by Size** - Sort by file size
- [ ] **Sort by Date Modified** - Sort by modification date
- [ ] **Sort by Date Created** - Sort by creation date
- [ ] **Clickable column headers** - Click to sort, show sort indicator
- [ ] **Filter/search bar** - Filter files by name (real-time search)
- [ ] **Advanced search** - Search by type, size range, date range
- [ ] **Remember sort preferences** - Save user's preferred sort order

## View Modes

- [ ] **Details/List view** - Current table view (enhance with more columns)
- [ ] **Grid/Icon view** - Tile/grid layout with larger icons
- [ ] **Compact view** - Smaller icons and text
- [ ] **View switcher UI** - Toggle between view modes in navbar/toolbar
- [ ] **Adjustable icon sizes** - Slider to adjust icon size in grid view
- [ ] **Thumbnail preview** - Show image/video thumbnails in grid view

## File Preview

- [ ] **Text file preview** - Show text content in sidebar/preview pane
- [ ] **Image preview** - Display image thumbnails/previews
- [ ] **PDF preview** - Basic PDF preview (if library available)
- [ ] **Video preview** - Show video thumbnail/first frame
- [ ] **Preview pane** - Side panel to show file previews
- [ ] **Quick preview on hover** - Optional hover preview tooltip

## Navigation & History

- [ ] **Back/Forward buttons** - Navigate history like browser back/forward
- [ ] **History tracking** - Maintain navigation history stack
- [ ] **Recent folders** - Quick access to recently visited folders
- [ ] **Bookmarks/Favorites** - Allow users to bookmark frequently used folders
- [ ] **Address bar editing** - Make breadcrumb editable for direct path input
- [ ] **Go to folder dialog** - Dialog to navigate to specific path
- [ ] **History menu** - Dropdown showing navigation history

## Keyboard Shortcuts

- [ ] **Ctrl/Cmd+N** - New file
- [ ] **Ctrl/Cmd+Shift+N** - New folder
- [ ] **F2** - Rename selected file/folder
- [ ] **Delete/Del** - Delete selected files
- [ ] **Ctrl/Cmd+C** - Copy selected files
- [ ] **Ctrl/Cmd+X** - Cut selected files
- [ ] **Ctrl/Cmd+V** - Paste files
- [ ] **Ctrl/Cmd+A** - Select all
- [ ] **Ctrl/Cmd+Z** - Undo
- [ ] **Ctrl/Cmd+Y** - Redo
- [ ] **Backspace** - Go up one directory
- [ ] **F5** - Refresh current directory
- [ ] **F3/Ctrl/Cmd+F** - Focus search bar
- [ ] **Ctrl/Cmd+P** - Quick file search/navigation
- [ ] **Arrow keys** - Navigate file list
- [ ] **Enter** - Open selected file/folder

## Context Menu Enhancements

- [ ] **Cut** - Add cut option to context menu
- [ ] **Copy** - Add copy option (currently only "Copy path")
- [ ] **Paste** - Add paste option (when clipboard has files)
- [ ] **Delete** - Add delete option with confirmation
- [ ] **Rename** - Add rename option
- [ ] **Properties/Info** - Show file properties dialog
- [ ] **Open with...** - Choose application to open file
- [ ] **Show in folder** - Reveal file location (already at location, but could open parent)
- [ ] **Compress** - Add to archive (zip, etc.)
- [ ] **Extract** - Extract archive files
- [ ] **Send to** - Quick actions (email, etc.)

## Drag & Drop

- [ ] **Drag files** - Enable dragging files from file list
- [ ] **Drop files** - Handle dropping files into folders (move/copy)
- [ ] **Drag from external** - Support dragging files from OS file manager into app
- [ ] **Drag to external** - Support dragging files from app to OS file manager
- [ ] **Visual drag feedback** - Show drag overlay/highlight on valid drop zones
- [ ] **Drag preview** - Show preview of items being dragged

## Advanced Features

### File Properties Dialog

- [ ] **Properties window** - Modal/dialog showing detailed file information
- [ ] **File size (with breakdown)** - Show size, size on disk
- [ ] **File location** - Full path display
- [ ] **Dates** - Created, modified, accessed dates
- [ ] **Permissions** - Read/write/execute permissions (Unix)
- [ ] **Attributes** - Hidden, read-only, system file flags
- [ ] **Preview** - Small preview in properties dialog
- [ ] **Edit metadata** - Allow editing some metadata (dates, attributes)

### Compression & Archives

- [ ] **Create archive** - Zip/compress selected files
- [ ] **Extract archive** - Extract zip, tar, rar, etc.
- [ ] **Browse archive** - View contents without extracting
- [ ] **Multiple format support** - Support common archive formats

### Search Functionality

- [ ] **Search bar UI** - Prominent search input in navbar
- [ ] **File name search** - Filter files by name pattern
- [ ] **Content search** - Search inside text files (full-text search)
- [ ] **Advanced search dialog** - Search by multiple criteria
- [ ] **Search results highlighting** - Highlight matching text
- [ ] **Search history** - Remember recent searches

### File Type Associations

- [ ] **Default app settings** - Set default application for file types
- [ ] **Open with dialog** - Choose application to open file
- [ ] **Associate file types** - UI to manage file associations

## UI/UX Enhancements

### Toolbar

- [ ] **Toolbar component** - Add toolbar with common actions (New, Cut, Copy, Paste, Delete, etc.)
- [ ] **Toolbar buttons** - Icon buttons for quick actions
- [ ] **Separator groups** - Organize toolbar buttons logically
- [ ] **Toolbar customization** - Allow users to customize toolbar

### Status Bar

- [ ] **Status bar** - Bottom bar showing current directory info
- [ ] **Item count** - Show number of files/folders in current directory
- [ ] **Selected items** - Show count of selected items
- [ ] **Disk space** - Show free/used disk space
- [ ] **Progress indicator** - Show progress for operations in status bar

### Loading States

- [ ] **Loading spinner** - Show loading state when listing directories
- [ ] **Skeleton loaders** - Show placeholder while loading file list
- [ ] **Error states** - Show error messages for failed operations
- [ ] **Empty states** - Show helpful message when directory is empty

### Accessibility

- [ ] **Keyboard navigation** - Full keyboard support (already partially there)
- [ ] **Screen reader support** - ARIA labels and semantic HTML
- [ ] **Focus management** - Proper focus handling
- [ ] **High contrast mode** - Support high contrast themes

## Performance & Optimization

- [ ] **Virtual scrolling** - For directories with many files (1000+)
- [ ] **Lazy loading** - Load file metadata on demand
- [ ] **Caching** - Cache directory listings and metadata
- [ ] **Debounce search** - Debounce search input to avoid excessive filtering
- [ ] **Background operations** - Run file operations in background threads
- [ ] **Progress cancellation** - Allow canceling long-running operations

## Additional Features (Nice to Have)

### Tabs

- [ ] **Tab support** - Open multiple directories in tabs
- [ ] **New tab** - Open new tab with current/default location
- [ ] **Close tab** - Close tab functionality
- [ ] **Tab switching** - Keyboard shortcuts for tab navigation
- [ ] **Duplicate tab** - Duplicate current tab

### Split View

- [ ] **Split panes** - Two side-by-side directory views
- [ ] **Synchronized navigation** - Sync scroll position
- [ ] **Compare folders** - Visual comparison of two directories

### Cloud Storage (Optional)

- [ ] **Cloud integration** - Support for Google Drive, Dropbox, etc.
- [ ] **Sync status** - Show sync status for cloud files

### File Watching

- [ ] **Watch directory** - Auto-refresh when files change
- [ ] **File system events** - Listen for file system changes
- [ ] **Notification** - Notify user of external changes

### Security

- [ ] **File encryption** - Encrypt/decrypt files (optional)
- [ ] **Secure delete** - Overwrite files before deletion (optional)
- [ ] **Permission management** - Edit file permissions (Unix/Linux)

### Customization

- [ ] **Settings/preferences** - Settings page/dialog
- [ ] **Theme customization** - Beyond light/dark (custom colors)
- [ ] **Layout customization** - Adjustable panel sizes, positions
- [ ] **Column customization** - Show/hide/reorder columns
- [ ] **Icon sets** - Allow custom icon sets

## Bug Fixes & Polish

- [ ] **Path handling** - Ensure consistent path handling across Windows/Unix
- [ ] **Error handling** - Comprehensive error handling with user-friendly messages
- [ ] **Edge cases** - Handle special characters in file names
- [ ] **Unicode support** - Proper Unicode file name handling
- [ ] **Long path support** - Handle very long file paths
- [ ] **Permission errors** - Graceful handling of permission denied errors
- [ ] **Memory leaks** - Ensure no memory leaks in long-running sessions
- [ ] **Performance profiling** - Profile and optimize slow operations

## Documentation

- [ ] **User guide** - Document how to use the file manager
- [ ] **Keyboard shortcuts reference** - List all keyboard shortcuts
- [ ] **README updates** - Update README with features and screenshots
- [ ] **Code comments** - Add comments to complex code sections

## Testing

- [ ] **Unit tests** - Test core file operations
- [ ] **Integration tests** - Test file operations with actual file system
- [ ] **UI tests** - Test user interactions
- [ ] **Cross-platform testing** - Test on Windows, macOS, Linux
- [ ] **Error case testing** - Test error scenarios (permissions, missing files, etc.)

---

## Priority Legend

- ⚠️ **HIGH PRIORITY** - Essential for basic file manager functionality
- Normal priority - Important features for good UX
- Nice to have - Enhancements and advanced features

## Implementation Notes

- Start with core file operations (delete, rename, copy, move) as these are fundamental
- File metadata should be added early as many features depend on it
- File selection is needed before implementing batch operations
- Consider using a state management solution (like Zustand or Redux) for complex state (selection, clipboard, history)
