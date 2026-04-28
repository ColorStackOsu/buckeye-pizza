# Requirements Document

## Introduction

This document specifies the requirements for migrating the existing ColorStack at Ohio State static website (Bootstrap + vanilla HTML/CSS/JS) into a Next.js application styled with Tailwind CSS. The migration preserves all existing functionality and content while modernizing the tech stack. After migration, the site receives a visual refresh that retains the original color palette (primary red `#b9283d`, background white `#f2f2f2`, dark `#202020`) and stylistic essence (Onest font, gradient accents, reveal animations) while adopting a more contemporary design language.

## Glossary

- **App**: The Next.js application that replaces the existing static website
- **Layout**: A Next.js shared UI wrapper that renders the Navigation and Footer on every page
- **Navigation**: The responsive top navigation bar with logo, page links, and the "About Us" dropdown
- **Footer**: The shared bottom section containing logo, page links, social media icons, and copyright
- **Home_Page**: The landing page containing the Hero, Sponsor Scroller, Mission, Stats, Testimonials, and Get Involved sections
- **Events_Page**: The page displaying the embedded Styled Calendar and dynamically rendered Recent Event cards
- **Sponsors_Page**: The page listing sponsors by tier (Platinum, Gold, Silver, Bronze) and the sponsor contact form
- **Exec_Board_Page**: The page displaying executive board member cards filterable by academic year
- **About_Page**: The page containing the About hero, About Us content, and Contact Us section
- **Event_Card**: A clickable card component that shows an event thumbnail, name, and date
- **Gallery_Modal**: A modal overlay that displays a grid of photos fetched from Google Drive for a selected event
- **Member_Card**: A card component displaying a board member's photo, name, position, and optional company logo
- **Member_Modal**: A modal overlay showing a board member's full bio, photo, LinkedIn link, and Calendly booking link
- **Sponsor_Entry**: A component displaying a sponsor's logo, name, and description blurb
- **Sponsor_Form**: The "Become a Sponsor" contact form that submits to the Web3Forms API
- **Reveal_Animation**: A scroll-triggered animation that fades and translates elements into view
- **Sponsor_Scroller**: The infinite horizontal scrolling banner of sponsor logos on the Home page
- **Stats_Section**: The section on the Home page displaying impact statistics in ribbon and mobile layouts
- **Testimonials_Section**: The section displaying student testimonial cards in a carousel (desktop) or stacked layout (mobile)
- **Board_Data**: The JavaScript data structure containing executive board member information organized by academic year
- **Events_Data**: The JavaScript data structure containing event information including Google Drive folder IDs
- **Drive_Gallery_Service**: The module that fetches image listings from Google Drive folders via the Drive API
- **Tailwind_Config**: The Tailwind CSS configuration file defining the custom theme (colors, fonts, animations)

## Requirements

### Requirement 1: Next.js Project Initialization

**User Story:** As a developer, I want the project scaffolded as a Next.js application with the App Router, so that the site benefits from file-based routing, server components, and modern React patterns.

#### Acceptance Criteria

1. THE App SHALL be initialized as a Next.js 14+ project using the App Router (`app/` directory)
2. THE App SHALL use TypeScript for type safety across all source files
3. THE App SHALL configure Tailwind CSS v3+ as the sole styling framework, replacing Bootstrap
4. THE Tailwind_Config SHALL define custom theme values matching the existing color palette: primary red (`#b9283d`), hover red (`#d30f36`), background white (`#f2f2f2`), light gray (`#f8f8f8`), and dark (`#202020`)
5. THE Tailwind_Config SHALL configure the Onest font family as the default sans-serif font
6. THE App SHALL load the Onest Google Font using `next/font/google` for optimized font delivery
7. THE App SHALL store the Google Drive API key in an environment variable rather than in a client-side config file

### Requirement 2: Shared Layout and Navigation

**User Story:** As a site visitor, I want consistent navigation and footer across all pages, so that I can move between sections without confusion.

#### Acceptance Criteria

