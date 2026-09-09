This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security note for the client

The legacy WordPress site (`harmonyrental.gr`) published Wi-Fi passwords — and, on
one property (Harmony Gazi Living), the street-door keypad code — in plain text on
public check-in pages that anyone could find and index. This rebuild does not
repeat that mistake: per-property arrival details (including Wi-Fi) now live behind
unlisted, unguessable `/stay/<token>` pages (`src/content/stay.ts`), marked
`noindex, nofollow`, and the Gazi keypad code specifically has been left out of
this codebase entirely — guests are told it is "sent via WhatsApp before arrival."

That only closes the leak going forward. The credentials that were already public
are compromised and must be treated as such:

1. **Before launch**, ask the client to noindex or delete the old WordPress
   check-in pages (`/acropolis-harmony-loft/`, `/coastal-harmony-alimos/`,
   `/harmony-athens-city-apartment/`, `/harmony-gazi-living/`,
   `/harmony-luxe-living/`, `/harmony-luxury-grand-suite/`,
   `/harmony-twin-lofts-metaxourgeio-1/`, `/harmony-twin-lofts-metaxourgeio-2/`),
   or at minimum add `noindex` to them, so they stop being discoverable while both
   sites are live.
2. **After launch**, rotate the Gazi building's keypad code and every Wi-Fi
   password listed on those legacy pages (they are all still the live credentials
   as of this writing), then update the new values in `src/content/stay.ts` so the
   gated pages stay accurate.
