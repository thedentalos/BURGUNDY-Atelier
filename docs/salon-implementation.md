# Salon implementation intent

The approved Salon language now uses the subsequently supplied full-bleed reference for its landing structure: a viewport-height campaign photograph, transparent overlaid navigation, centered wordmark and a collection headline. Cormorant and Jost remain the voices. The existing portrait campaign photograph is cropped deliberately on desktop and shown tall on mobile. Product photography below retains portrait proportions. Spacing is fluid and bounded on large monitors.

The collection uses garment-category filtering and numbered entries. Product pages pair large photographs with factual garment details and ruled prices. The atelier explains silhouettes and ordering without invented provenance. Native modal navigation provides keyboard containment, Escape and focus restoration. No decorative icon library, checkout, fabricated history or generic feature cards.

Existing HTML studies remain intact. Validate build, TypeScript, routes, responsive overflow, images, filtering, keyboard navigation and product links.

## Verification

Production builds statically generate the homepage, collection, atelier and five product pages. The browser audit covers these eight routes at nine widths (320–1920px), one primary heading and skip target per route, target sizing, collection filtering, modal navigation, Escape, focus return, route changes and resizing an open menu. Desktop and mobile screenshots are saved under tests/salon.

The campaign overlay was strengthened after measuring contrast against the actual photograph. At 1440px the darkest-case background contrast across the tested header and hero text rectangles was at least 5.56:1. This is a focused design verification, not a full accessibility certification. Product photography uses Next Image; the source photographs still limit large-screen sharpness.

An existing development process held .next/trace, so production verification uses NEXT_BUILD_DIR=.next-salon. The default remains .next. A local production preview can be run with that environment variable and npm run start -- --port 4180 after building.

Final result: all 72 production route/viewport checks passed with no overflow, undersized targets or JavaScript errors. Filtering, Escape, focus restoration, navigation and menu resizing passed. The visible mobile hero text also measured at least 5.56:1 at 375px. The existing development server at http://localhost:3000 was verified to serve the updated campaign homepage.
