import { Link, useNavigate, useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import { FileIcon } from "./file-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { executable } from "@/lib/consts";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function FileList() {
  let navigate = useNavigate();
  const params = useParams();
  const path = params["*"];
  const [files, setFiles] = useState<FileEntry[]>([]);
  useEffect(() => {
    const formattedPath = `${path}/`;
    invoke<FileEntry[]>("list_dir", { path: formattedPath }).then((files) => {
      setFiles(files.sort((a, b) => (a.is_dir ? 1 : 2) - (b.is_dir ? 1 : 2)));
    });
  }, [path]);
  if (path === "" || !path) {
    invoke<string>("get_desktop_path").then((path) => {
      navigate(`/${path}`);
    });
  }
  return (
    <Table className='w-full'>
      <TableHeader className='font-black text-lg'>
        <TableRow>
          <TableHead className='text-left'>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => {
          if (file.is_dir) {
            return (
              <ContextMenu key={index}>
                <ContextMenuTrigger asChild>
                  <TableRow>
                    <TableCell className='text-left'>
                      <Link
                        to={`/${file.path}`}
                        className='inline-flex gap-4 items-center'
                      >
                        <Folder className='size-8' />{" "}
                        {file.path
                          .replaceAll("\\", "/")
                          .replace(`${path}/`, "")
                          .trim()}
                      </Link>
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => navigator.clipboard.writeText(file.path)}
                  >
                    Copy path
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          }
          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger asChild>
                <TableRow>
                  <TableHead className='text-left'>
                    <span
                      className='inline-flex gap-4 items-center'
                      onDoubleClick={() => {
                        if (executable.includes(file.file_type!)) {
                          invoke("open", { path: file.path }).then((result) => {
                            console.log(result);
                          });
                        }
                      }}
                    >
                      <FileIcon path={file.path} type={file.file_type!} />{" "}
                      {file.path
                        .replaceAll("\\", "/")
                        .replace(`${path}/`, "")
                        .trim()}
                    </span>
                  </TableHead>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => navigator.clipboard.writeText(file.path)}
                >
                  Copy path
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    invoke("open", { path: file.path }).then((result) => {
                      console.log(result);
                    })
                  }
                >
                  Open with system default
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </TableBody>
    </Table>
  );
}
