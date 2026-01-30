import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronsUpDown, Lock } from "lucide-react";
import { Link } from "react-router";

type FileEntry = {
  path: string;
  is_dir: boolean;
  file_type: string | null;
};

export function FolderNode({ entry }: { entry: FileEntry }) {
  const [children, setChildren] = useState<FileEntry[] | null>(null);
  const [hasChildren, setHasChildren] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(false);

  // Check if folder has children on mount (debounced to avoid many simultaneous calls)
  useEffect(() => {
    if (!entry.is_dir) return;

    // Use a small timeout to debounce rapid checks
    const timeoutId = setTimeout(() => {
      invoke<boolean>("has_child_folders", { path: entry.path })
        .then((result) => {
          setHasChildren(result);
        })
        .catch((err) => {
          console.warn("Permission denied for", entry.path, err);
          setLocked(true);
          setHasChildren(false);
        });
    }, 0); // Use 0ms timeout to defer to next tick, spreading calls

    return () => clearTimeout(timeoutId);
  }, [entry.path, entry.is_dir]);

  async function fetchChildren() {
    if (children !== null || locked) return; // already loaded or locked
    try {
      const entries = await invoke<FileEntry[]>("list_dir", {
        path: entry.path,
      });
      setChildren(entries.filter((e) => e.is_dir));
    } catch (err) {
      console.error("Failed to fetch children for", entry.path, err);
      setLocked(true);
    }
  }

  const name = entry.path.split(/[/\\]/).filter(Boolean).pop() ?? entry.path;

  return (
    <Collapsible
      onOpenChange={(open) => open && fetchChildren()}
      className="border rounded-lg p-1"
    >
      <div className="flex items-center justify-between gap-2 p-1">
        <Link className="text-sm" to={`/files/${entry.path}`}>
          {name}
        </Link>

        {locked ? (
          <Lock className="size-4 text-muted-foreground" />
        ) : hasChildren ? (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-6">
              <ChevronsUpDown className="size-4" />
            </Button>
          </CollapsibleTrigger>
        ) : null}
      </div>

      {hasChildren && !locked && (
        <CollapsibleContent className="pl-1">
          {children ? (
            children.map((child) => (
              <FolderNode key={child.path} entry={child} />
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">(loading…)</p>
          )}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}