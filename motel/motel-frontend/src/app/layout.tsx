import type {Metadata} from 'next';
import {Header,Footer} from '@/components/site-shell';
import {ScrollObserver} from '@/components/scroll-observer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mareahouse.com.au'),
  icons: { icon: '/icon.svg' },
  title: {
    default: 'Marea House | Boutique Coastal Motel & Escapes',
    template: '%s | Marea House Boutique Motel',
  },
  description:
    'Boutique stays. Unrushed days. Discover thoughtful coastal rooms, ocean air, beachfront luxury, and the freedom to unwind at Marea House.',
  keywords: [
    'Marea House',
    'coastal motel',
    'boutique hotel',
    'oceanfront accommodation',
    'beach resort',
    'luxury suite stay',
    'coastal getaway',
    'coastal escapes',
    'hotel booking',
    'unrushed travel',
  ],
  authors: [{ name: 'Marea House Coastal Motel' }],
  creator: 'Marea House Hospitality Group',
  publisher: 'Marea House',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://mareahouse.com.au',
    siteName: 'Marea House Boutique Motel',
    title: 'Marea House | Boutique Coastal Motel & Escapes',
    description:
      'Boutique stays. Unrushed days. Discover thoughtful coastal rooms, ocean air, and serene stays at Marea House.',
    images: [
      {
        url: '/images/oceanfront-terrace.webp',
        width: 1200,
        height: 630,
        alt: 'Marea House Boutique Coastal Motel Hero View',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marea House | Boutique Coastal Motel',
    description:
      'Boutique stays. Unrushed days. Discover thoughtful coastal rooms and ocean breeze at Marea House.',
    images: ['/images/oceanfront-terrace.webp'],
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <ScrollObserver />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header/>
        <main id="main">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}


