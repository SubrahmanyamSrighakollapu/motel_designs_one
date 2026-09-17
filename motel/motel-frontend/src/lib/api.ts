const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
export async function api<T>(path:string, options:RequestInit = {}):Promise<T> {
 let response:Response;
 try { response = await fetch(`${base}${path}`, { ...options, headers:{'Content-Type':'application/json',...options.headers}, signal:AbortSignal.timeout(15000) }); }
 catch { throw new Error('We could not connect. Please try again shortly.'); }
 const data = await response.json().catch(()=>({message:'Something went wrong. Please try again.'}));
 if(!response.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
 return data;
}
