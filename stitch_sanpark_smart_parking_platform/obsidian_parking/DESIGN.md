---
name: Obsidian Parking
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#a7c8ff'
  on-tertiary: '#003061'
  tertiary-container: '#0072d7'
  on-tertiary-container: '#f8f9ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a7c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-3xs: 0.25rem
  space-2xs: 0.5rem
  space-xs: 0.75rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
  grid-gutter: 1rem
  container-margin: 1rem
---

## Brand & Style

This design system establishes a dark-mode-first aesthetic tailored for a high-end, modern urban parking application. The brand personality is sleek, authoritative, and frictionless, evoking a sense of premium convenience and real-time control. The target audience consists of urban commuters, luxury vehicle owners, and time-sensitive drivers who demand absolute clarity and rapid execution. 

The visual language marries **Minimalism** with **High-Contrast / Bold** accents. It utilizes deep, immersive charcoal foundations paired with a striking electric red accent to draw the eye to critical interactive zones and live statuses. Typography is clean, utilitarian, yet refined, ensuring legibility in low-light driving conditions.

## Colors

The color palette is anchored by absolute darks to reduce glare and preserve OLED battery efficiency during night navigation. 

- **Primary Accent (`#E50914`):** Electric Cherry. Reserved for primary calls-to-action, active reservation states, and urgent alerts.
- **Secondary Surface (`#1E1E1E`):** Dark Charcoal. Used for cards, navigation bars, and elevated container surfaces.
- **Neutral Background (`#121212`):** Obsidian Black. The foundational canvas for the entire application.
- **Text & Contrast:** High-contrast pure white (`#FFFFFF`) for primary headers, and muted cool grey (`#A0A0A0`) for secondary metadata.
- **Neon Status Indicators:** High-saturation emerald (`#00FF66`) for available spots, amber (`#FFB800`) for reserved/expiring soon, and electric red (`#E50914`) for occupied spaces.

## Typography

Typography balances geometric modernism with crisp legibility. **Plus Jakarta Sans** provides welcoming yet authoritative geometric headlines, while **Inter** ensures data-heavy parking rates, timers, and addresses remain scannable and precise.

For mobile viewports, `headline-xl` gracefully clamps down to 28px to prevent line-wrapping on critical search headers. Ensure all numerical timers and pricing digits utilize tabular-nums for stable layout rendering during countdowns.

## Layout & Spacing

The layout model relies on a responsive fluid grid optimized for mobile-first map exploration and card-based browsing. 

- **Grid System:** A fluid 12-column structure on desktop that collapses seamlessly into a single-column stack on mobile devices.
- **Spacing Rhythm:** Based on a strict 4px/8px baseline grid. Standard component padding defaults to `1rem` (16px), with tight groupings utilizing `0.5rem` (8px).
- **Breakpoints:** Mobile (< 640px), Tablet (640px - 1024px), Desktop (> 1024px). On mobile, bottom sheets take precedence for parking spot details, while desktop utilizes a persistent split-screen layout with an interactive map on the left and scrollable listings on the right.

## Elevation & Depth

Depth is established through subtle tonal layering and low-contrast ghost outlines rather than heavy drop shadows, reinforcing the dark-mode-first paradigm.

- **Surfaces:** Use Dark Charcoal (`#1E1E1E`) stacked on Obsidian Black (`#121212`) to indicate elevation. Interactive cards receive a subtle 1px border using `#2A2A2A`.
- **Ambient Glows:** Active states and neon status indicators emit a diffused, low-opacity box-shadow matching their hue (e.g., Electric Cherry at 15% opacity) to create a glowing focal point against the dark canvas without causing visual fatigue.

## Shapes

The shape language employs a modern rounded aesthetic (`roundedness` level 2) to soften the high-contrast environment and create approachable, touch-friendly interactive targets.

- **Buttons & Inputs:** Standardized at `0.5rem` (8px) border radius.
- **Cards & Sheets:** Elevated containers use `1rem` (16px) radius for a smooth, premium card feel reminiscent of modern travel booking interfaces.
- **Badges & Status Pills:** Fully rounded (pill-shaped) to clearly delineate tags, pricing tiers, and live availability indicators.

## Components

- **Buttons:** Primary actions utilize solid Electric Cherry (`#E50914`) with high-contrast white text and a subtle hover glow. Secondary actions use Dark Charcoal surfaces with thin light-grey borders.
- **Chips & Filters:** Compact filter pills for amenities (e.g., "EV Charging", "Covered", "24/7") featuring unselected ghost states that transition to solid white text on dark charcoal with a red border when active.
- **Input Fields:** Search and date-picker inputs feature a `#1E1E1E` background, 8px rounding, and a high-contrast white placeholder/text style. Focus states transition the border instantly to Electric Cherry.
- **Cards:** Parking spot preview cards feature a thumbnail image with an overlaid neon status pill, bold title, hourly/daily rate, and distance metric, structured cleanly on a Dark Charcoal background.
- **Checkboxes & Radios:** Custom styled with a dark background, precise 2px neutral borders, and an Electric Cherry fill state upon selection.
- **Lists:** Clean divider-less lists utilizing generous vertical padding (`1rem`) with leading iconography and trailing chevron indicators for navigation history and saved locations.
- **Specialized Components:** 
  - *Live Countdown Timers:* Monospaced digits with glowing amber or red indicators for active parking sessions.
  - *Map Markers:* Custom floating price pills that transform into pulsing neon dots when a spot is selected.