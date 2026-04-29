# Implementation Plan: Next.js + Tailwind CSS Migration

## Overview

This plan migrates the ColorStack at Ohio State static website from Bootstrap 5 + vanilla HTML/CSS/JS to a Next.js 14+ App Router application with Tailwind CSS. Tasks are ordered to build foundational infrastructure first, then shared components, then individual pages, and finally integration and polish. Each task builds incrementally on previous work so there is no orphaned code.

## Tasks

- [x] 1. Initialize Next.js project with Tailwind CSS and core configuration
  - [x] 1.1 Scaffold Next.js 14+ App Router project with TypeScript
    - Run `npx create-next-app@latest` with App Router, TypeScript, Tailwind CSS, and ESLint enabled
    - Configure `tsconfig.json` with path alias `@/` pointing to the project root
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Configure Tailwind theme and global styles
    - Update `tailwind.config.ts` with custom colors (`primary-red`, `hover-red`, `bg-white`, `light-gray`, `dark`), Onest font family, custom animations (`slide`, `move-gradient`, `bounce-slow`, `typing-1/2/3`, `cursor-blink`), custom keyframes, and responsive breakpoints (`sm: 640px`, `md: 768px`, `lg: 992px`)
    - Create `app/globals.css` with Tailwind directives (`@tailwind base/components/utilities`) and custom CSS for reveal animation classes, gradient overlays, and any styles that cannot be expressed as Tailwind utilities
    - _Requirements: 1.4, 1.5, 12.1, 12.2, 12.8_

  - [x] 1.3 Configure Onest font via next/font and environment variables
    - Set up `next/font/google` for the Onest font in the root layout, applying the CSS variable `--font-onest`
    - Create `.env.local` with `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY` placeholder
    - Add `.env.local` to `.gitignore`
    - _Requirements: 1.6, 1.7, 11.5_

  - [x] 1.4 Migrate static assets to the public directory
    - Copy all image assets to `public/images/` preserving subdirectory structure (`eboard-photos/`, `sponsor-logos/`, `testimonial-photos/`)
    - Copy `Sponsorship Packet.pdf` to `public/assets/`
    - Copy favicon (`Logo.png`) to `public/`
    - _Requirements: 10.1, 10.2_

  - [x] 1.5 Install testing dependencies
    - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check` as dev dependencies
    - Create `vitest.config.ts` with jsdom environment and path aliases
    - _Requirements: (testing infrastructure for all subsequent test tasks)_

- [x] 2. Create TypeScript data models and data files
  - [x] 2.1 Define TypeScript interfaces
    - Create `types/board.ts` with `BoardMember`, `BoardYear`, and `BoardData` interfaces
    - Create `types/events.ts` with `EventItem` interface
    - Create `types/drive.ts` with `DriveImage` and `DriveFileResponse` interfaces
    - Create `types/sponsors.ts` with `Sponsor` and `SponsorTierData` interfaces
    - _Requirements: 11.1, 11.2_

  - [x] 2.2 Create typed data files
    - Create `data/board-data.ts` exporting `boardData: BoardData` with all three academic years of member data migrated from `js/eboard/eboard-data.js`
    - Create `data/events-data.ts` exporting `eventsData: EventItem[]` migrated from `js/events/events-data.js`
    - Create `data/sponsors-data.ts` exporting sponsor tier data organized by Platinum, Gold, Silver, and Bronze tiers migrated from `sponsors.html`
    - _Requirements: 11.3, 11.4_

- [x] 3. Implement Drive Gallery Service and utility modules
  - [x] 3.1 Create Drive Gallery Service
    - Create `lib/drive-gallery.ts` implementing `driveThumb(fileId, size?)`, `driveFull(fileId)`, and `fetchDriveFolderImages(folderId)` functions
    - Implement in-memory `Map<string, DriveImage[]>` cache for folder results
    - Read API key from `process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY`
    - Throw descriptive errors for missing API key and non-OK responses (include HTTP status code)
    - Return empty array for empty/undefined `folderId`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]\* 3.2 Write property test: Drive thumbnail URL generation (Property 6)
    - **Property 6: Drive thumbnail URL generation**
    - For any valid file ID string, `driveThumb` returns a URL matching `https://drive.google.com/thumbnail?id={fileId}&sz=w{size}`
    - **Validates: Requirements 9.2**

  - [ ]\* 3.3 Write property test: Drive folder caching is idempotent (Property 7)
    - **Property 7: Drive folder caching is idempotent**
    - For any folder ID, calling `fetchDriveFolderImages` twice produces identical results with at most one network request
    - Mock the fetch API to track call count
    - **Validates: Requirements 9.3**

  - [ ]\* 3.4 Write property test: Drive API error includes HTTP status code (Property 8)
    - **Property 8: Drive API error includes HTTP status code**
    - For any non-OK HTTP status code (400–599), `fetchDriveFolderImages` throws an error whose message contains the numeric status code
    - **Validates: Requirements 9.5**

  - [ ]\* 3.5 Write unit tests for Drive Gallery Service
    - Test missing API key throws error
    - Test empty/undefined folderId returns empty array
    - Test successful fetch returns mapped DriveImage array
    - Test network failure propagates error
    - _Requirements: 9.1, 9.4, 9.5_

