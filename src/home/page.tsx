import { FileList } from "@/components/file-list";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";

export default function HomePage() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <main className='overflow-y-auto h-[calc(100vh-3rem)]'>
          <h1>Home</h1>
        </main>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
