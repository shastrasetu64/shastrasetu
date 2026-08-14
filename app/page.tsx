'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import InterestModal from '../components/InterestModal';
import type { Lang, LibraryData, Row } from '../lib/types';
import { getStoredLang, rowTitle, t } from '../lib/i18n';
import { getAllData } from '../lib/api';
import { readCache, writeCache } from '../lib/cache';

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('te'); const [data, setData] = useState<LibraryData>({ books: [], chapters: [], videos: [], languages: [] });
  const [query, setQuery] = useState(''); const [selected, setSelected] = useState<Row | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => {
    const initial = getStoredLang(); setLang(initial); const cached = readCache();
    if (cached) { setData(cached); setLoading(false); }
    const handler = (e: any) => setLang(e.detail as Lang); window.addEventListener('shastrasetu-language', handler);
    getAllData().then(d => { setData(d); writeCache(d); setLoading(false) }).catch(() => { setLoading(false); setError(cached ? '' : 'The library could not connect to the database yet. Please check the Web App deployment.') });
    return () => window.removeEventListener('shastrasetu-language', handler);
  }, []);
  const books = useMemo(() => data.books.filter(b => String(b.active).toLowerCase() !== 'false' && [b.title_te, b.title_en, b.title_hi].join(' ').toLowerCase().includes(query.trim().toLowerCase())), [data.books, query]);
  const allActive = data.books.filter(b => String(b.active).toLowerCase() !== 'false').length;
  return <>
    <main>
      <section className="hero"><div className="hero-inner"><div><span className="eyebrow">SHASTRASETU</span><h1>{t(lang, 'heroTitle')}</h1><p>{t(lang, 'heroText')}</p><div className="hero-actions"><a className="btn btn-primary" href="#library">{t(lang, 'browse')}</a><button className="btn btn-soft" onClick={() => books[0] && setSelected(books[0])}>{t(lang, 'interest')}</button></div></div><div className="hero-card"><div className="hero-card-icon">📚</div><strong>{allActive}</strong><span>{t(lang, 'books')}</span></div></div></section>
      <section className="toolbar section" id="library"><div><h2>{t(lang, 'lib')}</h2><p className="muted">{t(lang, 'sub')}</p></div><div className="search-wrap"><span>⌕</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t(lang, 'search')} /></div></section>
      <section className="section"><div className="status">{loading ? t(lang, 'statusLoading') : books.length ? (lang === 'te' ? `${books.length} పుస్తకాలు` : lang === 'hi' ? `${books.length} पुस्तकें` : `${books.length} book(s)`) : lang === 'te' ? 'పుస్తకాలు కనబడలేదు.' : lang === 'hi' ? 'कोई पुस्तक नहीं मिली।' : 'No books found.'}</div>{error && <div className="status error">{error}</div>}
        <div className="book-grid">{books.map(book => <article className="book-card" key={String(book.id)}><Link href={`/book/${encodeURIComponent(book.id)}`} aria-label={rowTitle(book, lang)}><img
          className="book-cover"
          src={
            book.image ||
            (String(book.title_en || '').toLowerCase().includes('on the way to krishna')
              ? '/books/book-cover.jpg'
              : '/assets/placeholder-book.svg')
          }
          alt={rowTitle(book, lang)}
        /></Link><div className="book-title">{rowTitle(book, lang)}</div><div className="book-meta">{book.title_en || ''}</div><div className="book-actions"><Link className="small-btn" href={`/book/${encodeURIComponent(book.id)}`}>{t(lang, 'view')}</Link><button className="small-btn" onClick={() => setSelected(book)}>♥ {t(lang, 'interest')}</button></div></article>)}{!books.length && !loading && <div className="empty">{t(lang, 'noBooks')}</div>}</div>
      </section>
    </main><footer className="footer"><div>© {new Date().getFullYear()} Shastrasetu</div><div>{t(lang, 'brandSub')}</div></footer>
    <InterestModal book={selected} lang={lang} onClose={() => setSelected(null)} />
  </>;
}
