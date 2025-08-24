import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Link } from "react-router";

export function FolderNode({ entry }: { entry: FileEntry }) {
  const [children, setChildren] = useState<FileEntry[] | null>(null);

  async function fetchChildren() {
    if (children !== null) return; // already loaded
    try {
      const entries = await invoke<FileEntry[]>("list_dir", {
        path: entry.path,
      });
      setChildren(entries.filter((e) => e.is_dir));
    } catch (err) {
      console.error("Failed to fetch children for", entry.path, err);
    }
  }

  const name = entry.path.split(/[/\\]/).filter(Boolean).pop() ?? entry.path;

  return (
    <Collapsible onOpenChange={(open) => open && fetchChildren()}>
      <div className="flex items-center justify-between gap-2 pl-4">
        <Link className="text-sm" to={`/${entry.path}`}>
          {name}
        </Link>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-6">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="pl-1">
        {children ? (
          children.map((child) => (
            <FolderNode key={child.path} entry={child} />
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic">(loading…)</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}