import type { Metadata } from 'next';
import {PageIntro} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Marea House',
  description:
    'Read the Booking Terms & Conditions for Marea House: reservation policies, payment arrangements, check-in rules, and cancellation policies.',
  keywords: ['booking terms', 'motel conditions', 'cancellation policy', 'Marea House terms'],
};

export default function Terms(){return <><PageIntro eyebrow="Before you book" title="The details of your stay."/><article className="article-body"><p>These are sample terms for the Marea House demonstration property. The operator must verify pricing and replace these terms before accepting real bookings.</p><h2>Reservations & payment</h2><p>Rates are per room per night in Australian dollars, including applicable taxes. The total accommodation amount is shown before confirmation. Payment is due at the property. Optional extras require separate agreement.</p><h2>Arrival & departure</h2><p>Check-in begins at 3 pm; check-out is by 11 am. The lead guest must be at least 18. Maximum occupancy is two guests per room, including children.</p><h2>Changes & cancellations</h2><p>Contact the property with your booking reference. Under this sample policy, cancellation at least 48 hours before the 3 pm check-in time is free. Later cancellations or no-shows may incur the first night’s rate. The operator must confirm and enforce the final policy.</p><h2>During your stay</h2><p>All rooms are non-smoking. Pets require prior approval. Special requests are subject to availability and are not guaranteed by a booking note.</p></article></>}

