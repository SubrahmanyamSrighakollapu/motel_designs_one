# Marea House API

Node.js 22+ / Express 5 / MySQL 8. Run commands from this folder.

1. Create a MySQL database with `mysql -u root -p < schema.sql` (Windows: open schema.sql in MySQL Workbench and execute).
2. Create an application user with SELECT, INSERT, UPDATE privileges on `motel.*`. Use a strong password.
3. Copy `.env.example` to `.env` and set the DB credentials and FRONTEND_ORIGIN.
4. `npm install`, then `npm run dev`. Production: `npm start`.
5. `GET http://localhost:4000/api/health` must report database connected.

Do not rerun schema.sql against a populated database; use migrations for future changes.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | /api/health | Database readiness |
| GET | /api/rooms | Current room catalogue and rates |
| GET | /api/availability?checkIn=2026-10-01&checkOut=2026-10-03&guests=2 | Available types and unit counts (choose future dates) |
| POST | /api/bookings | Confirm a reservation |
| POST | /api/contact | Store an enquiry |
| POST | /api/newsletter | Store a unique subscriber |

Booking body:
```json
{"roomTypeId":1,"checkIn":"2026-10-01","checkOut":"2026-10-03","guests":2,"guestName":"Sample Guest","email":"guest@example.com","phone":"+61400000000","notes":"Late arrival","acceptTerms":true,"idempotencyKey":"3948ee2c-0da7-4dc5-b1e7-a7973c498f44"}
```
Use a fresh UUID for each booking intent, retain the same UUID and identical details when retrying a failed response. Price is calculated by the server, never accepted from the client. Dates are interpreted in PROPERTY_TIMEZONE and check-out is exclusive. Bookings are limited to 30 nights and arrivals within 365 days.

Contact body: `{ "name":"Sample Guest", "email":"guest@example.com", "subject":"General enquiry", "message":"Please help me plan my arrival." }`.
Newsletter body: `{ "email":"guest@example.com" }`.
Validation errors return 400, inventory conflicts 409, rate limits 429. Errors are JSON with a `message` field.

## Data integrity and operation

Room-type row locks serialize allocation and prevent overlapping confirmed reservations for the same physical unit. Inventory is rechecked inside a READ COMMITTED transaction. Idempotency keys prevent duplicate reservations on retries. All SQL values are parameterized. All routes that expose guest records or modify reservations are deliberately omitted; manage records through a secured database until an authenticated staff portal is added.

`contact_messages` and `newsletter_subscribers` store submissions only. Connect a mail service and a consent/unsubscribe workflow before sending marketing. No card/payment integration is included. No confirmation email is sent.

Cancellation by the operator: verify the guest's identity, then update a booking's `status` to `cancelled` using a parameterized, authenticated staff workflow or a secured database session. Never expose a public endpoint that cancels by predictable ID alone.

Production: use HTTPS, a restricted DB user, private database networking, backups and retention policies. Configure Express `trust proxy` to your exact proxy topology before enabling it; otherwise rate limiting uses the direct client IP. CORS accepts the single configured frontend origin. The built-in limiter is per process; use a shared store for multiple API instances.

Run date validation checks with `npm test`. For integration verification, use a fresh test database and reserve all units of a type concurrently for the same dates: only the available unit count should succeed and the rest should return 409. A check-out date may be another booking's check-in date. Never run destructive integration checks against guest data.