- [x] 4. Implement shared components (Navigation, Footer, RevealAnimator)
  - [x] 4.1 Create the RevealAnimator client component and useReveal hook
    - Create `hooks/useReveal.ts` with `IntersectionObserver` logic returning `ref` and `isVisible`
    - Create `components/RevealAnimator.tsx` as a client component wrapping children with scroll-triggered animation
    - Support variants: `fade-up`, `scale-forward`, `slide-left`, `slide-right`
    - Support delay props: `100`, `200`, `300`, `400`, `500`
    - Perform initial visibility check on mount
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 4.2 Create the Navigation client component
    - Create `components/Navigation.tsx` as a client component with sticky navbar, ColorStack logo linking to home, page links (Events, Sponsors, Meet Us), and "About Us" dropdown with sub-links
    - Implement mobile hamburger menu toggle state for viewports below `lg` breakpoint
    - Use Next.js `Link` for all internal navigation
    - Style with Tailwind replacing all Bootstrap navbar classes
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.8_

  - [x] 4.3 Create the Footer server component
    - Create `components/Footer.tsx` as a server component with logo, page links (Events, Sponsors, Meet Us, About Us), social media buttons (Email, Instagram, LinkedIn, Slack), and dynamic copyright year
    - Show "Home" link only on small viewports via `md:hidden`
    - Use Next.js `Link` for internal navigation
    - _Requirements: 2.6, 2.7_

  - [x] 4.4 Create the root layout
    - Create `app/layout.tsx` rendering `Navigation` and `Footer` around `{children}`
    - Apply Onest font CSS variable to the `<html>` element
    - Configure metadata (title "ColorStackOSU", favicon, Open Graph defaults)
    - _Requirements: 2.1, 13.1, 13.2, 13.3_

- [x] 5. Checkpoint - Ensure project builds and shared components render
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Home Page
  - [x] 6.1 Create HeroSection and SponsorScroller client components
    - Create `components/home/HeroSection.tsx` with typewriter animation heading, "Become a Member" CTA button, and hero image (visible on `lg` viewports)
    - Create `components/home/SponsorScroller.tsx` with infinite horizontal scrolling sponsor logos, duplicated logo set for seamless loop, pause on hover for `lg` viewports
    - Use `next/image` for the hero image, standard `<img>` for SVG sponsor logos
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 10.3, 10.4, 12.6_

  - [x] 6.2 Create MissionSection server component
    - Create `components/home/MissionSection.tsx` with dark background, mission statement, "Learn More" link, and three mission cards (Workshops, Professional Development, Community) with `next/image` for card images
    - Wrap elements with `RevealAnimator` for scroll-triggered entrance
    - _Requirements: 3.5, 10.3_

  - [x] 6.3 Create StatsSection client component
    - Create `components/home/StatsSection.tsx` rendering red and dark ribbon banners on `md+` viewports with six statistics, and vertically stacked stats on small viewports
    - Integrate GSAP scroll-triggered scaling animation for small-viewport stats
    - Use `RevealAnimator` for ribbon entrance animations (slide-left, slide-right)
    - _Requirements: 3.6, 3.7, 3.8, 12.9_

  - [x] 6.4 Create TestimonialsSection client component
    - Create `components/home/TestimonialsSection.tsx` with carousel state management for `lg` viewports, horizontal row for `md`, and stacked cards for `sm`
    - Each testimonial card contains quote icon, title, text, student photo, name, and class year
    - _Requirements: 3.9, 3.10, 3.11, 3.12_

  - [x] 6.5 Create GetInvolvedSection server component
    - Create `components/home/GetInvolvedSection.tsx` with three CTA cards linking to Sponsors page, Slack community, and About page contact section
    - _Requirements: 3.13_

  - [x] 6.6 Assemble Home page
    - Create `app/page.tsx` composing HeroSection, MissionSection, StatsSection, TestimonialsSection, and GetInvolvedSection
    - Add page-level Open Graph metadata
    - _Requirements: 13.1, 13.4_

