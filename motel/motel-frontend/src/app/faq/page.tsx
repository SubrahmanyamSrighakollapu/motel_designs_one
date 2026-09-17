import type { Metadata } from 'next';
import {PageIntro,StayCTA} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Good to Know & FAQ | Marea House',
  description:
    'Frequently asked questions about staying at Marea House: check-in & check-out times, pet policies, parking, accessibility, and booking payments.',
  keywords: [
    'motel faq',
    'check in times',
    'pet friendly motel',
    'free parking motel',
    'Marea House questions',
  ],
  openGraph: {
    title: 'Good to Know & FAQ | Marea House Coastal Motel',
    description: 'A few useful details about your stay at Marea House.',
  },
};

export default function FAQ(){return <><PageIntro eyebrow="Good to know" title="A few useful details."/><section className="article-body faq">{[['When can I check in?','Check-in is from 3 pm, and check-out is by 11 am. Contact us before arrival if you expect to arrive late.'],['Can I bring my pet?','Pets are welcome in selected rooms by prior arrangement. Please contact us before booking to confirm a suitable room and any additional charges.'],['Is parking available?','Complimentary on-site parking is included for guests.'],['Do you have accessible rooms?','Please contact the team to discuss your individual requirements before reserving. Room layouts and access vary.'],['How do I pay?','This website reserves your accommodation without collecting payment. Payment is arranged at the property.'],['How can I change or cancel my stay?','Contact the property with your booking reference. This starter site does not offer online cancellation. See the booking terms for the sample cancellation policy.']].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section><StayCTA/></>}

