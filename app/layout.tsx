import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Design Studio — Build by contract',
  description: 'A shared visual workspace for humans and agents, governed by DESIGN.md.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"><body>{children}</body>
    </html>
  );
}
