import { LibraryData } from './types';

const KEY = 'shastrasetu_library_cache_v2';

export function readCache(): LibraryData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem('shastrasetu_library_cache_v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.data || null;
  } catch { return null; }
}

export function writeCache(data: LibraryData) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), data })); } catch {}
}
