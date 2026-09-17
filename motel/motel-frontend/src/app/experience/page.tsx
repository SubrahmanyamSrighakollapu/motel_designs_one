import type { Metadata } from 'next';
import {PageIntro,StayCTA} from '@/components/ui';
import {experiences} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Coastal Experiences | Surf, Dining & Nature',
  description:
    'Explore curated coastal experiences around Marea House: ocean surf, local seafood dining, scenic headland walks, and tranquil poolside relaxation.',
  keywords: [
    'coastal experiences',
    'surf accommodation',
    'seaside dining',
    'scenic coastal walks',
    'nature trails',
    'ocean getaway activities',
    'Marea House activities',
  ],
  openGraph: {
    title: 'Coastal Experiences | Marea House Boutique Motel',
    description:
      'Do a little. Feel a lot. Follow your curiosity, chase the light, or stay right by the ocean.',
    images: [{ url: '/images/coast.png', width: 1200, height: 630, alt: 'Coastal Experience at Marea House' }],
  },
};

export default function Experience() {
  return (
    <>
      <div data-reveal="fade-down">
        <PageIntro
          eyebrow="Out here, life feels different"
          title="Do a little. Feel a lot."
          text="Follow your curiosity, chase the light or stay exactly where you are. There is no wrong way to spend a coastal day."
        />
      </div>

      <div className="wrap">
        {experiences.map((x, i) => (
          <section className={`story-row ${i % 2 ? 'reverse' : ''}`} key={x.slug} id={x.slug}>
            <img
              src={x.image}
              alt={`${x.label} at the coast`}
              loading="lazy"
              data-reveal={i % 2 === 0 ? 'fade-right' : 'fade-left'}
            />
            <div data-reveal={i % 2 === 0 ? 'fade-left' : 'fade-right'}>
              <p className="eyebrow">0{i + 1} / {x.label}</p>
              <h2>{x.title}</h2>
              <p className="lead">{x.text}</p>
              <p>{x.detail}</p>
            </div>
          </section>
        ))}
      </div>

      <div data-reveal="zoom-in">
        <StayCTA />
      </div>
    </>
  );
}


