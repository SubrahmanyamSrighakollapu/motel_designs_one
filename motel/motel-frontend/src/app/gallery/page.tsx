import type { Metadata } from 'next';
import {PageIntro,StayCTA} from '@/components/ui';
import Gallery from '@/components/gallery';

export const metadata: Metadata = {
  title: 'Gallery & Photography | Marea House',
  description:
    'Browse our visual gallery of Marea House: coastal rooms, oceanfront views, white poolside terraces, and quiet moments by the sea.',
  keywords: [
    'motel gallery',
    'coastal photography',
    'oceanfront views photo',
    'hotel terrace photos',
    'boutique motel imagery',
    'Marea House gallery',
  ],
  openGraph: {
    title: 'Gallery & Photography | Marea House Boutique Motel',
    description: 'Sunlight, soft textures and a sea that never looks quite the same.',
    images: [{ url: '/images/pool.png', width: 1200, height: 630, alt: 'Marea House Poolside Gallery' }],
  },
};

export default function Page(){return <><PageIntro eyebrow="A glimpse of the good life" title="Wish you were here." text="Sunlight, soft textures and a sea that never looks quite the same."/><section className="wrap section"><Gallery/></section><StayCTA/></>}