- [x] 7. Implement Events Page
  - [x] 7.1 Create CalendarEmbed client component
    - Create `components/events/CalendarEmbed.tsx` rendering the Styled Calendar iframe and loading the parent-window script
    - _Requirements: 4.1_

  - [x] 7.2 Create EventCard and EventGrid client components
    - Create `components/events/EventCard.tsx` displaying event thumbnail (fetched from Drive or placeholder), name, and date
    - Create `components/events/EventGrid.tsx` rendering EventCard components from events data, managing selected event state for gallery modal
    - Use `RevealAnimator` with staggered delays on cards
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 7.3 Create GalleryModal client component
    - Create `components/events/GalleryModal.tsx` as a modal overlay with photo thumbnail grid, full-size image viewer on click, loading/error/empty states
    - Fetch images via `DriveGalleryService`
    - Display "Couldn't load photos" on fetch error, "No photos found" on empty result
    - _Requirements: 4.5, 4.6, 4.7, 4.8_

  - [x] 7.4 Assemble Events page
    - Create `app/events/page.tsx` composing CalendarEmbed and EventGrid with GalleryModal
    - Add page-level Open Graph metadata
    - _Requirements: 13.1_

- [x] 8. Implement Exec Board Page
  - [x] 8.1 Create YearSelector client component
    - Create `components/execboard/YearSelector.tsx` rendering year buttons dynamically from Board_Data keys
    - Manage active year state, default to most recent year
    - Style active/inactive button states with Tailwind
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 8.2 Create MemberCard client component
    - Create `components/execboard/MemberCard.tsx` displaying member photo, name, position, and conditional company logo
    - Make image clickable (button role, click handler) only when member has a non-null, non-empty bio
    - Apply gradient shine overlay and lift transform on hover for `lg` viewports
    - _Requirements: 5.4, 5.5, 5.6, 12.7_

  - [ ]\* 8.3 Write property test: Member card clickability matches bio presence (Property 1)
    - **Property 1: Member card clickability matches bio presence**
    - For any BoardMember, the card image is clickable iff the member has a non-null, non-empty bio
    - Use fast-check to generate arbitrary BoardMember objects with varying bio values
    - **Validates: Requirements 5.5, 5.6**

  - [ ]\* 8.4 Write property test: Member card displays company logo conditionally (Property 2)
    - **Property 2: Member card displays company logo conditionally**
    - For any BoardMember, a company logo element is rendered iff the `company` field is defined and non-empty
    - **Validates: Requirements 5.4**

  - [x] 8.5 Create MemberModal client component
    - Create `components/execboard/MemberModal.tsx` displaying member photo, name, position, bio, LinkedIn link, and Calendly booking link
    - Disable "Book a Time" button when no Calendly URL; hide LinkedIn button when no LinkedIn URL
    - _Requirements: 5.7, 5.8, 5.9_

  - [ ]\* 8.6 Write property test: Member modal conditional button states (Property 3)
    - **Property 3: Member modal conditional button states**
    - For any BoardMember, LinkedIn button is visible iff `linkedin` is present, and Calendly button is enabled iff `calendly` is present
    - **Validates: Requirements 5.8, 5.9**

  - [x] 8.7 Create MemberGrid client component with grid balancing
    - Create `components/execboard/MemberGrid.tsx` rendering MemberCard components for the selected year
    - Implement grid balancing: insert spacer elements when `memberCount % 4 === 2` on `lg` viewports to center the last row
    - Contain MemberModal component, manage selected member state
    - _Requirements: 5.3, 5.10_

  - [ ]\* 8.8 Write property test: Grid balancing spacers (Property 4)
    - **Property 4: Grid balancing spacers**
    - For any positive member count in a 4-column grid, spacers are inserted iff `count % 4 === 2`
    - **Validates: Requirements 5.10**

  - [x] 8.9 Assemble Exec Board page
    - Create `app/execboard/page.tsx` composing YearSelector and MemberGrid
    - Add page-level Open Graph metadata
    - _Requirements: 13.1_

