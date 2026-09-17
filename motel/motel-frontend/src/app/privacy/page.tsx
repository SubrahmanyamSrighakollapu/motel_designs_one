import type { Metadata } from 'next';
import {PageIntro} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy | Marea House',
  description:
    'Read the Privacy Policy for Marea House coastal motel regarding guest data, reservation details, contact enquiries, and privacy choices.',
  keywords: ['privacy policy', 'Marea House privacy', 'guest data policy'],
};

export default function Privacy(){return <><PageIntro eyebrow="Your information" title="Privacy policy"/><article className="article-body"><p>This is a sample policy for the Marea House demonstration website. The property operator must review and replace it before launch.</p><h2>What we collect</h2><p>When you reserve a stay, we collect your name, email, phone number, stay dates and optional requests. Contact enquiries store your message and reply details. Newsletter signup stores your email address.</p><h2>How information is used</h2><p>Booking information is used to manage your stay. Contact information is used to respond to your enquiry. Newsletter details are used for updates you request. This starter does not send emails or process card payments.</p><h2>Your choices</h2><p>Use the contact form to request access, correction, deletion or removal from the newsletter list. The property operator is responsible for handling these requests and setting a retention policy.</p><h2>Cookies and services</h2><p>This starter does not include advertising trackers or analytics. The operator should update this policy when adding external services.</p></article></>}

