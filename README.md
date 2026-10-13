# SkyVoyage — Aeroplane Tours & Luxury Travel

> An ultra-luxury, high-conversion single-page web experience for private aviation charters, bespoke aeroplane tours, and global VIP travel expeditions. Designed and engineered to agency-grade standards.

![SkyVoyage Hero Preview](public/favicon.svg)

---

## ✈️ Project Overview

**SkyVoyage** embodies the aesthetic of modern private aviation: clean, confident, cinematic, and editorial. Built with a bespoke design system featuring deep midnight blues, electric sky cyan gradients, sunset gold accents, and subtle glassmorphic textures.

### Key Highlights
- **Cinematic Runway Preloader**: Custom SVG airplane takeoff with progress counter, session-storage memorization (shows once per session), and reduced-motion bypass.
- **Hero Flight Experience**: Word-by-word masked typography reveal ("Fly Beyond the Ordinary."), animated SVG flight path with continuous dashed stroke trail, flying jet marker, and 3D mouse parallax tilt.
- **Interactive Flight Search Widget**: Multi-mode tabs (Round Trip / One Way / Multi-Leg), 22+ international luxury hubs with IATA combobox autocomplete, interactive 360° airport swap button, guests & cabin counters, and real-time animated search results drawer.
- **The Flight Corridor (Signature GSAP Moment)**: ScrollTrigger-pinned flight vector on desktop (180vh scrub) tracking departure, cruise, and approach phases with telemetry, gracefully unpinning on mobile/touch screens.
- **8 Curated Destinations**: Dubai, Paris, Bali, Maldives, Tokyo, Santorini, New York, and Switzerland, featuring 3D tilt cards, Unsplash photography, and an interactive itinerary modal.
- **Tiered Flight Packages**: Domestic & International animated toggle, flash countdown timer, and 4 tiers (Economy Explorer, Business Elite [Most Popular], First Class Luxury, Honeymoon Special).
- **Travel Services Bento Grid**: 6 asymmetric services (Flight Booking, Hotel Reservations, Visa Assistance, Travel Insurance, Airport Transfers, Custom Tour Planning) with animated icons and perks.
- **Stats & Fleets Marquee**: Viewport-triggered count-up metrics alongside a continuous infinite marquee of partner airline alliances and private jet fleets (pauses on hover).
- **Concierge Booking Manifest**: Split editorial layout with terminal contacts and a `react-hook-form` + `zod` validated booking form featuring celebratory confetti on dispatch.
- **Architectural Footer**: Giant outlined "SKYVOYAGE" typographic display, live coordinates, newsletter dispatch, and an animated "Back to Sky" scroll trigger.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` (configured purely in `src/index.css` with `@theme` variables)
- **Smooth Inertia Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) synchronized with GSAP ScrollTrigger
- **Motion & Timeline Engine**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger (`lagSmoothing(0)` sync)
- **Micro-interactions & Presence**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + `@hookform/resolvers`
- **Celebration Effects**: `canvas-confetti` (code-split dynamically)

---

## 📁 Project Structure

```
Aeroplane/
├── index.html                   # HTML shell with Google Fonts preconnect, SEO meta tags & favicon
├── package.json                 # Dependencies & project scripts
├── vite.config.js               # Vite config with @tailwindcss/vite & optimized rollup chunking
├── public/
│   └── favicon.svg              # Custom luxury SVG airplane mark
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main single-page layout & state coordination
    ├── index.css                # Tailwind v4 @theme tokens, typography, glassmorphism utilities
    ├── assets/                  # Static assets & graphics
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx       # Sticky glass navbar with scroll hide/reveal & mobile drawer
    │   │   ├── Footer.jsx       # Outlined architectural wordmark, newsletter, back-to-top
    │   │   ├── Preloader.jsx    # Runway takeoff animation (max 2s, sessionStorage cached)
    │   │   ├── CustomCursor.jsx # Desktop reticle & follower ring (disabled on touch)
    │   │   └── SmoothScroll.jsx # Lenis + GSAP ScrollTrigger integration provider
    │   ├── sections/
    │   │   ├── Hero.jsx                 # Layered sky backdrop, SVG flight path, masked reveal
    │   │   ├── BookingWidget.jsx        # Floating search card with 20+ airports & results drawer
    │   │   ├── FlightCorridor.jsx       # Signature scroll-scrubbed flight path (gsap.matchMedia)
    │   │   ├── PopularDestinations.jsx  # 8 destination 3D tilt cards & luxury modal
    │   │   ├── FlightPackages.jsx       # Domestic/Intl switch, countdown timer, 4 tiers
    │   │   ├── TravelServices.jsx       # 6-tile Bento Grid layout
    │   │   ├── StatsAndPartners.jsx     # CountUp metrics & infinite partner marquee
    │   │   ├── AboutUs.jsx              # Two-column story, aviation image collage, milestones
    │   │   ├── Testimonials.jsx         # Autoplaying glass review carousel
    │   │   └── ContactBookingForm.jsx   # Zod-validated booking manifest with confetti
    │   └── ui/
    │       ├── Logo.jsx                 # Custom vector airplane mark + SkyVoyage typography
    │       ├── MagneticButton.jsx       # Pointer physics button with touch fallback
    │       ├── GlassCard.jsx            # Performance-tuned surface card with 3D tilt option
    │       ├── SectionHeading.jsx       # Fluid display typography & animated flight underline
    │       ├── AirportCombobox.jsx      # Accessible combobox with search & keyboard navigation
    │       └── CountUpNumber.jsx        # Smooth easing numeric counter
    ├── data/
    │   ├── airports.js          # 22 luxury international hubs with IATA codes
    │   ├── destinations.js      # 8 curated destinations with photography & pricing
    │   ├── packages.js          # Domestic & International flight package tiers
    │   ├── services.js          # 6 travel service categories & bento layout tokens
    │   ├── stats.js             # Metrics, partner airlines marquee data, milestones, team
    │   └── testimonials.js      # Verified traveler reviews & routes
    ├── hooks/
    │   ├── useScrollDirection.js # Tracks scroll direction for navbar hiding/revealing
    │   ├── useReducedMotion.js   # Detects prefers-reduced-motion media query
    │   └── useIsTouch.js         # Detects touch screens and fine pointers
    └── lib/
        └── utils.js             # Currency & date formatters, safe image fallbacks
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node v24)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd Aeroplane

