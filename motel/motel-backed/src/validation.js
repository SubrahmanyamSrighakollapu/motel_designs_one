import {z} from 'zod';
const email=z.string().trim().email().max(254).transform(s=>s.toLowerCase());
export const staySchema=z.object({checkIn:z.string(),checkOut:z.string(),guests:z.coerce.number().int().min(1).max(2)});
export const bookingSchema=staySchema.extend({roomTypeId:z.number().int().positive(),guestName:z.string().trim().min(2).max(100),email,phone:z.string().trim().min(7).max(30).regex(/^[+()0-9 .-]+$/),notes:z.string().trim().max(2000).optional().default(''),acceptTerms:z.literal(true),idempotencyKey:z.string().uuid()});
export const contactSchema=z.object({name:z.string().trim().min(2).max(100),email,subject:z.enum(['General enquiry','My stay','Pet-friendly rooms','Accessibility']),message:z.string().trim().min(10).max(4000)});
export const newsletterSchema=z.object({email});