1. THE Layout SHALL render the Navigation and Footer on every page of the App
2. THE Navigation SHALL display the ColorStack horizontal logo linking to the Home_Page
3. THE Navigation SHALL include links to Events_Page, Sponsors_Page, Exec_Board_Page, and an "About Us" dropdown
4. THE Navigation SHALL include an "About Us" dropdown containing links to About_Page (About section), About_Page (Contact Us section), and the external Test Bank URL
5. WHEN the viewport width is below the large breakpoint, THE Navigation SHALL collapse into a mobile hamburger menu
6. THE Footer SHALL display the ColorStack horizontal logo, page navigation links, social media icon buttons (Email, Instagram, LinkedIn, Slack), and a dynamic copyright year
7. WHEN the viewport width is below the medium breakpoint, THE Footer SHALL display a "Home" link that is hidden on larger viewports
8. THE Navigation SHALL use Next.js `Link` components for internal page transitions instead of full-page reloads

### Requirement 3: Home Page Migration

**User Story:** As a site visitor, I want the home page to present the organization's mission, impact stats, testimonials, and calls to action, so that I understand what ColorStack at OSU offers.

#### Acceptance Criteria

1. THE Home_Page SHALL render a Hero section containing a welcome heading with a typewriter animation, a "Become a Member" call-to-action button linking to the Airtable signup form, and the Sponsor_Scroller
2. WHEN the viewport is large, THE Home_Page SHALL display a hero image alongside the hero text content
3. THE Sponsor_Scroller SHALL continuously scroll sponsor logos horizontally in an infinite loop
4. WHEN the user hovers over the Sponsor_Scroller on large viewports, THE Sponsor_Scroller SHALL pause the scrolling animation
5. THE Home_Page SHALL render a Mission section with a dark background containing the mission statement text, a "Learn More" link to the About_Page, and three mission cards (Workshops, Professional Development, Community) each with an image and description
6. THE Stats_Section SHALL display six impact statistics (54% First-Gen Students, 250+ Registered Members, 49% Low-Income Students, 30% Identify As Women, 25+ 2025 Offers Received, 10+ Industry Partners)
7. WHEN the viewport is medium or larger, THE Stats_Section SHALL display statistics in two styled ribbon banners (red and dark)
8. WHEN the viewport is small, THE Stats_Section SHALL display a subset of statistics in a vertically stacked layout
9. THE Testimonials_Section SHALL display student testimonial cards containing a quote title, testimonial text, student photo, name, and class year
10. WHEN the viewport is large, THE Testimonials_Section SHALL display testimonials in a paginated carousel with navigation controls
11. WHEN the viewport is medium, THE Testimonials_Section SHALL display testimonials in a horizontal row
12. WHEN the viewport is small, THE Testimonials_Section SHALL display testimonials in a vertically stacked layout
13. THE Home_Page SHALL render a "Get Involved" section with cards linking to Sponsors_Page, Slack community, and About_Page contact section

### Requirement 4: Events Page Migration

**User Story:** As a site visitor, I want to view the event calendar and browse recent event photo galleries, so that I can stay informed about chapter activities.

#### Acceptance Criteria

1. THE Events_Page SHALL embed the Styled Calendar iframe displaying the organization's event schedule
2. THE Events_Page SHALL render a "Recent Events" section with Event_Card components generated from Events_Data
3. WHEN an Event_Card has a Google Drive folder ID, THE Event_Card SHALL display the first photo from that Drive folder as its thumbnail
4. IF an Event_Card has no Google Drive folder ID and no static image, THEN THE Event_Card SHALL display a placeholder event image
5. WHEN a user clicks an Event_Card, THE Gallery_Modal SHALL open and display a grid of photo thumbnails fetched from the event's Google Drive folder
6. WHEN a user clicks a thumbnail in the Gallery_Modal, THE Gallery_Modal SHALL display the full-size version of that photo
7. IF the Drive_Gallery_Service fails to fetch photos, THEN THE Gallery_Modal SHALL display an error message indicating photos could not be loaded
8. IF the Drive_Gallery_Service returns no photos for a folder, THEN THE Gallery_Modal SHALL display a message indicating no photos were found

### Requirement 5: Executive Board Page Migration

