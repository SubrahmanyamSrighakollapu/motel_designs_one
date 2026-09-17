import {notFound} from 'next/navigation';
import {articles} from '@/lib/content';
import {PageIntro,TextLink,StayCTA} from '@/components/ui';
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article = articles.find(a=>a.slug===slug);
  if (!article) return { title: 'Journal Story' };
  return {
    title: `${article.title} | Coastal Journal`,
    description: article.intro,
    keywords: [article.title, article.category, 'coastal story', 'Marea House blog', 'ocean lifestyle'],
    openGraph: {
      title: `${article.title} — Marea House Journal`,
      description: article.intro,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default async function Article({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)notFound();return <><PageIntro eyebrow={`${a.category} · ${a.date}`} title={a.title} text={a.intro}/><div className="wrap"><img className="detail-photo" src={a.image} alt={a.category}/></div><article className="article-body">{a.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}<TextLink href="/journal">All stories</TextLink></article><StayCTA/></>}
