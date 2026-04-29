# Implementation Plan: Design Revamp

## Overview

Implement the editorial-brutalist visual redesign of the ColorStack at OSU website. The work proceeds in dependency order: design system tokens first, then fonts and Tailwind wiring, then component-by-component redesign, then cross-cutting concerns (section transitions, atmospheric effects, responsive polish, accessibility).

All implementation is in TypeScript/TSX using the existing Next.js + Tailwind + GSAP stack.

## Tasks

- [x] 1. Establish design token foundation in globals.css and Tailwind config
  - Add all CSS custom properties to the `:root` block in `app/globals.css`: brand colors (including extended palette — `--color-brand-red-muted`, `--color-brand-red-light`, `--color-brand-cream`, `--color-brand-charcoal`, `--color-brand-slate`), typography scale (`--text-hero` through `--text-overline` using `clamp()`), spacing scale (`--space-xs` through `--space-section`), and motion tokens (`--ease-out-expo`, `--ease-out-quart`, `--ease-in-out-sine`, `--duration-fast` through `--duration-reveal`)
  - Extend `tailwind.config.ts` with `brand.*` color aliases, `font-display`/`font-body` font families, `text-hero`/`text-display`/`text-heading`/`text-subheading`/`text-body`/`text-caption`/`text-overline` font-size utilities, `space-xs` through `space-section` spacing utilities, and `ease-out-expo`/`ease-out-quart`/`ease-in-out-sine` timing function utilities — all referencing the CSS custom properties
  - Keep all existing color aliases (`primary-red`, `hover-red`, `dark`, etc.) intact so no existing components break
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7_

  - [ ]\* 1.1 Write property test for WCAG color contrast compliance
    - **Property 1: WCAG Color Contrast Compliance**
    - Create `__tests__/design-system/colorContrast.property.test.ts`
    - Use `fast-check` to generate arbitrary pairings from the design system's defined text colors and background colors
    - Implement the WCAG 2.1 relative luminance formula and contrast ratio calculation
    - Assert ≥ 4.5:1 for body-text pairings and ≥ 3:1 for large-text pairings
    - Tag: `Feature: design-revamp, Property 1: WCAG Color Contrast Compliance`
    - **Validates: Requirements 17.1, 17.2**

- [x] 2. Replace font loading with Syne + Source Serif 4 via next/font
  - In `app/layout.tsx`, remove the `Onest` import and replace with `Syne` (variable `--font-display`, `display: "swap"`) and `Source_Serif_4` (variable `--font-body`, `display: "swap"`)
  - Apply both CSS variables to the `<html>` element's `className`
  - Update `tailwind.config.ts` `fontFamily` so `font-display` maps to `["var(--font-display)", "sans-serif"]` and `font-body` maps to `["var(--font-body)", "Georgia", "serif"]`; update the existing `font-sans` fallback to use `font-body` or remove it if no longer needed
  - Verify no component hardcodes `font-onest` or `var(--font-onest)` — update any that do
  - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 1.6_

- [x] 3. Redesign Navigation component
  - Refactor `components/Navigation.tsx` to start transparent (no background) and gain `backdrop-blur-md bg-white/80 border-b border-black/10` on scroll past the hero — use a `useEffect` + `scroll` listener toggling a state class
  - Apply `font-display` at `text-overline` size, uppercase, with wide letter-spacing (`tracking-widest`) to all desktop nav links
  - Replace the current hover color change with a red underline that slides in from center using a CSS `::after` pseudo-element (add a `.nav-link` class in `globals.css` mirroring the existing `footer-nav-link` pattern)
  - Add an active-page red dot indicator below the current page link (use `usePathname` from `next/navigation`)
  - Redesign the mobile menu as a full-screen overlay: `fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center`; links stack vertically at `text-display` scale; animate open/close with GSAP staggered slide-in from right (80ms delay between items) and an X morph on the hamburger button
  - Preserve all existing navigation destinations and ARIA attributes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]\* 3.1 Write unit tests for Navigation
    - Verify logo renders, all six destinations present (Events, Sponsors, Meet Us, About, Contact Us, Test Bank), sticky positioning class, mobile menu toggle, ARIA attributes
    - _Requirements: 3.1, 3.2, 3.4, 3.6_

