# Three directions for Burgundy Atelier

These are local HTML design studies, using the existing brand palette and photography. Open index.html to compare them. No build step is required. Keep the templates folder beside public, as photographs are referenced relatively. Fonts load from Google Fonts with Georgia and Arial fallbacks.

## 01 — The Residence
A country-house editorial: an oversized two-line title sits beside a tall, uncropped campaign photograph; a small second photograph creates an intimate, printed-lookbook rhythm. Cormorant and Jost, cream and blush, fine burgundy rules. On phones, the headline leads into the full-width campaign picture. Avoid a conventional equal split with a boxed call to action.

## 02 — The Salon
A formal maison storefront: a blush masthead, oversized house name and a three-part photographic composition. The central ivory look remains the focus, with burgundy and floral pieces as side notes. Mobile collapses to the central look before a two-column collection. No fabricated heritage dates, crests, or provenance claims.

## 03 — The Folio
A fashion journal: numbered chapters, asymmetric photographs and a large ruled title. A deliberate visual index links to each look. The mobile version retains chapter numbers and generous gaps, with photographs reaching the screen edge. Avoid turning the journal into a uniform catalog grid.

## Shared behavior
Navigation uses real section links; mobile navigation is a native details disclosure. Product buttons open an accessible native dialog with known prices, visible garment details and the existing Instagram inquiry destination. No checkout, invented sizing, stock claims, or submitted forms. Escape and close controls dismiss the dialog. The concept selector links between actual HTML files.

## Implementation notes
The Next.js application and original HTML templates are untouched. Shared CSS exposes palette and typography tokens. Each page contains its actual content in HTML; JavaScript only enhances product viewing. Original images remain unchanged. Some source images are small Instagram crops and should be replaced with originals for production. These layouts deliberately depart from the current split-hero pattern to explore the creative scope requested.

## Validation

36 browser layout checks passed across all four pages at 320, 375, 430, 600, 768, 900, 1024, 1440 and 1920 pixels. No horizontal overflow, broken eager images, missing section targets or JavaScript errors were detected. Product dialogs, Escape dismissal and mobile navigation were exercised. Full-page desktop/mobile captures and audit.json are in previews/. This is prototype verification, not a production Lighthouse or comprehensive WCAG certification.
