# Zorlex Preset 2 - Project Status & Context

**Workspace**: `/Users/mitchellschafer/Library/Mobile Documents/com~apple~CloudDocs/marketing agency/zorlex-preset-2`

This document serves as the master context file for Antigravity or any other AI agent. Read this first to understand the current architecture, design system, and state of the app!

## Tech Stack & Architecture
- **Framework**: React + Vite
- **Styling**: Tailwind CSS (Native/Custom configuring)
- **Animations**: GSAP (GreenSock) for high-performance scroll triggers and layout animations.
- **Routing**: `react-router-dom`
- **Hosting**: Netlify (Automated CI/CD via GitHub pushing to `main`)

## Design System & Aesthetic
The site is built around a **Sleek, High-Tech, Dark-Mode Glassmorphism** aesthetic.
- **Colors**: 
  - Backgrounds: Dark slate/black (`#0D0D12`, `#1A1A24`).
  - Text: Mostly `text-light` (white) with muted secondary text (`text-white/70`).
  - Accents: Electric Indigo (`#6366F1`) and Sky Blue (`#93C5FD`) or `text-accent`. 
- **Typography** (from `tailwind.config.js`):
  - `font-heading`: Sora / Space Grotesk (Bold, expressive, no italics across UI cards)
  - `font-body`: Inter (Clean readability)
  - `font-mono`: IBM Plex Mono (Used for tags, pills, tech stacks, "engineering" feel)
- **Cards**: All cards use `bg-dark-surface`, rounded corners (`rounded-[24px]`), subtle borders (`border-border/20`), and hover effects (`hover:-translate-y-1 hover:shadow-xl`).

## Key Features & Files Modified

### 1. The Dynamic CMS (`src/components/ServicePage.jsx`)
- The "Website Design and Development" service page acts as a dynamic **Portfolio Grid**.
- **Data Source**: Fetches live data via a published Google Sheets CSV URL.
- **Data Tab**: Currently explicitly targets the "websites" tab of the Zorlex AI Projects Google Sheet using `&gid=2134175586&single=true`.
- **Parsing Logic**: 
  - Contains robust schema detection (`isNewFormat`) that translates the 17-column CSV dataset directly into React objects.
  - Automatically filters out any rows where the Status column does not explicitly equal `"publish"`.
- **Image Handling**: Google Drive image URL sharing links are aggressively parsed. It extracts the ID and dynamically manipulates it into `https://drive.google.com/thumbnail?id={ID}&sz=w1000` to magically bypass Google Drive CORS/Security blocks and render thumbnails flawlessly.

### 2. Interactive Lightboxes (`src/components/ServicePage.jsx`)
- Clicking "View Details" on a portfolio card triggers a GSAP-animated full-screen Lightbox.
- It maps the "Full Description" (Col 4), Tech Stack / Skills (Col 8), Client (Col 1), and Industry (Col 2).
- Contains an automated "Visit Live Site" button if a valid URL exists in the CSV.

### 3. Integrated SVG GSAP Components (`src/components/BrowserMockupSVG.jsx`)
- An interactive `BrowserMockupSVG.jsx` React component sits in the Hero section of the Website Design page.
- Created via raw inline SVG to bypass CSS sandboxing security limits.
- Hooked to `gsap.context()` inside a `useEffect` to trigger infinite typing animations, flashing cursors, and layout block deployment sequences on page load.

## Agent Instructions for Continuation
1. **Maintain Theme**: Any new components MUST adhere to the dark-mode glassmorphism theme (`bg-dark-surface border-border/20`). Do NOT default to basic white/light Tailwind components.
2. **GSAP First**: Use GSAP for page entrance animations (`opacity: 0, y: 50 -> opacity: 1, y: 0`), avoiding standard CSS animations unless completely trivial.
3. **Deployment**: When code is finalized, always execute `git add . && git commit -m "..." && git push` to trigger the Netlify deployment pipeline automatically for the user.
