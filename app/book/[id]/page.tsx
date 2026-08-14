'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import InterestModal from '../../../components/InterestModal';
import type { Lang, LibraryData, Row } from '../../../lib/types';
import { getStoredLang, rowDescription, rowTitle, t } from '../../../lib/i18n';
import { getAllData } from '../../../lib/api';
import { readCache, writeCache } from '../../../lib/cache';

export default function BookPage({params}:{params:Promise<{id:string}>}){
  const [id,setId]=useState(''); const [lang,setLang]=useState<Lang>('te'); const [data,setData]=useState<LibraryData>({books:[],chapters:[],videos:[],languages:[]});
  const [selected,setSelected]=useState<Row|null>(null); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{params.then(p=>setId(p.id));},[params]);
  useEffect(()=>{
    setLang(getStoredLang()); const cached=readCache(); if(cached){setData(cached);setLoading(false);}
    const handler=(e:any)=>setLang(e.detail as Lang); window.addEventListener('shastrasetu-language',handler);
    getAllData().then(d=>{setData(d);writeCache(d);setLoading(false)}).catch(()=>{setLoading(false);if(!cached)setError('Could not load this book.')});
    return ()=>window.removeEventListener('shastrasetu-language',handler);
  },[]);
  const book=data.books.find(x=>String(x.id)===String(id));
  const chapters=useMemo(()=>data.chapters.filter(c=>String(c.bookId)===String(id)&&String(c.active).toLowerCase()!=='false').sort((a,b)=>Number(a.chapterNumber)-Number(b.chapterNumber)),[data.chapters,id]);
  const videos=data.videos.filter(v=>String(v.bookId)===String(id)&&String(v.active).toLowerCase()!=='false');
  if(loading&&!book) return <main className="detail-page"><Link href="/" className="back-link">{t(lang,'back')}</Link><div className="status" style={{marginTop:25}}>{t(lang,'statusLoading')}</div></main>;
  if(!book) return <main className="detail-page"><Link href="/" className="back-link">{t(lang,'back')}</Link><div className="status error" style={{marginTop:25}}>{error||t(lang,'bookNotFound')}</div></main>;
  return <main className="detail-page"><Link href="/" className="back-link">{t(lang,'back')}</Link><section className="detail-head"><img className="detail-cover" src={book.image||'/assets/placeholder-book.svg'} alt={rowTitle(book,lang)}/><div><h1 className="detail-title">{rowTitle(book,lang)}</h1><p className="muted">{book.title_en||''}</p><p>{rowDescription(book,lang)}</p><button className="btn btn-primary" onClick={()=>setSelected(book)}>♥ {t(lang,'interest')}</button></div></section><section style={{marginTop:45}}><h2>{t(lang,'chapters')}</h2>{chapters.map(c=>{const vs=videos.filter(v=>String(v.chapterId)===String(c.id)).sort((a,b)=>Number(a.sortOrder)-Number(b.sortOrder));return <div className="chapter" key={String(c.id)}><div className="chapter-head">{lang==='en'?'Chapter':lang==='te'?'అధ్యాయం':'अध्याय'} {c.chapterNumber} — {rowTitle(c,lang)}</div>{!vs.length&&<div className="video-row muted">{t(lang,'noVideos')}</div>}{vs.map(v=><div className="video-row" key={String(v.id)}><span>{rowTitle(v,lang)}</span><a href={v.videoUrl} target="_blank" rel="noopener noreferrer">{t(lang,'watch')}</a></div>)}</div>})}</section><InterestModal book={selected} lang={lang} onClose={()=>setSelected(null)}/></main>;
}
