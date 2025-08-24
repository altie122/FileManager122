import { FileList } from "@/components/file-list";

export default function Page() {
  return (
    <main className="overflow-y-auto h-[calc(100vh-3rem)]">
      <FileList />
    </main>
  );
}
