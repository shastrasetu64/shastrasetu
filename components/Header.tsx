'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Lang } from '../lib/types';
import { getStoredLang, t } from '../lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>('te');
  useEffect(() => setLang(getStoredLang()), []);
  function change(value: Lang) {
    setLang(value);
    localStorage.setItem('shastrasetu_lang', value);
    window.dispatchEvent(new CustomEvent('shastrasetu-language', { detail: value }));
  }
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/"><div className="brand-mark">ॐ</div><div><div className="brand-name">Shastrasetu</div><div className="brand-sub">{t(lang,'brandSub')}</div></div></Link>
    <nav className="top-nav"><Link className={pathname === '/' ? 'active' : ''} href="/">{t(lang,'navLibrary')}</Link><Link className={pathname?.startsWith('/admin') ? 'active' : ''} href="/admin">{t(lang,'navAdmin')}</Link></nav>
    <div className="language-picker"><label htmlFor="languageSelect">{t(lang,'language')}</label><select id="languageSelect" value={lang} onChange={e=>change(e.target.value as Lang)}><option value="en">English</option><option value="te">తెలుగు</option><option value="hi">हिन्दी</option></select></div>
  </div></header>;
}
