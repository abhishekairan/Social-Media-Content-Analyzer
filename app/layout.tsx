import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Text Extractor - Social Media Content Analyzer',
  description: 'Extract text from PDFs and images instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

