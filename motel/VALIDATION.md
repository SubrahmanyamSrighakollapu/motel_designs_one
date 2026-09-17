# Validation record

## Passed in the build environment

- Frontend dependency installation from the cached package lock.
- TypeScript: `npm run typecheck`.
- Optimised Next.js production build: `npm run build`.
- All 18 public routes returned HTTP 200 when served from the production build.
- Every image referenced by those pages returned HTTP 200.
- Node syntax checks for all backend source modules.
- Three Node test groups for date logic: valid/leap-day stays, invalid/past/reversed/excessive dates, and property timezone.
- Archive structure and ZIP integrity checks.

## Not verified here

- The environment has no MySQL server, so schema execution, live API persistence, transaction concurrency and end-to-end booking submission could not be exercised.
- Backend dependency installation could not complete because required packages were not cached and external package access was unavailable. Install them with `npm install` on your machine.
- No browser executable was available for screenshot or interactive testing. Responsive CSS includes mobile, tablet and desktop breakpoints, but device rendering needs verification in a browser.

## Before accepting real guests

1. Run `schema.sql` on a fresh MySQL 8 database, configure `.env`, and verify `/api/health`.
2. Confirm one successful booking and its database row; retry the identical idempotency key to confirm no duplicate row.
3. Reserve the two Oceanfront Terrace units for matching dates; the third attempt should return 409. Verify concurrent requests also cannot exceed the two units.
4. Confirm a new guest can arrive on another booking's check-out date; a stay overlapping an occupied night must not reuse that unit.
5. Check enquiries and newsletter rows persist. Test offline errors and invalid form values.
6. Inspect 375 px, 768 px and 1440 px layouts, keyboard navigation, mobile menu, gallery modal and print confirmation.
7. Replace fictional property content, reused room imagery, policies and sample rates; configure real staff operations and payment arrangements.
