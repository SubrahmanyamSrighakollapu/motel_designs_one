# Marea House — coastal motel website

A complete, editable Next.js + Tailwind frontend and Node.js + Express + MySQL backend, inspired by the supplied home-page design.

## Folders

- `motel-frontend/`: Next.js App Router, TypeScript, Tailwind CSS 4, responsive styles, local image assets.
- `motel-backed/`: Express API, database validation and booking logic, tests, `.env.example`, **schema.sql**.

The spelling `motel-backed` intentionally matches the requested folder structure.

## Requirements

Node.js **22 LTS or newer**, npm, and **MySQL 8.0+**. No paid service keys are needed. The three generated image assets are included locally, so image loading does not depend on an external service.

## Start locally (Windows / macOS / Linux)

### 1. Database

Open `motel-backed/schema.sql` in MySQL Workbench, DBeaver or your SQL client and execute it once against a fresh MySQL instance. This creates database `motel`, the tables, four room types and nine physical room units.

Alternatively, in a shell that supports input redirection:

```bash
mysql -u root -p < motel-backed/schema.sql
```

Create a database user, with your own strong password (run as a database administrator):

```sql
CREATE USER 'motel_app'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT SELECT, INSERT, UPDATE ON motel.* TO 'motel_app'@'localhost';
```

Set DB_HOST and user host permissions to match your installation. For a remote/container database, use the correct host and a restricted network, not an internet-exposed database.

### 2. Backend — terminal one

```bash
cd motel-backed
npm install
```

Copy `.env.example` to `.env` (Windows PowerShell: `Copy-Item .env.example .env`; macOS/Linux: `cp .env.example .env`). Edit the password and database settings.

```bash
npm run dev
```

Open `http://localhost:4000/api/health`. It must report `database: connected` before submitting forms.

### 3. Frontend — terminal two

From the root `motel` directory:

```bash
cd motel-frontend
npm ci
```

Copy `.env.example` to `.env.local`. The default API URL is `http://localhost:4000/api`.

```bash
npm run dev
```

Open **http://localhost:3000**.

The content pages display without a database. Availability, reservations, enquiries and newsletter signup require the running backend and MySQL. Connection failures are displayed in the interface; no form pretends to save successfully.

## Pages and interactions

- Home: split coastal hero, date search, featured suite, rooms, experiences, amenities, journal and arrival section.
- Stay: four room types and individual room pages.
- Booking: date/guest search, live available inventory, room selection, guest form, server-computed price, confirmation reference and print action.
- Experience: surf/sea, local flavours, scenic walks and relaxation.
- Journal: article listing and three full article routes.
- Gallery: filters, native modal lightbox, keyboard navigation and Escape to close.
- About, Contact, FAQ, Privacy, Terms, 404 and error states.
- Mobile navigation, newsletter signup, reduced-motion support, semantic forms, visible keyboard focus and a skip link.

## What is sample content?

Marea House is a **fictional demonstration property**. Branding follows the reference. Rates are sample AUD nightly rates. Images are AI-generated design imagery, not photographs of real room inventory. The queen/twin room cards reuse the king bedroom image as visual inspiration. Replace them with accurate room-specific photos before selling real stays.

The contact page and legal pages clearly identify the demonstration property. Before launch, replace the address/contact details, room photos/descriptions, operating policies and legal text. There is no fabricated review score, fake map location or non-working social profile.

## Customisation

- Colours, typography and responsive layouts: `motel-frontend/src/app/globals.css`.
- Rooms, experiences and journal copy: `motel-frontend/src/lib/content.ts`.
- Local images: `motel-frontend/public/images/`.
- Header/footer: `motel-frontend/src/components/site-shell.tsx`.
- API URL: frontend `.env.local` (rebuild after production changes).
- Rates, capacities, inventory: MySQL `room_types` and `room_units`. Catalogue IDs/slugs must match frontend content. Update displayed marketing rates in `content.ts` whenever database rates change; booking totals always use database rates.

Tailwind is configured through `@tailwindcss/postcss` and the CSS `@theme` tokens. Shared visual components use reusable CSS classes; utility classes can be added directly in TSX. Fonts use a local system serif/sans-serif stack without external font downloads.

## Production build

Frontend: `npm run typecheck`, `npm run build`, `npm start`.
Backend: configure production `.env`, then `npm start`.

Host the Next.js app on a Node-compatible host, the Express service on a Node server, and MySQL on a private database host. Set `NEXT_PUBLIC_API_URL` to the public HTTPS API URL **before building** the frontend. Set `FRONTEND_ORIGIN` to the exact frontend origin (without trailing slash). Do not commit `.env` files.

## Booking behaviour and scope

A reservation is confirmed immediately when the database transaction succeeds. It reserves one physical unit. Payment is due at the property: **no payment gateway and no email service are included**. The confirmation says no email was sent and provides a print action. The system checks overlapping dates, enforces maximum occupancy and computes the total on the server. Retries with the same idempotency key and payload reuse the reservation.

There is no staff/admin portal or user-login feature. Enquiries and subscribers are stored in database tables. Staff must use a secured database workflow or add an authenticated management portal. Implement verified cancellation, newsletter unsubscribe and mail delivery before operating those services in production.

See `motel-backed/README.md` for endpoint bodies, error codes, security notes and MySQL behaviour. See `VALIDATION.md` for checks performed in the build environment.
