import type { Metadata } from 'next';
import Header from '../components/Header';
import './globals.css';

export const metadata: Metadata = { title: 'Shastrasetu | Spiritual Library', description: 'Shastrasetu spiritual library — books, chapters and video classes.' };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}