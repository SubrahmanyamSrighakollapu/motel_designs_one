"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="page-intro wrap"><h1>A little interruption.</h1><p>Something went wrong. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>}
