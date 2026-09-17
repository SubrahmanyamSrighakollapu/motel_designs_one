import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Compass, Coffee, Waves, Star } from 'lucide-react';
import { AvailabilityBar } from '@/components/availability-bar';
import { Amenities, RoomCard, TextLink } from '@/components/ui';
import { rooms, experiences, articles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Marea House | Boutique Coastal Motel & Escapes',
  description:
    'Experience boutique coastal accommodation at Marea House. Unrushed oceanfront stays, poolside luxury, curated rooms, and fresh ocean air.',
  keywords: [
    'coastal motel',
    'boutique hotel',
    'Marea House',
    'oceanfront accommodation',
    'beach resort',
    'coastal escapes',
    'boutique rooms',
    'luxury suite stay',
  ],
  openGraph: {
    title: 'Marea House | Boutique Coastal Motel & Escapes',
    description:
      'Experience boutique coastal accommodation at Marea House. Unrushed oceanfront stays, poolside luxury, curated rooms, and fresh ocean air.',
    url: 'https://mareahouse.com.au',
    images: [{ url: '/images/coast.png', width: 1200, height: 630, alt: 'Marea House Coastal View' }],
  },
};

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-copy" data-reveal="fade-right">
          <span className="vertical-label">Boutique coastal motel</span>
          <p className="eyebrow">Marea House</p>
          <h1>The coast,<br/>at your<br/>own pace.</h1>
          <p className="hero-sub">Boutique stays. Unrushed days.</p>

          <div className="local-distances-bar">
            <span className="distance-pill"><Waves size={14} /> Beach: 2 min walk</span>
            <span className="distance-pill"><Coffee size={14} /> Coffee: 1 min stroll</span>
            <span className="distance-pill"><Compass size={14} /> Headland trail: 5 min</span>
          </div>

          <a className="scroll-link" href="#welcome">Slow down <ArrowDown size={16} /></a>
        </div>

        <div className="hero-image-wrap" data-reveal="fade-left">
          <img className="hero-image" src="/images/coast.png" alt="Sunlit coastal motel overlooking the ocean" fetchPriority="high" />
          <div className="floating-hero-pill">
            <span className="pill-dot" /> 🌊 Water Temp 21°C · Light Coastal Breeze
          </div>
        </div>
      </section>

      {/* AVAILABILITY SEARCH BAR */}
      <div className="booking-wrap wrap" data-reveal="fade-up">
        <AvailabilityBar />
      </div>

      {/* WELCOME SECTION */}
      <section className="welcome wrap" id="welcome">
        <div data-reveal="fade-right">
          <p className="eyebrow">Welcome to Marea House</p>
          <h2>Slow days.<br/>Salt air.<br/>Simple pleasures.</h2>
          <p>Marea House is a boutique coastal motel designed for unhurried escapes. Thoughtful rooms, ocean-kissed mornings, and the freedom to do less—or everything.</p>
          <span className="seal">MAREA HOUSE<br/><b>MH</b><br/>COASTAL MOTEL</span>
          <TextLink href="/about">Our story</TextLink>
        </div>
        <article className="featured" data-reveal="fade-left">
          <img src="/images/pool.png" alt="White poolside terrace overlooking the sea" loading="lazy" />
          <span className="tag coral">A little more room to unwind</span>
          <div>
            <div>
              <h3>Oceanfront Terrace</h3>
              <p>2 Guests · 1 King bed · Ocean view</p>
            </div>
            <div>
              <small>From</small>
              <h3>$310 <small>/ night</small></h3>
            </div>
            <TextLink href="/stay/oceanfront-terrace">View suite</TextLink>
          </div>
        </article>
      </section>

      {/* ROOMS GRID */}
      <section className="wrap section">
        <div className="section-heading" data-reveal="fade-up">
          <h2>Stay your way</h2>
          <TextLink href="/stay">View all rooms</TextLink>
        </div>
        <div className="room-grid home-rooms">
          {rooms.slice(1).map((room, idx) => (
            <div key={room.id} data-reveal="fade-up" data-delay={idx * 150}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TILES STRIP */}
      <section className="experience-strip">
        {experiences.map((x, idx) => (
          <Link key={x.slug} href={`/experience#${x.slug}`} className="experience-tile" data-reveal="zoom-in" data-delay={idx * 120}>
            <img src={x.image} alt="" loading="lazy" />
            <div>
              <p className="eyebrow">{x.label}</p>
              <h3>{x.title}</h3>
              <span className="text-link">Explore <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </section>

      {/* AMENITIES */}
      <div data-reveal="fade-up">
        <Amenities />
      </div>

      {/* GUEST TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="wrap">
          <div className="section-heading" data-reveal="fade-down">
            <div>
              <p className="eyebrow">Guest Moments</p>
              <h2>What people say about Marea House</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-reveal="flip-up" data-delay="100">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--coral)" color="var(--coral)" />
                ))}
              </div>
              <p className="quote-text">“The ocean terrace suite was a dream. Falling asleep to waves and starting the day with coffee by the pool.”</p>
              <div className="guest-info">
                <span className="guest-name">Clara & Daniel H.</span>
                <span>Stayed Sept 2026</span>
              </div>
            </div>

            <div className="testimonial-card" data-reveal="flip-up" data-delay="220">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--coral)" color="var(--coral)" />
                ))}
              </div>
              <p className="quote-text">“Thoughtfully designed rooms, beautiful linen, and just minutes to the headland trail. We’ll definitely return.”</p>
              <div className="guest-info">
                <span className="guest-name">Marcus V.</span>
                <span>Stayed Aug 2026</span>
              </div>
            </div>

            <div className="testimonial-card" data-reveal="flip-up" data-delay="340">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--coral)" color="var(--coral)" />
                ))}
              </div>
              <p className="quote-text">“The easiest, most unhurried beach weekend we’ve had in years. Highly recommended for couples looking to reset.”</p>
              <div className="guest-info">
                <span className="guest-name">Sophie & Liam T.</span>
                <span>Stayed July 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL & GALLERY TEASER */}
      <section className="wrap journal-home section">
        <div data-reveal="fade-right">
          <div className="section-heading">
            <h2>Journal</h2>
            <span className="eyebrow">Stories & guides</span>
          </div>
          <div className="journal-grid">
            {articles.map((a, idx) => (
              <article key={a.slug} data-reveal="fade-up" data-delay={idx * 150}>
                <Link href={`/journal/${a.slug}`}>
                  <img src={a.image} alt="Coastal inspiration" loading="lazy" />
                  <p className="eyebrow">{a.date}</p>
                  <h3>{a.title}</h3>
                </Link>
                <TextLink href={`/journal/${a.slug}`}>Read story</TextLink>
              </article>
            ))}
          </div>
        </div>
        <Link href="/gallery" className="gallery-teaser" data-reveal="fade-left">
          <img src="/images/pool.png" alt="Explore the Marea House gallery" loading="lazy" />
          <span>Little moments, beautifully slow. <ArrowRight /></span>
        </Link>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote wrap" data-reveal="zoom-in">
        <span>“</span>
        <blockquote style={{ fontFamily: 'Georgia, serif' }}>
          Some places ask you to do more.<br />Here, you can just be.
          <cite>The Marea House way</cite>
        </blockquote>
      </section>

      {/* FIND US BANNER */}
      <section className="find-us">
        <img src="/images/coast.png" alt="Our coastal setting" loading="lazy" data-reveal="fade-right" />
        <div data-reveal="fade-up">
          <p className="eyebrow">A world away</p>
          <h2>Find your coast.</h2>
          <p>A slower pace, fresh ocean air<br />and a warm welcome.</p>
          <TextLink href="/contact">Plan your arrival</TextLink>
        </div>
        <div className="navy" data-reveal="fade-left">
          <h2>Stay a little longer.</h2>
          <p>Make space for the good things.</p>
          <Link className="button" href="/booking">Book your stay</Link>
        </div>
      </section>
    </>
  );
}
