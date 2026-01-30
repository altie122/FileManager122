import { FileList } from "@/components/file-list";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./components/ui/context-menu";
import { useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";

export default function Page() {
  let params = useParams();
  const path = params["*"];
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <main className='overflow-y-auto h-[calc(100vh-3rem)]'>
          <FileList />
        </main>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuItem onClick={() => invoke("open_in_code", { path })}>
          Open with Code
        </ContextMenuItem>
        <ContextMenuItem onClick={() => invoke("open_in_cursor", { path })}>
          Open with Cursor
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
