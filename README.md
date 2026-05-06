# ColorStack at Ohio State — Website

[![Slack](https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=fff)](https://join.slack.com/t/colorstackosu/shared_invite/zt-2pm3rbsc0-d25NkeW0B14YIEHclyJsVg)
[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/company/colorstack-osu/)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://www.instagram.com/colorstackosu/)

Source code for [colorstackosu.org](https://colorstackosu.org). Built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- **npm** (comes with Node)

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd colorstacksite_rework

# Install dependencies
npm install

# Create your environment file
cp .env.local.example .env.local
# Then fill in the API key (see Environment Variables below)

# Start the dev server
npm run dev
```

The site will be running at `http://localhost:3000`.

### Available Scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the development server (hot reload) |
| `npm run build` | Create a production build                 |
| `npm run start` | Serve the production build locally        |
| `npm run lint`  | Run ESLint                                |
| `npm test`      | Run tests (Vitest)                        |

---

## Project Structure

```
├── app/                    # Next.js App Router — pages and layouts
│   ├── layout.tsx          # Root layout (nav, footer, fonts, global CSS)
│   ├── page.tsx            # Homepage
│   ├── about/              # /about page
│   ├── events/             # /events page
│   ├── execboard/          # /execboard (Meet Us) page
│   └── sponsors/           # /sponsors page
│
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Site-wide navbar
│   ├── Footer.tsx          # Site-wide footer
│   ├── ScrollHint.tsx      # Scroll indicator on homepage
│   ├── home/               # Homepage sections (Hero, Mission, etc.)
│   ├── events/             # Events page components (EventGrid, GalleryModal)
│   ├── execboard/          # Exec board components (MemberCard, MemberModal)
│   ├── sponsors/           # Sponsors page components
│   └── about/              # About page components
│
├── data/                   # Static data files
│   ├── board-data.ts       # Executive board members by year
│   └── sponsors-data.ts    # Sponsor tiers and logos
│
├── lib/                    # Utility functions
│   └── drive-gallery.ts    # Google Drive API integration (auto-fetches events)
│
├── types/                  # TypeScript interfaces
│   ├── board.ts
│   ├── drive.ts
│   ├── events.ts
│   └── sponsors.ts
│
├── public/                 # Static assets (images, PDFs, logos)
│   └── images/
│
├── __tests__/              # Unit tests (Vitest + Testing Library)
│
├── app/globals.css         # Global styles + CSS custom properties (design tokens)
├── tailwind.config.ts      # Tailwind theme extensions
├── next.config.mjs         # Next.js configuration
└── .env.local              # Environment variables (not committed)
```

---

## Environment Variables

Create a `.env.local` file in the root with:

```env
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
NEXT_PUBLIC_EVENTS_PARENT_FOLDER_ID=1mfgArA71a3qWw1EHwxABwzLOg-lqrUTe
```

- **`NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY`** — A Google Cloud API key with the Drive API enabled. Used to fetch event gallery photos.
- **`NEXT_PUBLIC_EVENTS_PARENT_FOLDER_ID`** — The Google Drive folder ID that contains all event subfolders.

> The `NEXT_PUBLIC_` prefix makes these available in the browser. They are not secret — the API key should be restricted to the Drive API and your domain(s).

---

## How Events Work (Auto-Discovery)

Events are **automatically pulled from Google Drive**. No code changes needed to add a new event.

### To add a new event:

1. Open the [Events parent folder](https://drive.google.com/drive/folders/1mfgArA71a3qWw1EHwxABwzLOg-lqrUTe) in Google Drive
2. Create a new subfolder named with this convention:

   ```
   Event Name - Month Day, Year
   ```

   Examples:
   - `Matcha & Map - January 20, 2026`
   - `GoDaddy - September 23, 2025`
   - `.atEOS( ) Fall - November 18, 2025`

3. Upload photos into that folder
4. Make sure the folder is shared as **"Anyone with the link" → Viewer**

That's it. The site will automatically pick up the new folder, parse the name/date, sort by date (newest first), and display the gallery.

---

## How to Update Other Content

### Executive Board Members

Edit `data/board-data.ts`. Each academic year has an array of members. Add a new year or modify existing entries. Member photos go in `public/images/eboard-photos/`.

### Sponsors

Edit `data/sponsors-data.ts`. Sponsors are organized by tier (Platinum, Gold, Silver, Bronze). Logos go in `public/images/sponsor-logos/`.

### Navigation Links

Edit `components/Navigation.tsx`. The `navLinks` array at the top controls the nav items.

---

## Design System

The site uses a token-based design system defined in `app/globals.css` as CSS custom properties and extended in `tailwind.config.ts`.

**Key patterns:**

- Colors: `text-brand-red`, `bg-brand-dark`, `bg-brand-cream`, etc.
- Typography: `text-hero`, `text-heading`, `text-body`, `font-display`, `font-body`
- Spacing: `py-space-section`, `gap-space-lg`
- Animations: GSAP for scroll-triggered reveals, CSS for gradient overlays

**Fonts:**

- Display/headings: **Syne** (variable, loaded via `next/font`)
- Body text: **Source Serif 4** (variable, loaded via `next/font`)

---

## Testing

```bash
npm test
```

Tests use **Vitest** with **React Testing Library** and **jsdom**. Test files live in `__tests__/components/`.

---

## Deployment

The site is configured for static/CDN hosting. After pushing to the main branch:

- Changes automatically propagate to the live site
- CDN may take 1–5 minutes to update

The `CNAME` file points to `colorstackosu.org`.

---

## Branches

| Branch                  | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `main`                  | Production — deployed to live site                                      |
| `archive/old-html-site` | Preserved copy of the old vanilla HTML/JS/CSS site (for reference only) |

---

## Questions?

Reach out on the [ColorStack OSU Slack](https://colorstackosu.slack.com/) or email colorstackosu@gmail.com.
