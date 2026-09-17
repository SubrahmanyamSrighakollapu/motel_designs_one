import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import {randomUUID,createHash} from 'node:crypto';
import {pool} from './db.js';
import {validateStay} from './dates.js';
import {staySchema,bookingSchema,contactSchema,newsletterSchema} from './validation.js';
export const app=express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://localhost:3000',methods:['GET','POST'],allowedHeaders:['Content-Type']}));
app.use(express.json({limit:'16kb'}));
app.use('/api',rateLimit({windowMs:15*60*1000,limit:150,standardHeaders:'draft-7',legacyHeaders:false,message:{message:'Too many requests. Please try again later.'}}));
const writeLimit=rateLimit({windowMs:15*60*1000,limit:20,standardHeaders:'draft-7',legacyHeaders:false,message:{message:'Too many submissions. Please try again later.'}});
function parse(schema,value){const result=schema.safeParse(value);if(!result.success){const error=new Error(result.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; '));error.status=400;throw error;}return result.data;}
function stay(a,b){try{return validateStay(a,b);}catch(e){e.status=400;throw e;}}
function fail(message,status){const e=new Error(message);e.status=status;throw e;}
function confirmation(b){return {reference:b.reference,total:Number(b.total_amount),nights:b.nights,roomName:b.room_name,checkIn:b.check_in,checkOut:b.check_out,guests:b.guests};}
app.get('/api/health',async(req,res)=>{try{await pool.query('SELECT 1');res.json({status:'ok',database:'connected'});}catch{res.status(503).json({status:'unavailable',message:'Database is not connected.'});}});
app.get('/api/rooms',async(req,res)=>{const[rooms]=await pool.execute('SELECT id,slug,name,nightly_rate,capacity FROM room_types WHERE active=TRUE ORDER BY id');res.json({rooms});});
app.get('/api/availability',async(req,res)=>{const data=parse(staySchema,req.query);const nights=stay(data.checkIn,data.checkOut);const[rooms]=await pool.execute(`SELECT rt.id,rt.slug,rt.name,rt.nightly_rate,rt.capacity,COUNT(ru.id) AS available_units
 FROM room_types rt JOIN room_units ru ON ru.room_type_id=rt.id
 WHERE rt.active=TRUE AND ru.active=TRUE AND rt.capacity>=?
 AND NOT EXISTS (SELECT 1 FROM bookings b WHERE b.room_unit_id=ru.id AND b.status='confirmed' AND b.check_in < ? AND b.check_out > ?)
 GROUP BY rt.id,rt.slug,rt.name,rt.nightly_rate,rt.capacity ORDER BY rt.id`,[data.guests,data.checkOut,data.checkIn]);res.json({rooms,nights,currency:'AUD'});});
app.post('/api/bookings',writeLimit,async(req,res)=>{
 const d=parse(bookingSchema,req.body);const nights=stay(d.checkIn,d.checkOut);
 const {idempotencyKey,...payload}=d;const hash=createHash('sha256').update(JSON.stringify(payload)).digest('hex');
 const c=await pool.getConnection();
 try{
  // A type-level row lock serializes competing allocations. READ COMMITTED ensures
  // overlap checks see the previous transaction's committed reservation after waiting.
  await c.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await c.beginTransaction();
  const[types]=await c.execute('SELECT * FROM room_types WHERE id=? AND active=TRUE FOR UPDATE',[d.roomTypeId]);
  const[existing]=await c.execute(`SELECT b.*,rt.name AS room_name FROM bookings b JOIN room_units ru ON ru.id=b.room_unit_id JOIN room_types rt ON rt.id=ru.room_type_id WHERE b.idempotency_key=?`,[idempotencyKey]);
  if(existing.length){if(existing[0].request_hash!==hash)fail('This submission was already used. Check availability again before changing the reservation.',409);await c.commit();return res.json(confirmation(existing[0]));}
  const type=types[0];if(!type||type.capacity<d.guests)fail('This room cannot accommodate your party.',400);
  const[units]=await c.execute(`SELECT ru.id FROM room_units ru WHERE ru.room_type_id=? AND ru.active=TRUE AND NOT EXISTS (SELECT 1 FROM bookings b WHERE b.room_unit_id=ru.id AND b.status='confirmed' AND b.check_in < ? AND b.check_out > ?) ORDER BY ru.id LIMIT 1`,[d.roomTypeId,d.checkOut,d.checkIn]);
  if(!units.length)fail('This room has just sold out for your dates. Please check availability again.',409);
  const totalCents=Math.round(Number(type.nightly_rate)*100)*nights;
  const reference='MH-'+randomUUID().replaceAll('-','').slice(0,16).toUpperCase();
  await c.execute(`INSERT INTO bookings(reference,idempotency_key,request_hash,room_unit_id,guest_name,email,phone,check_in,check_out,guests,nights,nightly_rate,total_amount,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[reference,idempotencyKey,hash,units[0].id,d.guestName,d.email,d.phone,d.checkIn,d.checkOut,d.guests,nights,type.nightly_rate,totalCents/100,d.notes]);
  await c.commit();res.status(201).json({reference,total:totalCents/100,nights,roomName:type.name,checkIn:d.checkIn,checkOut:d.checkOut,guests:d.guests});
 }catch(e){await c.rollback();if(e.code==='ER_DUP_ENTRY')e=Object.assign(new Error('A submission with this reference is being processed. Retry the same request.'),{status:409});throw e;}finally{c.release();}
});
app.post('/api/contact',writeLimit,async(req,res)=>{const d=parse(contactSchema,req.body);await pool.execute('INSERT INTO contact_messages(name,email,subject,message) VALUES(?,?,?,?)',[d.name,d.email,d.subject,d.message]);res.status(201).json({message:'Your message has been received.'});});
app.post('/api/newsletter',writeLimit,async(req,res)=>{const d=parse(newsletterSchema,req.body);await pool.execute('INSERT INTO newsletter_subscribers(email) VALUES(?) ON DUPLICATE KEY UPDATE email=email',[d.email]);res.json({message:'Thank you for subscribing.'});});
app.use((req,res)=>res.status(404).json({message:'Endpoint not found.'}));
app.use((err,req,res,next)=>{if(err.status>=400&&err.status<500)return res.status(err.status).json({message:err.message});console.error('API failure:',err.code||err.name);res.status(500).json({message:'We could not complete your request. Please try again shortly.'});});