**User Story:** As a site visitor, I want to browse executive board members by academic year and view their details, so that I can learn about the chapter's leadership.

#### Acceptance Criteria

1. THE Exec_Board_Page SHALL display year-selection buttons for each academic year present in Board_Data (2023-2024, 2024-2025, 2025-2026)
2. THE Exec_Board_Page SHALL default to displaying the most recent academic year's board members on initial load
3. WHEN a user clicks a year-selection button, THE Exec_Board_Page SHALL render Member_Card components for all board members of the selected year
4. THE Member_Card SHALL display the member's photo, name, position title, and company logo (when available)
5. WHEN a board member has a bio, THE Member_Card image SHALL be clickable and open the Member_Modal
6. WHEN a board member does not have a bio, THE Member_Card image SHALL not be clickable
7. THE Member_Modal SHALL display the member's photo, name, position, bio text, LinkedIn link, and Calendly booking link (when available)
8. IF a board member does not have a Calendly link, THEN THE Member_Modal SHALL disable the "Book a Time" button
9. IF a board member does not have a LinkedIn link, THEN THE Member_Modal SHALL hide the LinkedIn button
10. WHEN the last row of the member grid contains exactly two members on large viewports, THE Exec_Board_Page SHALL center those members by adding balancing spacers

### Requirement 6: Sponsors Page Migration

**User Story:** As a site visitor or potential sponsor, I want to see current sponsors organized by tier and submit a sponsorship inquiry, so that I can understand partnership opportunities.

#### Acceptance Criteria

1. THE Sponsors_Page SHALL display a header section with the title "Our Partners in Progress", a description, a "Become A Sponsor" button linking to the Sponsor_Form, and a link to the Sponsorship Packet PDF
2. THE Sponsors_Page SHALL organize Sponsor_Entry components into four tiers: Platinum, Gold, Silver, and Bronze
3. THE Sponsor_Entry SHALL display the sponsor's logo and a descriptive blurb
4. THE Sponsor_Form SHALL collect Company Name (required), Contact Name (required), Email Address (required), and an optional Message field
5. WHEN a user submits the Sponsor_Form with all required fields completed, THE Sponsor_Form SHALL send the data to the Web3Forms API endpoint
6. IF a user attempts to submit the Sponsor_Form with missing required fields, THEN THE Sponsor_Form SHALL display validation errors and prevent submission

### Requirement 7: About Page Migration

**User Story:** As a site visitor, I want to learn about the organization's history and contact the chapter, so that I can understand the mission and reach out.

#### Acceptance Criteria

