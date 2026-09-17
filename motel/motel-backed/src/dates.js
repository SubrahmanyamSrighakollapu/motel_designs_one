export function propertyToday(now=new Date()) {
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:process.env.PROPERTY_TIMEZONE||'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const get=t=>parts.find(p=>p.type===t).value;
 return `${get('year')}-${get('month')}-${get('day')}`;
}
export function validDate(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;}
export function validateStay(checkIn,checkOut,today=propertyToday()) {
 if(!validDate(checkIn)||!validDate(checkOut))throw new Error('Use valid dates in YYYY-MM-DD format.');
 if(checkIn<today)throw new Error('Check-in cannot be in the past.');
 const nights=(Date.parse(checkOut)-Date.parse(checkIn))/86400000;
 if(nights<1)throw new Error('Check-out must be after check-in.');
 if(nights>30)throw new Error('For stays longer than 30 nights, please contact us.');
 if(Date.parse(checkIn)-Date.parse(today)>365*86400000)throw new Error('Reservations open up to 365 days ahead.');
 return nights;
}
