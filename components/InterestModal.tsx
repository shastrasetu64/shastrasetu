'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { Lang, Row } from '../lib/types';
import { rowTitle, t } from '../lib/i18n';
import { postApi } from '../lib/api';

export default function InterestModal({
  book,
  lang,
  onClose,
}: {
  book: Row | null;
  lang: Lang;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [leadLang, setLeadLang] = useState<Lang>(lang);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => setLeadLang(lang), [lang]);

  if (!book) return null;

const selectedBook = book;

async function submit(e: FormEvent) {
  e.preventDefault();
  setBusy(true);
  setMessage(t(lang, 'submitting'));

  try {
    const r = await postApi({
      action: 'submitLead',
      bookId: selectedBook.id,
      bookName: rowTitle(selectedBook, lang),
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      language: leadLang,
    });

    if (!r.success) throw new Error(r.message || 'Failed');

    setMessage(t(lang, 'submitThanks'));
    setName('');
    setMobile('');
    setEmail('');
  } catch {
    setMessage(t(lang, 'submitError'));
  } finally {
    setBusy(false);
  }
}

  return (
    <div className="modal" aria-hidden="false">
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-card interest-modal-card">
        <button
          className="modal-close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-icon">♥</div>

        <h2>{t(lang, 'interestTitle')}</h2>

        <p className="selected-book">
          {rowTitle(book, lang)}
        </p>

        <p className="muted">
          {t(lang, 'interestText')}
        </p>

        <form onSubmit={submit} className="interest-form">
          <div className="interest-fields">
            <label>
              {t(lang, 'name')}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>

            <label>
              {t(lang, 'mobile')}
              <input
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                inputMode="tel"
                autoComplete="tel"
              />
            </label>

            <label>
              {t(lang, 'email')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <label>
              {t(lang, 'leadLanguage')}
              <select
                value={leadLang}
                onChange={(e) =>
                  setLeadLang(e.target.value as Lang)
                }
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
              </select>
            </label>
          </div>

          <button
            className="btn btn-primary full"
            disabled={busy}
            type="submit"
          >
            {t(lang, 'submit')}
          </button>

          <div className="form-message">{message}</div>
        </form>
      </div>
    </div>
  );
}