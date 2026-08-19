# NexaFlow - Frontend Engineering Assessment

A modern, high-performance SaaS landing page built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn UI**, and **Framer Motion**.

---

## ⚡ Key Highlights & Architecture

- **Configuration-Driven Content (`config.ts`)**: Single source of truth for all copy, metrics, logos, and links—allowing non-dev teams to update content without touching JSX.
- **Centralized Motion Engine (`animation-config.ts`)**: Standardized physics, easing curves (`[0.16, 1, 0.3, 1]`), and reusable variants across all sections.
- **Clean Architecture & SOLID Principles**: Pure presentation components with decoupled math, parsers, and mouse utilities isolated in `lib/utils.ts`.
- **shadcn UI & Global Color Tokens**: Strictly built with `@base-ui/react` primitives and semantic OKLCH color variables (zero hardcoded ad-hoc colors, zero inline SVGs).
- **Preserved Desktop Margin & Interactive Toggle**: Custom desktop right margin (`md:mr-10`) is preserved, and clicking **"Book a Demo"** dynamically toggles the full-width view in real-time.

---

## 🎨 Modern Design & Animation Enhancements

Beyond the static brief, several modern UX micro-interactions were introduced for a premium SaaS feel:

1. **Sticky Navbar & Active Pill Marker**: Glassmorphic header with a spring-animated sliding active pill and micro-dot indicator (`layoutId`).
2. **Interactive Hero Circles**: Ambient background circles with real-time cursor spring parallax (`useSpring`) and dynamic scroll-based position swapping (left $\leftrightarrow$ right).
3. **Upward Trending Live Chart**: Progressive path drawing (`pathLength: 0 $\to$ 1`), subtle violet gradient fill, green `Live` status badge, and a pulsing peak radar indicator.
4. **Directional Gradient Buttons**: Tactile left-to-right gradient sweeps (`origin-left scale-x-0 $\to$ 100%`) with high-contrast text color inversion.
5. **Dynamic Number Counters**: Viewport-triggered spring counters supporting decimals, percentages (`42%`, `41%`), suffixes (`3.8k`), and zero-padding (`01-03`).
6. **Ambient Trust Bar & Workflow Pipeline**: Breathing color glow auras on brand logos and sequentially animated connector lines across workflow nodes.

---

## 📁 Project Structure

```
├── app/                  # App Router pages, layout, robots.ts, sitemap.ts
├── components/
│   ├── manual/           # Page sections (Hero, Navbar, Platform, TrustedBy, etc.)
│   └── ui/               # shadcn UI primitives (Button, Card, Badge)
├── public/               # Static assets, robots.txt, llms.txt
├── animation-config.ts   # Central motion variants & transition curves
├── config.ts             # Central data configuration
└── lib/utils.ts          # Pure helper functions & number parsers
```

---

## 🧪 Quality & Verification

- **TypeScript**: `npx tsc --noEmit` $\to$ **0 Errors**
- **ESLint**: `npm run lint` $\to$ **0 Errors, 0 Warnings**
- **SEO & AI Ready**: Includes native `robots.ts`, `sitemap.ts`, and `llms.txt`.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build & start for production
npm run build
npm run start
```
