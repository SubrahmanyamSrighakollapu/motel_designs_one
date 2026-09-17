import Link from 'next/link';
import {ArrowRight,Users,BedDouble,Sun,Wifi,Car,Waves,PawPrint,KeyRound,Sparkles} from 'lucide-react';
import {rooms,money} from '@/lib/content';

export function TextLink({href,children}:{href:string;children:React.ReactNode}){
  return (
    <Link className="text-link" href={href}>
      {children}<ArrowRight size={17}/>
    </Link>
  );
}

export function PageIntro({eyebrow,title,text}:{eyebrow:string;title:string;text?:string}){
  return (
    <section className="page-intro wrap animate-fade-in-up">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {text&&<p className="lead">{text}</p>}
    </section>
  );
}

export function RoomCard({room}:{room:typeof rooms[number]}){
  return (
    <article className="room-card">
      <Link href={`/stay/${room.slug}`} className="room-image">
        <img src={room.image} alt={`${room.name} — coastal room inspiration`} loading="lazy"/>
        <span className="tag coral">{room.category}</span>
      </Link>
      <div className="room-copy">
        <h3><Link href={`/stay/${room.slug}`}>{room.name}</Link></h3>
        <div className="room-meta">
          <span><Users size={14}/> {room.guests} Guests</span>
          <span><BedDouble size={14}/> {room.bed}</span>
        </div>
        <div className="room-bottom">
          <span>From <strong>{money(room.price)}</strong> <small style={{fontSize:12,color:'var(--muted)'}}>/ night</small></span>
          <Link href={`/stay/${room.slug}`} aria-label={`View ${room.name}`} style={{color:'var(--coral)',fontWeight:600,display:'inline-flex',alignItems:'center',gap:6}}>
            Explore <ArrowRight size={17}/>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Amenities(){
  return (
    <section className="amenities wrap">
      {[[Waves,'Oceanfront pool','Sun-drenched, slow afternoons.'],[Sun,'Beach access','A short stroll to sand and sea.'],[Car,'Free parking','Arrive, park and unwind.'],[Wifi,'High-speed Wi-Fi','Connected when you need it.'],[PawPrint,'Pet friendly','Selected rooms, by arrangement.'],[KeyRound,'Easy check-in','A warm welcome, your way.']].map(([Icon,title,text])=>{
        const I=Icon as typeof Sun;
        return (
          <div key={String(title)} className="amenity-item-card">
            <I strokeWidth={1.2}/>
            <h3>{String(title)}</h3>
            <p>{String(text)}</p>
          </div>
        );
      })}
    </section>
  );
}

export function StayCTA(){
  return (
    <section className="stay-cta" style={{position:'relative',overflow:'hidden'}}>
      <div style={{position:'relative',zIndex:2}}>
        <p className="eyebrow" style={{display:'inline-flex',alignItems:'center',gap:6}}>
          <Sparkles size={14}/> Make a little room for yourself
        </p>
        <h2>The coast is calling.</h2>
        <p style={{maxWidth:540,margin:'0 auto 28px',color:'var(--muted)',fontSize:16}}>
          Experience slow mornings, salt air, and unhurried days at Marea House Motel.
        </p>
        <Link className="button" href="/booking">
          Find your stay <ArrowRight size={17}/>
        </Link>
      </div>
    </section>
  );
}

