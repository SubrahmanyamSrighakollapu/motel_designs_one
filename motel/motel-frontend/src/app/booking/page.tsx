import type { Metadata } from 'next';
import {Suspense} from 'react';
import {PageIntro} from '@/components/ui';
import BookingForm from '@/components/booking-form';

export const metadata: Metadata = {
  title: 'Book Your Stay | Reservations',
  description:
    'Reserve your room at Marea House coastal motel. Select your dates, view live availability, choose your suite, and confirm your coastal stay.',
  keywords: [
    'book motel room',
    'reserve coastal stay',
    'motel reservations',
    'oceanfront room booking',
    'Marea House booking',
    'coastal hotel reservation',
  ],
  openGraph: {
    title: 'Book Your Stay | Marea House Coastal Motel',
    description: 'Some time, just for you. Choose your dates and reserve your coastal getaway.',
    images: [{ url: '/images/oceanfront-terrace.webp', width: 1200, height: 630, alt: 'Reserve Marea House Stay' }],
  },
};

export default function Booking(){return <><PageIntro eyebrow="Your coastal escape" title="Some time, just for you."/><section className="wrap section"><Suspense fallback={<p>Loading your stay…</p>}><BookingForm/></Suspense></section></>}

