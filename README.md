# PaceSplits

Free running pace calculators with mile-by-mile splits — built for programmatic SEO. Each page targets a specific search query like "marathon pace calculator sub 3:05" or "5k pace calculator sub 20 minutes."

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse all calculators.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build (SSG)   |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |

## Project structure

```
app/
  layout.tsx                        # Root layout, header, footer, OG tags
  page.tsx                          # Homepage — all calculators by distance
  sitemap.ts                        # Auto-generated sitemap.xml
  pace-calculator/[slug]/page.tsx   # Static page per distance + goal time
components/
  PaceTable.tsx                     # Mile-by-mile split table
  CTAWaitlist.tsx                   # Waitlist CTA (swap URL when ready)
lib/
  combos.ts                         # Distance + goal-time combinations
  vdot.ts                           # Even-pace split calculation
```

## Environment variables

| Variable               | Description                          | Default                  |
| ---------------------- | ------------------------------------ | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap & OG  | `https://pacesplits.com` |

Create a `.env.local` file to override:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy — Next.js will statically generate every calculator page at build time.

## Customization

- **Waitlist URL** — edit `WAITLIST_URL` in `components/CTAWaitlist.tsx`
- **Goal times** — adjust ranges in `lib/combos.ts`
- **Pace math** — refine calculation logic in `lib/vdot.ts`

## License

Private — all rights reserved.
