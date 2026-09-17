import {notFound} from 'next/navigation';
import Link from 'next/link';
import {rooms,money} from '@/lib/content';
import {PageIntro,RoomCard} from '@/components/ui';
export function generateStaticParams(){return rooms.map(r=>({slug:r.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;
  const room=rooms.find(r=>r.slug===slug);
  if(!room) return { title: 'Room' };
  return {
    title: `${room.name} — ${room.category}`,
    description: `${room.name} at Marea House. ${room.description} Accommodates ${room.guests} guests with ${room.bed}, ${room.size}m² space and ${room.view}.`,
    keywords: [room.name, room.category, 'coastal suite', 'oceanview room', 'Marea House stay', room.view],
    openGraph: {
      title: `${room.name} | Marea House Boutique Motel`,
      description: room.description,
      images: [{ url: room.image, width: 1200, height: 630, alt: room.name }],
    },
  };
}

export default async function Room({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const room=rooms.find(r=>r.slug===slug);if(!room)notFound();return <><PageIntro eyebrow={`${room.category} collection`} title={room.name} text={room.description}/><div className="wrap"><img className="detail-photo" src={room.image} alt={`${room.name} design inspiration`}/><div className="detail-grid section"><div><h2>Unpack. Exhale. Stay a while.</h2><p className="lead">{room.guests} guests · {room.bed} · {room.size} m² · {room.view}</p><div className="features-list">{['Premium linen','Private bathroom','Air conditioning','Complimentary Wi-Fi','Coffee & tea','Daily housekeeping','Pool access','Free parking'].map(a=><span key={a}>✓ {a}</span>)}</div><h3>Good to know</h3><p>Check-in from 3 pm. Check-out by 11 am. All rooms are non-smoking. Pet stays require prior arrangement. See our <Link className="underline" href="/terms">booking terms</Link> before reserving.</p></div><aside className="booking-summary"><p className="eyebrow">Your coastal escape</p><h2>{money(room.price)}<small> / night</small></h2><p>AUD · accommodation only<br/>Final price shown before you reserve.</p><Link className="button" href={`/booking?room=${room.id}`}>Check availability</Link><p className="fine">No online payment required.</p></aside></div><div className="section-heading"><h2>A different kind of stay?</h2></div><div className="room-grid section">{rooms.filter(r=>r.id!==room.id).slice(0,3).map(r=><RoomCard room={r} key={r.id}/>)}</div></div></>}
