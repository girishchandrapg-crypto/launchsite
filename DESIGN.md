# Design Brief

## Tone & Differentiation
Editorial tech aesthetic. Crisp, authoritative, minimal decoration. Teal accent provides energy without noise.

## Color Palette

| Token | Light L | Light C | Light H | Dark L | Dark C | Dark H | Use |
|-------|---------|---------|---------|--------|--------|--------|-----|
| primary | 0.18 | 0 | 0 | 0.92 | 0 | 0 | Deep charcoal; primary text, strong hierarchy |
| secondary | 0.88 | 0.02 | 200 | 0.25 | 0 | 0 | Warm neutral grey; secondary text, muted states |
| accent | 0.54 | 0.16 | 180 | 0.68 | 0.14 | 190 | Vibrant teal; CTAs, highlights, active states |
| background | 0.98 | 0 | 0 | 0.1 | 0 | 0 | Page background; light clean, dark deep |
| foreground | 0.12 | 0 | 0 | 0.97 | 0 | 0 | Body text and primary content |
| card | 0.99 | 0 | 0 | 0.15 | 0 | 0 | Surface for elevated components |
| border | 0.92 | 0 | 0 | 0.25 | 0 | 0 | Dividers, subtle edges |
| muted | 0.93 | 0 | 0 | 0.22 | 0 | 0 | Disabled, tertiary, background fills |

## Typography
- **Display**: Bricolage Grotesque (bold, geometric, distinctive)
- **Body**: DM Sans (clean, modern, highly legible)
- **Mono**: Geist Mono (technical, tight letter-spacing)

## Structural Zones
| Zone | Background | Border | Treatment |
|------|------------|--------|-----------|
| header | card | border-b | Elevated shadow, rounded corners, padding-y 3 |
| hero | background | none | Full-width, asymmetric teal accent stripe on right |
| features | background | none | 3-col grid, each card has shadow-subtle, rounded-lg |
| testimonials | muted/10 | border | Section background subtle, cards elevated with shadow-elevated |
| pricing | background | none | 3-tier layout, recommended tier has accent background + shadow-elevated |
| about | background | none | Side-by-side (image left, copy right), 50/50 split |
| contact | background | none | Centered max-w-md card with shadow-elevated |
| footer | muted/20 | border-t | Subtle background, reduced text contrast |

## Shape Language
- Border radius: 0.625rem (base) — refined, not playful
- Borders: 1px, accent-color only on interactive highlights
- Shadows: three levels — subtle (2px/0.08), elevated (4px/0.12)

## Component Patterns
- **Buttons**: primary bg-primary text-primary-foreground, secondary bg-secondary text-secondary-foreground, outline bg-transparent border-2 border-primary
- **Cards**: bg-card rounded-lg shadow-subtle, padding-6
- **Inputs**: bg-input border-border rounded-md, focus:ring-2 ring-accent
- **Links**: text-accent underline-none, hover:underline

## Motion
- Default transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive state changes
- Entrance: subtle fade-in on scroll (IntersectionObserver)
- Hover: 0.2s color/shadow shift on interactive elements

## Constraints
- Maximum line length: 70-90 chars for body copy
- Minimum touch target: 44px
- Text contrast: AA+ on all surfaces (tested in light + dark)
- No blur, glow, or neon effects
- One accent color only (teal)

## Signature Detail
Geometric accent stripe in hero section — subtle diagonal teal line breaking the horizontal rhythm, reinforcing modern editorial aesthetic. Repeated as thin accent borders on section dividers for visual continuity.