- [x] 4. Redesign HeroSection — magazine-cover composition
  - Restructure `components/home/HeroSection.tsx` as a full-viewport section (`min-h-screen`) with the hero photo bleeding to the left edge at ~55% width and the text content on the right, overlapping the photo edge slightly (negative left margin or absolute positioning)
  - Headline treatment: "Welcome to" in `font-body italic` at `text-subheading`, then "ColorStack" in `font-display text-hero text-brand-red`, then "at Ohio State" in `font-display` at `text-display` — all left-aligned with generous `leading-tight`
  - Remove the typewriter CSS animation; replace with a GSAP timeline (registered in a `useEffect`):
    1. Photo clips in from left via `clip-path` reveal (0.8s)
    2. "Welcome to" fades up (0.4s, 0.3s delay)
    3. "ColorStack" slides in from right (0.6s, 0.5s delay)
    4. "at Ohio State" fades up (0.4s, 0.7s delay)
    5. CTA button scales in (0.3s, 1.0s delay)
    6. Sponsor scroller fades in (0.4s, 1.2s delay)
  - Preserve the "Become a Member" Airtable link and all existing `aria-label` attributes
  - Mobile layout: photo full-width above text with a gradient fade at the bottom; text stacks below
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [ ]\* 4.1 Write unit tests for HeroSection
    - Verify headline text, display font class on "ColorStack", CTA link href, hero photo alt text, sponsor scroller presence
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Redesign SponsorScroller
  - Update `components/home/SponsorScroller.tsx` to render logos with `filter: grayscale(1) opacity(0.6)` by default, transitioning to `filter: grayscale(0) opacity(1)` on section hover (add a CSS class in `globals.css` using the `.logos:hover img` selector pattern)
  - Ensure the existing `@media (min-width: 992px) .logos:hover .logos-slide { animation-play-state: paused }` rule is preserved
  - Position the scroller at the bottom of the hero section, full-width
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]\* 5.1 Write unit tests for SponsorScroller
    - Verify all sponsor logos render, animation class present, `aria-label` on container
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 6. Redesign MissionSection — editorial pull-quote layout
  - Refactor `components/home/MissionSection.tsx` to render the mission statement as a large pull-quote: `font-display` at `text-display` scale, centered, with a thin red `<hr>` rule above and below (reuse `.divide-line-main` or create a new `.divide-line-red-center` variant)
  - Redesign the three program pillar cards as photo-background cards: the image fills the card as a CSS `background-image` (or `<Image>` with `object-cover` and `fill`), overlaid with a dark gradient (`from-transparent to-brand-dark`), and the title (`font-display`) + description (`font-body`) in white text at the bottom
  - Desktop grid: first card spans 2 columns (`col-span-2`), the other two stack in the third column — use CSS Grid (`grid-cols-3`)
  - Stagger card entrance: first card slides from left, second from right, third from bottom — use `RevealAnimator` with appropriate variants or GSAP ScrollTrigger
  - Preserve dark background, "Learn More" link, and all `aria-labelledby` attributes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]\* 6.1 Write unit tests for MissionSection
    - Verify mission heading uses display font class, three pillar titles and descriptions present, dark background class, "Learn More" link href
    - _Requirements: 5.1, 5.2, 5.5, 5.6_

- [ ] 7. Redesign StatsSection — typographic wall with count-up
  - Refactor `components/home/StatsSection.tsx` to remove the SVG shape dividers and ribbon clip-paths
  - Desktop layout: a 3×2 CSS Grid where each cell shows the stat value in `font-display text-hero` and the label in `font-body text-caption` below; alternate cells between `text-brand-red on bg-brand-light` and `text-white on bg-brand-dark` for a checkerboard rhythm
  - Mobile layout: 2-column grid with values at `text-display` scale
  - Replace the existing GSAP scroll-scale animation with a count-up animation: use GSAP `ScrollTrigger` to trigger a `gsap.to()` on a numeric object, updating a React state or DOM text node; stagger left-to-right, top-to-bottom with 100ms between cells
  - Parse stat values (e.g., "54%", "250+", "10+") to extract the numeric part for count-up, then re-append the suffix on completion
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]\* 7.1 Write unit tests for StatsSection
    - Verify all six stat values and labels render, display font class on stat values, brand color classes present
    - _Requirements: 6.1, 6.2, 6.4_

- [ ] 8. Redesign TestimonialsSection — editorial quote spreads
  - Refactor `components/home/TestimonialsSection.tsx` to remove the `ShapeDivider` SVG and the existing card/carousel structure
  - Desktop: paginated view where each "spread" is a two-column layout — photo left (40%, `object-cover`, rectangular with slight border-radius), quote right (60%); quote text in `font-body text-subheading`; a large decorative opening quotation mark in `font-display` at ~8rem, positioned as an oversized background element (absolute, low opacity); name in `font-body font-semibold`; year in `font-display text-overline uppercase text-brand-red`
  - Testimonial title uses `font-display` at `text-heading` scale
  - Transition between testimonials: crossfade with slight horizontal slide (CSS transition on opacity + transform, toggled by state)
  - Tablet: same two-column layout with reduced photo width (30%)
  - Mobile: stacked — circular photo centered above, quote below; vertically stacked (no carousel needed on mobile)
  - Preserve all four testimonials, all ARIA carousel attributes, and dot/arrow navigation
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]\* 8.1 Write unit tests for TestimonialsSection
    - Verify all four testimonials render with name, year, title, quote text, and photo; display font class on titles; navigation controls present
    - _Requirements: 7.1, 7.2, 7.5_

