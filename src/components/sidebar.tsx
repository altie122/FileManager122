import { DrivesList } from "./folder-list";

export function Sidebar() {
  return (
    <div className='overflow-y-auto h-[calc(100vh-3rem)] w-full'>
      <DrivesList />
    </div>
  );
}
