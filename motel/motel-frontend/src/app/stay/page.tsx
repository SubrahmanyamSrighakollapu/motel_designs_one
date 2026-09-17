import type { Metadata } from 'next';
import {PageIntro,RoomCard,Amenities,StayCTA} from '@/components/ui';
import {rooms} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Rooms & Suites | Coastal Accommodation',
  description:
    'Discover our collection of oceanfront terraces, king bedrooms, twin suites, and garden rooms at Marea House Motel.',
  keywords: [
    'coastal rooms',
    'motel suites',
    'oceanfront terrace',
    'king bedroom suite',
    'boutique hotel rooms',
    'beachfront stay',
    'Marea House suites',
  ],
  openGraph: {
    title: 'Rooms & Suites | Marea House Coastal Motel',
    description:
      'Natural textures, thoughtful comforts and room to breathe. Find a coastal room that feels like yours.',
    images: [{ url: '/images/bedroom.png', width: 1200, height: 630, alt: 'Marea House Coastal Suite' }],
  },
};

export default function Stay() {
  return (
    <>
      <div data-reveal="fade-down">
        <PageIntro
          eyebrow="Rooms & suites"
          title="A room for your kind of slow."
          text="Natural textures, thoughtful comforts and room to breathe. Find a place that feels like yours."
        />
      </div>

      <section className="wrap room-grid all-rooms">
        {rooms.map((room, idx) => (
          <div key={room.id} data-reveal="fade-up" data-delay={idx * 150}>
            <RoomCard room={room} />
          </div>
        ))}
      </section>

      <div data-reveal="fade-up">
        <Amenities />
      </div>

      <div data-reveal="zoom-in">
        <StayCTA />
      </div>
    </>
  );
}