- [ ] 9. Redesign GetInvolvedSection — asymmetric triptych CTAs
  - Refactor `components/home/GetInvolvedSection.tsx` to implement the asymmetric triptych: on desktop, the center "Join The Community" card is elevated (`-translate-y-4 scale-105`) and visually dominant; flanking cards are at normal scale
  - Apply `font-display` to card titles and `font-body italic` to subtitle text
  - Replace the current `hover:-translate-y-[5px]` with a CSS perspective tilt effect: add a `perspective-card` class in `globals.css` using `transform-style: preserve-3d` and a subtle `rotateX`/`rotateY` on hover (use a JS `mousemove` listener or a pure CSS approximation with `:hover` transforms)
  - Preserve all three link destinations, ARIA labels, and the red variant styling for "Join The Community"
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]\* 9.1 Write unit tests for GetInvolvedSection
    - Verify three CTAs present, "Join The Community" has red background class, correct hrefs, display font class on titles
    - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [ ] 10. Checkpoint — ensure all home section tests pass
  - Run `npm test` and confirm all tests in `__tests__/` pass
  - Fix any TypeScript errors introduced by the font/token changes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Redesign Footer
  - Refactor `components/Footer.tsx` to a two-row structure: top row has logo left + nav links right (desktop), bottom row has social icons centered + copyright below
  - Apply `font-body` to all text; social icon circles use `bg-brand-red hover:bg-brand-red-hover`
  - Preserve the `.footer-nav-link` underline animation (already in `globals.css`)
  - Mobile: everything stacks and centers
  - Preserve all existing links, ARIA labels, and social destinations
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

  - [ ]\* 11.1 Write unit tests for Footer
    - Verify logo, all five page links, four social icons, copyright text, dark background class, red accent on social icons
    - _Requirements: 15.1, 15.2, 15.4, 15.5_

- [ ] 12. Redesign EventCard component
  - Refactor `components/events/EventCard.tsx` to use a 16:10 aspect ratio (`aspect-[16/10]`) with the thumbnail as a full-card background image
  - Apply a dark gradient overlay from bottom (`from-transparent to-brand-dark/80`); event name in `font-display text-white font-bold` and date in `font-body text-brand-red text-caption` sit at the bottom over the gradient
  - Hover: image scales to `scale-105` (CSS transition on the `<Image>` wrapper), gradient overlay shifts to a red tint (`bg-brand-red/30`), and a subtle border appears (`ring-2 ring-brand-red`)
  - Preserve the `onSelect` click handler, `aria-label`, and loading skeleton
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]\* 12.1 Write unit tests for EventCard
    - Verify event name and date render, display font class on name, body font class on date, click handler fires, brand color overlay class present
    - _Requirements: 13.1, 13.2, 13.4, 13.5_

- [ ] 13. Redesign MemberCard component
  - Refactor `components/execboard/MemberCard.tsx` to add a thin red border on hover (`ring-2 ring-brand-red`) around the circular photo
  - For interactive cards (with bio): on hover, overlay a red-tinted semi-transparent layer (`bg-brand-red/20`) and fade in a "View Bio" label (`font-body text-white text-sm`) centered over the photo
  - Apply `font-body font-semibold` to member name and `font-body text-caption` to position text
  - Preserve consistent photo size (`h-44 w-44`), company logo rendering, and all ARIA attributes
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]\* 13.1 Write unit tests for MemberCard
    - Verify photo, name, position render; interactive card has button role; body font class on name; consistent photo dimensions
    - _Requirements: 14.1, 14.2, 14.4, 14.5_

