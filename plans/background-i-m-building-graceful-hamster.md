# Add "Download Résumé" across Hero, Floating Nav, and Footer

## Context
The user is job-hunting with this portfolio and has added their CV at `src/imports/Kurt_Michael_Mirafelix_CV.pdf`. Hiring managers look for a résumé in predictable spots and bounce if they can't find it fast. We want a downloadable résumé reachable from the three highest-value locations: the persistent floating nav (always reachable), the hero (fast skimmers), and the footer (convinced finishers). The link must use a real Vite asset URL and a clean download filename, and must match the existing monochrome/brutalist aesthetic.

## Approach

### 1. Share the résumé asset import
The PDF resolves to a hashed URL via a default Vite asset import. To avoid importing it in three files, add a tiny shared module `src/app/lib/resume.ts`:
```ts
import resumeUrl from '../../imports/Kurt_Michael_Mirafelix_CV.pdf';
export { resumeUrl };
export const RESUME_FILENAME = 'Kurt-Mirafelix-Frontend-Engineer.pdf';
```
(Confirm Vite resolves the `.pdf` import to a URL string; this is the default for unknown asset types. If TS complains about the import, the project already imports `.jpg` the same way in `Hero.tsx`, so the same module declaration coverage applies.)

### 2. Extend `MagneticButton` to support download links
File: `src/app/components/MagneticButton.tsx`
- It currently only forwards `href`/`onClick`. Add optional pass-through props: `download?: boolean | string`, `target?: string`, `rel?: string`, and `ariaLabel?: string`.
- Forward them to the rendered `motion.a`. Keep behavior unchanged when they're absent so existing usages (View Projects, Contact, Get in Touch) are unaffected.

### 3. Hero CTA (`src/app/components/Hero.tsx`)
- Add a third CTA beside "View Projects" and "Contact": a "Download Résumé" `MagneticButton` with `href={resumeUrl}`, `download={RESUME_FILENAME}`, `target="_blank"`, `rel="noopener noreferrer"`, and an `aria-label`.
- Style it as a secondary/outline variant consistent with the existing Contact button (sharp edges, `border border-gray-900`, backdrop blur). Include a small lucide `Download` or `FileText` icon for scannability.
- Keep the row responsive (`flex-col sm:flex-row`) — three buttons should wrap gracefully on mobile.

### 4. Floating nav pill (`src/app/components/FloatingNav.tsx`)
- The nav items are in-page anchor jumps; the résumé is a download, so it must be visually distinct (not mistaken for navigation) and excluded from the active-section tracking logic.
- After the `<ul>` of nav items, add a separated "Résumé" element: a thin divider (e.g. `w-px h-5 bg-gray-200`) followed by an `<a>` styled as a filled pill (`bg-gray-900 text-white`) with a `Download`/`FileText` icon. Use `href={resumeUrl}`, `download={RESUME_FILENAME}`, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label="Download résumé"`.
- Do NOT add it to the `navItems` array (that array drives `activeSection` detection via `document.querySelector(item.href)` — a PDF href would break it). Render it as a standalone sibling.
- On mobile the nav already hides labels; show icon-only there and label on `sm:`+.

### 5. Footer (`src/app/App.tsx`)
- The footer's social row currently has GitHub / LinkedIn / Email links. Add a "Résumé" link in the same row (same focus-ring + hover styling) with `download`, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label="Download résumé"`.
- Optionally also surface it near the "Get in Touch" CTA as a secondary action, but the social-row link is the primary footer placement.

## Critical files
- `src/app/lib/resume.ts` — new shared asset/url + filename export
- `src/app/components/MagneticButton.tsx` — add `download`/`target`/`rel`/`ariaLabel` pass-through
- `src/app/components/Hero.tsx` — third CTA button
- `src/app/components/FloatingNav.tsx` — standalone résumé pill (not in `navItems`)
- `src/app/App.tsx` — footer résumé link
- Reuses existing import pattern from `Hero.tsx` (`import portrait from '../../imports/...'`) and `lucide-react` for the icon.

## Verification
- Load the app via the preview surface (not localhost).
- Hero: confirm a styled "Download Résumé" button appears beside the other CTAs and wraps cleanly on a narrow viewport.
- Floating nav: scroll past 300px; confirm the résumé pill appears, looks distinct from the section links, and that section active-state highlighting still works correctly (résumé pill never becomes "active").
- Footer: confirm the Résumé link sits with GitHub/LinkedIn/Email and is keyboard-focusable.
- Click each of the three: the browser should open/download `Kurt-Mirafelix-Frontend-Engineer.pdf` with the correct contents.
- Confirm no Vite import-resolution error for the `.pdf` import and no console errors.
- Toggle "Reduce motion" and confirm the buttons still render and function (MagneticButton motion degrades gracefully).
