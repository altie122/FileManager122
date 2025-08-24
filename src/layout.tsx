import { Outlet } from "react-router";
import { Navbar } from "./components/navbar";
import { DrivesList } from "./components/folder-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState, useCallback } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { ImperativePanelGroupHandle } from "react-resizable-panels";

export function BaseLayout() {
  const [initialLayout, setInitialLayout] = useState<number[] | null>(null);
  const groupRef = useRef<ImperativePanelGroupHandle>(null);
  const storeRef = useRef<Store | null>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load store + layout once
  useEffect(() => {
    async function init() {
      const store = await Store.load("store.json");
      storeRef.current = store;

      const storedLayout = await store.get<number[]>("layout");
      if (storedLayout) {
        setInitialLayout(storedLayout);
      } else {
        setInitialLayout([20, 80]); // default
      }
    }
    init();
  }, []);

  // Apply layout once after load
  useEffect(() => {
    if (initialLayout && groupRef.current) {
      groupRef.current.setLayout(initialLayout);
    }
  }, [initialLayout]);

  // Debounced save
  const saveLayout = useCallback((sizes: number[]) => {
    if (!storeRef.current) return;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(async () => {
      await storeRef.current?.set("layout", sizes);
      await storeRef.current?.save();
      console.log("Layout saved:", sizes);
    }, 300);
  }, []);

  // Handle layout changes
  const handleLayoutChange = (sizes: number[]) => {
    saveLayout(sizes);
  };

  // Don’t render until we know the initial layout
  if (!initialLayout) {
    return null;
  }
  return (
    <div className='flex flex-col h-dvh'>
      <Navbar />
      <ResizablePanelGroup
        ref={groupRef}
        direction='horizontal'
        className='h-[calc(100vh-3rem)] w-full'
        onLayout={handleLayoutChange}
      >
        <ResizablePanel defaultSize={initialLayout[0]} minSize={20}>
          <DrivesList />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={initialLayout[1]}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