- [ ] 14. Implement section transitions — diagonal clip-paths and gradient bleeds
  - Remove all `ShapeDivider` SVG components from `StatsSection.tsx` and `TestimonialsSection.tsx`
  - Add a `.section-transition-diagonal` CSS class in `globals.css` using `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 3vw), 0 100%)` on the outgoing section and `clip-path: polygon(0 3vw, 100% 0, 100% 100%, 0 100%)` on the incoming section — apply negative margin (`-mt-[3vw]`) to create the overlap
  - Add a `.section-transition-gradient` CSS class for gradient bleeds: a `::after` pseudo-element with a gradient from the section's background color to the next section's background color over ~80px
  - Apply diagonal clip-path between MissionSection (dark) → StatsSection (light/dark checkerboard)
  - Apply gradient bleed between StatsSection → TestimonialsSection
  - Apply overlap (negative margin) between HeroSection → MissionSection for the layered depth effect
  - Verify no horizontal overflow is introduced at any viewport width (check with `overflow-x: hidden` on `<body>` if needed)
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 15. Enhance RevealAnimator with new variants
  - Add `clip-up` variant to `RevealVariant` type in `components/RevealAnimator.tsx`: initial state `clip-path: inset(100% 0 0 0)`, active state `clip-path: inset(0% 0 0 0)`, CSS transition 0.8s `ease-out-expo`
  - Add `blur-in` variant: initial state `filter: blur(8px) opacity(0)`, active state `filter: blur(0) opacity(1)`, CSS transition 0.6s
  - Add corresponding CSS classes `.reveal-clip-up`, `.reveal-blur-in` (and their `.active` states) to `globals.css`
  - Add `@media (prefers-reduced-motion: reduce)` block in `globals.css` that sets all reveal animation transitions to `0s` and all reveal elements to their active/visible state immediately
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]\* 15.1 Write unit tests for RevealAnimator enhancements
    - Verify `clip-up` and `blur-in` variants apply correct CSS classes, `will-change` attribute present, delay props work
    - _Requirements: 10.2, 10.3, 10.5_

- [ ] 16. Implement atmospheric effects — gradient mesh and noise texture
  - In `globals.css`, update `.hero-gradient-overlay::before` to use a multi-stop radial gradient mesh (soft red-to-cream) with `background-position` animated via `moveGradient` keyframe; keep opacity at 0.2
  - Add a `.noise-overlay` CSS class using an inline SVG `<feTurbulence>` filter as `background-image` at 3–5% opacity — apply this class to the hero section wrapper and the stats section dark panels
  - Update `.testimonial-gradient-overlay::before` to use the same animated radial gradient mesh pattern (subtle, opacity 0.1)
  - Ensure all atmospheric effect containers have `overflow: hidden` to prevent bleed
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 17. Responsive polish pass
  - Audit every redesigned component at 320px, 768px, 992px, and 1440px viewport widths
  - Ensure all interactive elements have minimum 44×44px tap targets on mobile (add `min-h-[44px] min-w-[44px]` where needed)
  - Verify fluid typography (`clamp()` values in CSS custom properties) scales correctly between breakpoints — no text overflow or truncation
  - Confirm single-column layout on mobile for Hero, Mission, Stats, Testimonials, GetInvolved, Footer
  - Confirm no horizontal scrolling at any viewport width between 320px and 1920px — add `overflow-x: hidden` to `<body>` in `layout.tsx` if any section causes overflow
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

- [ ] 18. Accessibility audit and fixes
  - Add visible focus indicators to all interactive elements that lack them: use `focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2` Tailwind utilities (or a global `globals.css` rule for `:focus-visible`)
  - Verify all animated content (RevealAnimator wrappers, GSAP-animated elements) renders in its final visible state in the DOM — confirm screen readers can access content regardless of animation state by checking that no `aria-hidden="true"` is applied to content elements during animation
  - Audit all icon-only buttons and links for `aria-label` attributes — add any missing ones
  - Confirm semantic HTML structure: `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<footer role="contentinfo">` are all present
  - Verify keyboard navigation works for the redesigned mobile menu overlay (Escape key closes, Tab cycles through links), the testimonials carousel (arrow keys or Tab to buttons), and the member bio modal
  - _Requirements: 17.3, 17.4, 17.5, 17.6, 17.7_

  - [ ]\* 18.1 Write unit tests for accessibility attributes
    - Verify focus indicator classes on interactive elements, ARIA labels on icon buttons, semantic landmark elements present, animated content not hidden from screen readers
    - _Requirements: 17.3, 17.4, 17.5, 17.6_

- [ ] 19. Final checkpoint — full test suite and build verification
  - Run `npm test` and confirm all tests pass (unit tests + property test)
  - Run `npm run build` and confirm no TypeScript errors or build failures
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- The design system (Task 1) and font loading (Task 2) must be completed before any component work — all subsequent tasks depend on the token and font variables being available
- The property test (Task 1.1) validates the mathematical WCAG contrast guarantee across all design system color pairings using `fast-check`
- Section transitions (Task 14) should be implemented after all section components are complete to avoid layout conflicts
- The `prefers-reduced-motion` media query (Task 15) is a cross-cutting concern — implement it once in `globals.css` rather than per-component
- Existing tests in `__tests__/components/` should continue to pass throughout — do not break existing component APIs
