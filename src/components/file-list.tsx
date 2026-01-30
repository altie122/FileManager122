import { useNavigate, useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FileRow } from "./file-row";

type FileEntry = {
  path: string;
  is_dir: boolean;
  file_type: string | null;
};

export function FileList() {
  let navigate = useNavigate();
  const params = useParams();
  const path = params["*"];
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path || path === "files") {
      setLoading(true);
      invoke<string>("get_desktop_path").then((desktopPath) => {
        navigate(`/files/${desktopPath}`);
      });
      return;
    }

    setLoading(true);
    const formattedPath = `${path}/`;
    invoke<FileEntry[]>("list_dir", { path: formattedPath })
      .then((files) => {
        const sorted = files.sort(
          (a, b) => (a.is_dir ? 1 : 2) - (b.is_dir ? 1 : 2)
        );
        setFiles(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to list directory:", error);
        setFiles([]);
        setLoading(false);
      });
  }, [path, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <Table className='w-full'>
      <TableHeader className='font-black text-lg'>
        <TableRow>
          <TableHead className='text-left'>Name</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <FileRow key={file.path} file={file} basePath={path!} />
        ))}
      </TableBody>
    </Table>
  );
}
