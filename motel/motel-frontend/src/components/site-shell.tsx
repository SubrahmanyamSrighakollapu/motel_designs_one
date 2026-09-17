"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu,X,ArrowUpRight,ShieldCheck} from 'lucide-react';
import {api} from '@/lib/api';

const links=[['Stay','/stay'],['Experience','/experience'],['Journal','/journal'],['Gallery','/gallery'],['About','/about'],['Contact','/contact']];

export function Header(){
  const path=usePathname();
  const[open,setOpen]=useState(false);
  if(path.startsWith('/admin'))return null;

  return (
    <header className="site-header">
      <Link className="monogram" href="/" aria-label="Marea House home">
        M<span>H</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name,url])=>(
          <Link aria-current={path.startsWith(url)?'page':undefined} key={url} href={url}>
            {name}
          </Link>
        ))}
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link className="button small header-book" href="/booking">
          Book your stay <ArrowUpRight size={15}/>
        </Link>
        <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close menu':'Open menu'}>
          {open?<X/>:<Menu/>}
        </button>
      </div>

      {open&&(
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([name,url])=>(
            <Link key={url} href={url} onClick={()=>setOpen(false)}>{name}</Link>
          ))}
          <Link href="/booking" onClick={()=>setOpen(false)} style={{color:'var(--coral)',fontWeight:600}}>Book your stay &rarr;</Link>
        </nav>
      )}
    </header>
  );
}


export function Footer(){
  const path=usePathname();
  const[status,setStatus]=useState('');
  const[busy,setBusy]=useState(false);
  if(path.startsWith('/admin'))return null;

  async function subscribe(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setBusy(true);
    const form=e.currentTarget;
    try{
      await api('/newsletter',{method:'POST',body:JSON.stringify({email:new FormData(form).get('email')})});
      setStatus('You’re on the list. Thank you!');
      form.reset();
    }catch(e){
      setStatus((e as Error).message);
    }finally{
      setBusy(false);
    }
  }

  return (
    <footer>
      <div className="footer-grid wrap">
        <div>
          <Link className="monogram" href="/">M<span>H</span></Link>
          <p>A little closer to the ocean.<br/>A little further from the everyday.</p>
        </div>
        <div>
          <h3>Find your way</h3>
          <Link href="/stay">Our rooms</Link>
          <Link href="/experience">Around the coast</Link>
          <Link href="/contact">Contact & directions</Link>
          <Link href="/faq">Good to know</Link>
          <Link href="/admin/login" style={{color:'#edd1af',fontWeight:600,marginTop:6,display:'inline-flex',alignItems:'center',gap:6}}>
            <ShieldCheck size={14}/> Manager Portal (CMS)
          </Link>
        </div>
        <div>
          <h3>Stay in the loop</h3>
          <p>Occasional stories from the coast.</p>
          <form className="newsletter" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" required maxLength={254} placeholder="Your email address"/>
            <button disabled={busy} aria-label="Subscribe">{busy?'…':<ArrowUpRight/>}</button>
          </form>
          <p className="fine">By subscribing, you agree to our <Link href="/privacy">privacy policy</Link>.</p>
          <p role="status">{status}</p>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} Marea House</span>
        <div>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
          <Link href="/admin/login">Admin CMS</Link>
        </div>
        <span>Boutique stays. Unrushed days.</span>
      </div>
    </footer>
  );
}


