import { invoke } from "@tauri-apps/api/core";
import { Folder } from "lucide-react";
import { FileIcon } from "./file-icon";
import { Link } from "react-router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { TableCell, TableRow } from "./ui/table";
import { executable } from "@/lib/consts";

export function FileRow({
  file,
  basePath,
}: {
  file: FileEntry;
  basePath: string;
}) {
  const name = file.path
    .replaceAll("\\", "/")
    .replace(`${basePath}/`, "")
    .trim();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TableRow>
          <TableCell className='text-left'>
            {file.is_dir ? (
              <Link
                to={`/files/${file.path}`}
                className='inline-flex gap-4 items-center'
              >
                <Folder className='size-8' /> {name}
              </Link>
            ) : (
              <span
                className='inline-flex gap-4 items-center'
                onDoubleClick={() => {
                  if (executable.includes(file.file_type!)) {
                    invoke("open", { path: file.path });
                  }
                }}
              >
                <FileIcon path={file.path} type={file.file_type!} /> {name}
              </span>
            )}
          </TableCell>
          <TableCell>
            <span className='text-gray-500'>
              {!file.is_dir ? file.file_type : "—"}
            </span>
          </TableCell>
        </TableRow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => navigator.clipboard.writeText(file.path)}
        >
          Copy path
        </ContextMenuItem>
        {!file.is_dir && (
          <ContextMenuItem onClick={() => invoke("open", { path: file.path })}>
            Open with system default
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
