export type Lang = 'te' | 'en' | 'hi';

export type Row = Record<string, any>;

export interface LibraryData {
  books: Row[];
  chapters: Row[];
  videos: Row[];
  languages: Row[];
  leads?: Row[];
}

export const FALLBACK_DATA: LibraryData = { books: [], chapters: [], videos: [], languages: [], leads: [] };