# Install dependencies
npm install

# Launch the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
# Create an optimized, code-split production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🎨 Design Tokens & Customization

All design tokens are defined in [`src/index.css`](file:///c:/Users/rohit/Downloads/Daily%20Tasks/Aeroplane/src/index.css) using Tailwind CSS v4's `@theme` directive:

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `--color-navy-950` | `#060A18` | Deepest canvas background |
| `--color-navy-900` | `#0A1128` | Primary dark surface |
| `--color-navy-800` | `#0F1A3A` | Translucent solid surface cards |
| `--color-sky-blue` | `#1E90FF` | Primary aviation blue accent |
| `--color-cyan-glow` | `#00D4FF` | Accent gradient & interactive glow |
| `--color-sunset-gold` | `#F5B841` | High-priority CTAs & badges |
| `--color-soft-white` | `#F7F9FC` | Heading & high-contrast body text |

### Adding Airports
Add entries to [`src/data/airports.js`](file:///c:/Users/rohit/Downloads/Daily%20Tasks/Aeroplane/src/data/airports.js):
```js
{ code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' }
```

### Adding Destinations
Modify or add destinations in [`src/data/destinations.js`](file:///c:/Users/rohit/Downloads/Daily%20Tasks/Aeroplane/src/data/destinations.js).

---

## ♿ Accessibility & Performance Principles

1. **WCAG AA Compliance**: High-contrast text on dark backgrounds; zero gold text on white.
2. **Keyboard Navigation**: Accessible combobox dropdowns (`role="combobox"`, `aria-expanded`, ArrowUp/Down/Enter selection) and clear focus rings (`focus-visible:ring-cyan-400`).
3. **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`. Automatically skips preloader, disables parallax tilts, custom cursors, marquee scrolling, and displays clean static layouts.
4. **Touch Device Optimization**: Custom cursor and 3D card tilt are automatically disabled on touch devices (`(pointer: coarse)` / `ontouchstart`). The signature Flight Corridor dynamically unpins on mobile viewports via `gsap.matchMedia()` to eliminate any scroll jank.
5. **Mobile-First Responsive Testing**: Verified at 360px, 390px, 768px, 1024px, and 1440px viewports with zero horizontal overflow and 44px minimum touch targets.

---

## 📄 License
Created for SkyVoyage Tours & Charters. All rights reserved.
