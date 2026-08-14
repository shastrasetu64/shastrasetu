# Shastrasetu — Next.js

Modern Next.js version of the existing Shastrasetu Spiritual Library website.

## Preserved functionality
- English / Telugu / Hindi language selector, including immediate language switching without refresh.
- Books → Chapters → Videos navigation.
- Google Sheets / Google Apps Script backend.
- Interest form: name, mobile, email, language and selected book.
- Admin login and CRUD for Books, Chapters, Videos and Languages.
- Interested Users view.
- Local browser cache so the library and book pages can display immediately while fresh data loads in the background.

## Backend
The existing Apps Script Web App is kept as the backend. Set `NEXT_PUBLIC_APPS_SCRIPT_URL` in `.env.local` using the value in `.env.example`.

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Routes
- `/` — Library
- `/book/<book-id>` — Book / Chapters / Videos
- `/admin` — Admin dashboard

## Important
The existing static website is not modified. This project is a separate Next.js version so the working site can remain as a backup while the new version is tested.
