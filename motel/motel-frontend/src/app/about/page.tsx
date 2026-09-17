import type { Metadata } from 'next';
import {PageIntro,StayCTA} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Our Story & Philosophy | Marea House',
  description:
    'Learn about Marea House: a boutique coastal motel built around unhurried stays, natural materials, coastal connection, and warm hospitality.',
  keywords: [
    'boutique motel story',
    'coastal hospitality',
    'Marea House story',
    'unrushed hospitality',
    'sustainable coastal hotel',
    'boutique getaway philosophy',
  ],
  openGraph: {
    title: 'Our Story & Philosophy | Marea House Boutique Motel',
    description: 'We believe a good stay should leave you feeling like yourself again.',
    images: [{ url: '/images/coast.png', width: 1200, height: 630, alt: 'Marea House Philosophy' }],
  },
};

export default function About() {
  return (
    <>
      <div data-reveal="fade-down">
        <PageIntro
          eyebrow="The Marea House way"
          title="Less hurry. More here."
          text="We believe a good stay should leave you with more than photographs. It should leave you feeling like yourself again."
        />
      </div>

      <section className="wrap story-row">
        <img src="/images/coast.png" alt="Timber coastal terraces and ocean views" data-reveal="fade-right" />
        <div data-reveal="fade-left">
          <p className="eyebrow">Thoughtful by nature</p>
          <h2>A small place.<br />A slower rhythm.</h2>
          <p>Marea House brings together the easy welcome of a classic coastal motel and the quiet comfort of a boutique stay. Natural materials, gentle colours and open spaces keep the focus on what is outside.</p>
          <p>We make room for simple pleasures: a fresh morning coffee, a swim before lunch and an evening with nowhere else to be.</p>
        </div>
      </section>

      <section className="values wrap section">
        {[
          ['01', 'Comfort, without fuss', 'Everything you need to settle in, with thoughtful details that make a difference.'],
          ['02', 'Connected to the coast', 'Days shaped by the sea, the light and the independent places around us.'],
          ['03', 'A personal welcome', 'Useful local suggestions, friendly faces and time to help you find your pace.'],
        ].map(([n, t, p], idx) => (
          <div key={n} data-reveal="fade-up" data-delay={idx * 160}>
            <p className="eyebrow">{n}</p>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </section>

      <div data-reveal="zoom-in">
        <StayCTA />
      </div>
    </>
  );
}


