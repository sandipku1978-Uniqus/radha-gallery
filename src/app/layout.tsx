import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Radha Khetan — Art Gallery',
    template: '%s | Radha Khetan',
  },
  description:
    'Original abstract and nature-inspired paintings by Radha Khetan. Explore the gallery, discover available works, and bring art into your space.',
  keywords: ['art', 'paintings', 'abstract art', 'nature art', 'Radha Khetan', 'gallery', 'original paintings'],
  authors: [{ name: 'Radha Khetan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Radha Khetan Art Gallery',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
