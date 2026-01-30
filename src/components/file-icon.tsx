import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { executable } from "@/lib/consts";
import { FileIcon as FileIconIcon } from "react-file-icon";
import { Icons } from "./icons";
import { getCachedIcon, setCachedIcon } from "@/lib/icon-cache";

export function FileIcon({ path, type }: { path: string; type: string }) {
  const [icon, setIcon] = useState<string | null | undefined>(getCachedIcon(path));
  const fileName = path.split(/[/\\]/).filter(Boolean).pop() ?? "";

  useEffect(() => {
    // Only fetch icon for executable files (expensive operation)
    // For other files, use the simple icon library
    if (!executable.includes(type)) {
      return;
    }

    // Check cache first
    const cached = getCachedIcon(path);
    if (cached !== undefined) {
      setIcon(cached);
      return;
    }

    // Fetch icon asynchronously
    invoke<string | null>("get_icon", { path })
      .then((fetchedIcon) => {
        setCachedIcon(path, fetchedIcon);
        setIcon(fetchedIcon);
      })
      .catch(() => {
        // On error, cache null so we don't retry
        setCachedIcon(path, null);
        setIcon(null);
      });
  }, [path, type]);

  // Show extracted icon only for executables that have one
  if (executable.includes(type) && icon) {
    return (
      <img
        src={`data:image/png;base64,${icon}`}
        alt='icon'
        className='size-8'
      />
    );
  } else if (Icons[fileName as keyof typeof Icons]) {
    return (
      <span className='size-8'>{Icons[fileName as keyof typeof Icons]}</span>
    );
  } else if (Icons[type as keyof typeof Icons]) {
    return <span className='size-8'>{Icons[type as keyof typeof Icons]}</span>;
  } else {
    return (
      <span className='size-8'>
        <FileIconIcon extension={type} />
      </span>
    );
  }
}