1. THE About_Page SHALL render a hero section with the ColorStack logo, "ColorStack" heading, and "AT OSU" subheading with bounce animations
2. THE About_Page SHALL render an "About Us" section with the organization's mission description, social media links (Slack, Instagram, LinkedIn), a list of offerings (Technical Workshops, Professional Development, Career Opportunities, Community Building), and a link to the national ColorStack website
3. THE About_Page SHALL render a "Contact Us" section with a description and a mailto link to colorstackosu@gmail.com
4. WHEN a user navigates to the About_Page with a hash fragment (#about-us or #contact-us), THE About_Page SHALL scroll to the corresponding section

### Requirement 8: Scroll-Triggered Reveal Animations

**User Story:** As a site visitor, I want page elements to animate into view as I scroll, so that the browsing experience feels dynamic and engaging.

#### Acceptance Criteria

1. THE App SHALL implement Reveal_Animation variants: fade-up, scale-forward, slide-left, and slide-right
2. WHEN an element with a Reveal_Animation enters the viewport, THE App SHALL transition the element from its hidden state (transparent, offset) to its visible state (opaque, in-position)
3. THE App SHALL support configurable animation delay classes (100ms through 500ms in 100ms increments) for staggered reveal effects
4. THE App SHALL trigger Reveal_Animation checks on scroll and resize events
5. THE App SHALL perform an initial Reveal_Animation check on page load to reveal elements already in the viewport

### Requirement 9: Google Drive Gallery Integration

**User Story:** As a site visitor, I want event photo galleries to load from Google Drive, so that the organization can manage photos without redeploying the site.

#### Acceptance Criteria

1. THE Drive_Gallery_Service SHALL fetch image file listings from a Google Drive folder using the Google Drive API v3
2. THE Drive_Gallery_Service SHALL generate thumbnail URLs and full-size image URLs from Drive file IDs
3. THE Drive_Gallery_Service SHALL cache fetched folder results to avoid redundant API calls for the same folder
4. IF the Google Drive API key is missing, THEN THE Drive_Gallery_Service SHALL throw a descriptive error
5. IF the Google Drive API returns a non-OK response, THEN THE Drive_Gallery_Service SHALL throw an error containing the HTTP status code

### Requirement 10: Static Asset Migration

**User Story:** As a developer, I want all images and static files properly organized in the Next.js project, so that they are served efficiently with optimized loading.

#### Acceptance Criteria

1. THE App SHALL migrate all image assets (hero photos, body photos, eboard member photos, sponsor logos, testimonial photos, placeholder images, and logos) to the Next.js `public/images/` directory preserving the existing subdirectory structure
2. THE App SHALL migrate the Sponsorship Packet PDF to the Next.js `public/assets/` directory
3. THE App SHALL use the Next.js `Image` component for raster images (JPG, PNG, JPEG) to enable automatic optimization, lazy loading, and responsive sizing
4. THE App SHALL render SVG sponsor logos using standard `img` elements or inline SVG rather than the Next.js `Image` component

### Requirement 11: Data Layer Migration

**User Story:** As a developer, I want board member and event data structured as typed TypeScript modules, so that the data is maintainable and type-safe.

#### Acceptance Criteria

1. THE App SHALL define a TypeScript interface for board member data including name, position, image path, bio (nullable), LinkedIn URL, Calendly URL (optional), and company logo path (optional)
2. THE App SHALL define a TypeScript interface for event data including id, name, date, alt text, gallery title, Drive folder ID, and optional static image path
3. THE App SHALL export Board_Data as a typed constant organized by academic year
4. THE App SHALL export Events_Data as a typed array of event objects
5. THE App SHALL store the Google Drive API key in a `.env.local` environment variable accessible via `process.env` on the client side using the `NEXT_PUBLIC_` prefix

### Requirement 12: Modern Visual Refresh

**User Story:** As a site visitor, I want the website to have a modern, polished appearance while retaining the familiar ColorStack brand identity, so that the site feels professional and up-to-date.

#### Acceptance Criteria

1. THE App SHALL retain the existing color palette: primary red (`#b9283d`), hover red (`#d30f36`), background white (`#f2f2f2`), light gray (`#f8f8f8`), and dark (`#202020`)
2. THE App SHALL retain the Onest font family as the primary typeface
3. THE App SHALL replace Bootstrap grid classes with Tailwind CSS utility classes for all layout and spacing
4. THE App SHALL replace Bootstrap component classes (navbar, modal, carousel, dropdown, buttons, forms) with Tailwind-styled equivalents
5. THE App SHALL preserve the animated gradient background effects on the Hero, About hero, Sponsor header, Testimonials, and Calendar sections
6. THE App SHALL preserve the infinite sponsor logo scrolling animation on the Home_Page
7. THE App SHALL preserve the board member card hover effects including the gradient shine overlay and lift transform on large viewports
8. THE App SHALL implement responsive breakpoints matching the existing behavior: small (below 768px), medium (768px–991px), and large (992px and above)
9. THE App SHALL preserve the GSAP-powered scroll-triggered scaling animation on the small-viewport statistics section

### Requirement 13: SEO and Metadata

**User Story:** As a site administrator, I want proper metadata on every page, so that the site appears correctly in search results and social media previews.

#### Acceptance Criteria

1. THE App SHALL define Open Graph metadata (title, description, image, URL) for each page using Next.js Metadata API
2. THE App SHALL set the page title to "ColorStackOSU" across all pages
3. THE App SHALL configure the favicon using the ColorStack logo image
4. WHEN a page is shared on social media, THE App SHALL provide the ColorStack logo as the Open Graph preview image
