import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { executable } from "@/lib/consts";
import { FileIcon as FileIconIcon } from "react-file-icon";
import { Icons } from "./icons";

export function FileIcon({ path, type }: { path: string; type: string }) {
  const [icon, setIcon] = useState<string | null>(null);
  const fileName = path.split("/").pop()![path.split("/").pop()!.length - 1];
  useEffect(() => {
    invoke<string | null>("get_icon", { path }).then((icon) => {
      setIcon(icon);
    });
  }, [path]);
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
