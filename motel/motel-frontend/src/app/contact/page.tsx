import type { Metadata } from 'next';
import {PageIntro} from '@/components/ui';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact & Directions | Marea House Motel',
  description:
    'Get in touch with Marea House coastal motel. Send an enquiry about room availability, check-in instructions, accessible stays, or local tips.',
  keywords: [
    'contact Marea House',
    'motel enquiries',
    'coastal motel directions',
    'hotel contact',
    'check-in queries',
    'Marea House location',
  ],
  openGraph: {
    title: 'Contact & Directions | Marea House Coastal Motel',
    description: 'Questions about a room, bringing your dog, or planning a little time away? Get in touch.',
    images: [{ url: '/images/coast.png', width: 1200, height: 630, alt: 'Contact Marea House' }],
  },
};

export default function Contact(){return <><PageIntro eyebrow="We are here to help" title="Your stay starts with hello." text="Questions about a room, bringing your dog or planning a little time away? Get in touch."/><section className="wrap contact-grid section"><div><img className="contact-photo" src="/images/coast.png" alt="Coastal gardens at Marea House"/><h2>Meet you by the sea.</h2><p>Check-in from 3 pm<br/>Check-out by 11 am</p><p>For arrival directions, accessible room requirements and special requests, send us a message before your stay.</p><p className="fine">Marea House is a demonstration property. Confirm the real property address and contact details with the operator before travelling.</p></div><ContactForm/></section></>}

