import type { Metadata } from 'next';
import Link from 'next/link';
import {PageIntro,TextLink} from '@/components/ui';
import {articles} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Coastal Journal & Stories | Marea House',
  description:
    'Read stories, travel guides, and coastal notes from Marea House. Morning tide routines, seaside dining, and slow living inspiration.',
  keywords: [
    'coastal journal',
    'travel blog',
    'motel stories',
    'ocean living',
    'seaside travel guide',
    'coastal life',
    'Marea House journal',
  ],
  openGraph: {
    title: 'Coastal Journal & Stories | Marea House',
    description:
      'Notes from the coast. Small discoveries, slower days and inspiration for your next escape.',
    images: [{ url: '/images/coast.png', width: 1200, height: 630, alt: 'Marea House Coastal Journal' }],
  },
};

export default function Journal(){return <><PageIntro eyebrow="Stories & guides" title="Notes from the coast." text="Small discoveries, slower days and a little inspiration for your next escape."/><section className="journal-grid wrap section large-journal">{articles.map(a=><article key={a.slug}><Link href={`/journal/${a.slug}`}><img src={a.image} alt={a.category}/><p className="eyebrow">{a.category} · {a.date}</p><h2>{a.title}</h2></Link><p>{a.intro}</p><TextLink href={`/journal/${a.slug}`}>Read story</TextLink></article>)}</section></>}

