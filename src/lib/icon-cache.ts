// Simple icon cache to avoid repeated expensive icon fetches
const iconCache = new Map<string, string | null>();

export function getCachedIcon(path: string): string | null | undefined {
  return iconCache.get(path);
}

export function setCachedIcon(path: string, icon: string | null): void {
  iconCache.set(path, icon);
}

export function clearIconCache(): void {
  iconCache.clear();
}