- [x] 9. Checkpoint - Ensure all tests pass and pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement Sponsors Page
  - [x] 10.1 Create SponsorHeader, SponsorTier, and SponsorEntry server components
    - Create `components/sponsors/SponsorHeader.tsx` with title, description, "Become A Sponsor" anchor button, and Sponsorship Packet PDF link
    - Create `components/sponsors/SponsorTier.tsx` rendering tier heading and list of SponsorEntry components with alternating background variants
    - Create `components/sponsors/SponsorEntry.tsx` displaying sponsor logo and description blurb with RevealAnimator
    - Use standard `<img>` for SVG sponsor logos
    - _Requirements: 6.1, 6.2, 6.3, 10.4_

  - [x] 10.2 Create SponsorForm client component
    - Create `components/sponsors/SponsorForm.tsx` with controlled form fields: Company Name (required), Contact Name (required), Email Address (required), Message (optional)
    - Implement client-side validation preventing submission when required fields are empty
    - Submit to Web3Forms API via `fetch` with hidden access key
    - Show success/error feedback messages after submission, preserve entered data on error
    - _Requirements: 6.4, 6.5, 6.6_

  - [ ]\* 10.3 Write property test: Sponsor form validation rejects incomplete submissions (Property 5)
    - **Property 5: Sponsor form validation rejects incomplete submissions**
    - For any combination of form field values where at least one required field is empty, the form prevents submission and does not call the API
    - **Validates: Requirements 6.6**

  - [x] 10.4 Assemble Sponsors page
    - Create `app/sponsors/page.tsx` composing SponsorHeader, SponsorTier components for each tier, and SponsorForm
    - Add page-level Open Graph metadata
    - _Requirements: 13.1_

- [ ] 11. Implement About Page
  - [ ] 11.1 Create About page components
    - Create `components/about/AboutHero.tsx` (server) with ColorStack logo, heading, and subheading with bounce animations
    - Create `components/about/AboutUsSection.tsx` (server) with mission description, social media links, offerings list, and national ColorStack link
    - Create `components/about/ContactUsSection.tsx` (server) with description and mailto link
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 11.2 Assemble About page with hash fragment scrolling
    - Create `app/about/page.tsx` as a client component wrapper composing AboutHero, AboutUsSection, and ContactUsSection
    - Implement `useEffect` to scroll to `#about-us` or `#contact-us` section on mount based on URL hash
    - Add page-level Open Graph metadata
    - _Requirements: 7.4, 13.1_

- [ ] 12. Implement animated gradient backgrounds and visual polish
  - [ ] 12.1 Add gradient background effects
    - Implement animated gradient overlays on Hero, About hero, Sponsor header, Testimonials, and Calendar sections using Tailwind custom classes and the `moveGradient` keyframe
    - Ensure gradient masks fade to transparent at section edges
    - _Requirements: 12.5_

  - [ ] 12.2 Implement GSAP scroll animation for small-viewport stats
    - Install `gsap` package
    - Add GSAP `ScrollTrigger` scaling animation to small-viewport stat elements matching the existing behavior (scale 0.9→1.3 with scrub)
    - _Requirements: 12.9_

- [ ] 13. Final integration and wiring
  - [ ] 13.1 Verify all internal links and routing
    - Ensure all Next.js `Link` components point to correct routes (`/`, `/events`, `/sponsors`, `/execboard`, `/about`)
    - Verify external links open in new tabs (Airtable signup, Test Bank, social media, Calendly, LinkedIn)
    - Verify hash fragment navigation on About page
    - _Requirements: 2.8, 7.4_

  - [ ] 13.2 Verify responsive behavior across breakpoints
    - Confirm Navigation collapses to hamburger menu below `lg`
    - Confirm Footer shows "Home" link below `md`
    - Confirm Stats ribbons vs stacked layout at breakpoints
    - Confirm Testimonials carousel/row/stacked at breakpoints
    - Confirm Hero image visibility at `lg`
    - _Requirements: 2.5, 2.7, 3.2, 3.7, 3.8, 3.10, 3.11, 3.12, 12.8_

  - [ ] 13.3 Verify SEO metadata on all pages
    - Confirm Open Graph title, description, image, and URL are set on each page
    - Confirm page title is "ColorStackOSU" across all pages
    - Confirm favicon is configured
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (Properties 1–8)
- Unit tests validate specific examples and edge cases
- TypeScript is used for all implementation as specified in the design document
- SVG sponsor logos use standard `<img>` elements; raster images use `next/image` for optimization
