import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { FolderNode } from "./folder-node";

export function DrivesList() {
  const [drives, setDrives] = useState<string[]>([]);

  useEffect(() => {
    invoke<string[]>("list_drives").then((drives) => {
      setDrives(drives);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      {drives.map((drive) => (
        <FolderNode
          key={drive}
          entry={{ path: drive, is_dir: true, file_type: null }}
        />
      ))}
    </div>
  );
}