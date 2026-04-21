# Event Finder — Dark-Mode Entertainment Showcase

## Tone & Differentiation
Vibrant entertainment discovery platform. Deep navy background (#0a0a1a) with neon purple→cyan gradients, glassmorphism cards, and smooth premium animations. Designed to inspire and energize event seekers with visual richness and motion choreography.

## Color Palette

| Token | Dark L | Dark C | Dark H | Use |
|-------|--------|--------|--------|-----|
| background | 0.05 | 0 | 0 | Ultra-deep navy; page canvas |
| foreground | 0.96 | 0 | 0 | Near-white text; maximum contrast |
| card | 0.1 | 0 | 0 | Translucent event card base layer |
| primary | 0.65 | 0.24 | 269 | Purple; hero gradient, CTAs, active states |
| accent | 0.72 | 0.22 | 184 | Cyan; neon glow, highlights, "Live" badges |
| secondary | 0.18 | 0 | 0 | Deep grey; metadata, secondary text |
| muted | 0.14 | 0 | 0 | Ultra-muted; disabled, tertiary, subtle fills |
| border | 0.16 | 0.05 | 270 | Subtle purple-tinted border; glass card edges |
| destructive | 0.62 | 0.2 | 28 | Red-orange; report, delete, alert actions |

## Typography
- **Display**: Bricolage Grotesque (bold, geometric, hero headings with gradient clip)
- **Body**: DM Sans (clean modern, 16px base, event descriptions, metadata)
- **Mono**: Geist Mono (tight, badges, pricing, tech details)

## Structural Zones
| Zone | Background | Border | Treatment |
|------|------------|--------|-----------|
| navbar | card with glass-card | border-b | Sticky, logo + search + CTA, shadow-elevated |
| hero | gradient-hero | none | Full-width animated gradient, centered search, category chips below |
| cards grid | background | none | Responsive 1→2→3 col, glass-card effect, fade-in-up animation |
| modal | popover with glass-card | border | Event details, fixed centered, ESC-closable |
| filters sidebar | card with glass-card | border-r | Collapsible on mobile, date/price/distance pickers |
| trending section | background | none | Horizontal scroll, fire emoji badges, hot events row |
| organizers section | background | none | 4-avatar grid, follow buttons, follower counts |
| stats bar | muted/20 | border-t/b | Animated counters, 4-column layout |
| newsletter | muted/15 | border-t | Gradient subscribe button, privacy note |
| footer | muted/10 | border-t | Link columns, social icons |

## Shape Language
- Border radius: 0.625rem (base) — refined rounded, not playful
- Glassmorphism: backdrop-filter blur(16px), rgba(255,255,255,0.1) border
- Shadows: `shadow-elevated` for cards; neon-glow for hover states
- Borders: 1px on glass cards; accent-color (cyan) on active interactive elements

## Animation & Motion
- **Default transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive state changes
- **Card mount**: fade-in-up 0.4s ease-out via animate-fade-in-up
- **Live badge**: pulse-glow 2s infinite (opacity 1→0.5→1)
- **Card hover**: scale(1.03) + neon-glow + transition-smooth
- **Skeleton loader**: shimmer 2s infinite on load (1.5s visible)
- **Hero heading**: text-gradient (purple→cyan) with text-clip effect

## Component Patterns
- **Event Cards**: glass-card, bg-card, rounded-lg, animate-fade-in-up on mount, hover:scale-103 hover:neon-glow
- **Buttons**: gradient-hero for primary CTAs ("Get Tickets"), accent-colored for secondary, transparent with border for tertiary
- **Badges**: pill-shaped, color-coded by category (Music=purple, Tech=blue, Food=orange, etc.), "LIVE NOW" with animate-pulse-glow
- **Inputs**: bg-input border-border rounded-md, focus:ring-2 ring-accent, glass-card aesthetic
- **Hearts/Interested**: transition-smooth, accent color on active, animated +1 counter on click

## Constraints
- Maximum line length: 60-80 chars for body copy (readability on card)
- Minimum touch target: 44px (buttons, card click areas)
- Text contrast: AA+ on all surfaces (tested on card/dark backgrounds)
- No blur on text; blur only on card background (glassmorphism layer)
- Neon glow on hover only — no always-on glows (preserve battery, reduce flicker)
- One dominant gradient (purple→cyan); secondary accents (orange, green) reserved for badges

## Signature Detail
Vibrant hero gradient with oversized text-gradient hero heading creates immediate visual impact. Glassmorphic event cards with semi-transparent borders and smooth hover animations (scale + neon-glow) deliver premium feel. Pulsing "LIVE NOW" badges and shimmer loaders add motion choreography. Category-colored badges and gradient CTAs reinforce entertainment energy.

