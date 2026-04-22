# Puzzle Engine — Build Prompt

## Project Overview

Build a clean, production-ready Sudoku puzzle generator for puzzle-engine.com. This is Phase 1 (MVP) — Sudoku only, with clean architecture to support adding more puzzle types later.

## Target Audience

**Primary:** Casual users printing puzzles for personal use (teachers, parents, puzzle enthusiasts)
**Secondary:** KDP creators (via expandable "Advanced Options")

The default UI must be simple and uncluttered. KDP features are opt-in via a collapsible section.

## Domain & Branding

- **Domain:** puzzle-engine.com
- **Name:** Puzzle Engine
- **Logo:** Text-based for MVP (can add graphic later)

## File Structure

```
puzzle-engine/
├── index.html              # Landing page with navigation
├── sudoku/
│   └── index.html          # Sudoku generator (self-contained)
├── assets/
│   └── styles.css          # Shared styles (will grow with more puzzles)
└── README.md               # Development notes
```

## Landing Page (index.html)

**Purpose:** Hub page with clear navigation + SEO content

**Structure:**
- Header: "Puzzle Engine" logo + tagline "Free printable puzzles"
- Navigation cards: Sudoku (active), Word Search (coming soon), Mazes (coming soon)
- Value propositions: Free forever, Print-ready PDFs, Commercial license included, Perfect for KDP creators
- Footer: About, License, Contact links

**SEO:**
- Title: "Puzzle Engine — Free Printable Puzzle Generator"
- Meta description: "Generate free printable Sudoku, word search, and maze puzzles. Print-ready PDFs, commercial license included, perfect for KDP creators."
- H1: "Free Printable Puzzle Generator"

**Design:**
- Clean, modern aesthetic (purple gradient header similar to existing, but refined)
- Card-based layout for puzzle types
- Mobile-responsive

## Sudoku Page (sudoku/index.html)

### Simple Controls (always visible)

```
┌─────────────────────────────────────────┐
│  Size:       [ 9×9 (Standard) ▼ ]       │
│  Difficulty: [ Medium ▼ ]                │
│                                          │
│  [ Generate Puzzle ]                     │
└─────────────────────────────────────────┘
```

**Size options:**
- 4×4 (Kids) — 2×2 boxes
- 6×6 (Junior) — 2×3 boxes
- 9×9 (Standard) — 3×3 boxes

**Difficulty options:**
- Easy — More givens, simple solving techniques
- Medium — Balanced
- Hard — Fewer givens, intermediate techniques
- Expert — Minimal givens, advanced techniques

### Affiliate Banner (between controls and puzzle)

Display when puzzle is generated:

```
┌─────────────────────────────────────────────────┐
│  📚 Recommended Sudoku Books                   │
│  [Large Print Sudoku on Amazon]                │
│                                                 │
│  As an Amazon Associate, we earn from          │
│  qualifying purchases.                          │
└─────────────────────────────────────────────────┘
```

- Use placeholder Amazon affiliate links (user will replace with real IDs)
- Disclosure text required for Amazon compliance

### Puzzle Display

```
┌───────────────────────────────────┐
│         [ Sudoku Grid ]           │
│                                   │
│        [ Print Puzzle ]           │
└───────────────────────────────────┘
```

**Grid styling:**
- Thick borders for box boundaries (3×3 regions for 9×9)
- Clear number display, centered in cells
- Given numbers styled differently (bold, gray background)
- Responsive sizing (fits mobile screens)

### Advanced Options (collapsed by default)

Toggle: "▼ Advanced Options & KDP Tools"

When expanded:

```
┌─────────────────────────────────────────────────┐
│  Paper Size:   [ A4 ▼ ]  [ Letter ]            │
│  Per Page:      [ 1 ▼ ]  [ 2 ]  [ 4 ]          │
│  Solutions:     [ None ▼ ]  [ Separate page ]   │
│                                                 │
│  ──── KDP Creator Tools ────                    │
│  Bulk Generate: [ 50 ] puzzles                  │
│  Difficulties:  ☑ Easy  ☑ Medium  ☐ Hard       │
│                                                 │
│  [ Generate Bundle ]  [ Export PNG ]           │
│                                                 │
│  ✓ Commercial License: Free to use in your      │
│    KDP books. No attribution required.          │
└─────────────────────────────────────────────────┘
```

## Technical Requirements

### Sudoku Generation Algorithm

1. **Generate solved board:** Fill 9×9 grid using backtracking
2. **Remove numbers:** Based on difficulty level
3. **Validate uniqueness:** Ensure puzzle has exactly one solution
4. **Difficulty grading:**
   - Easy: 36-45 givens, solvable with naked/hidden singles
   - Medium: 30-35 givens, requires locked candidates
   - Hard: 25-29 givens, requires X-Wing or similar
   - Expert: 22-24 givens, requires chains/forcing chains

For 4×4 and 6×6, proportionally adjust givens and simplify techniques.

### Grid Rendering

- Use HTML table for grid
- CSS classes for box borders (varies by grid size)
- Responsive: Scale cell size based on viewport
- Print-optimized: Fixed sizes in `@media print`

### Print CSS (`@media print`)

CRITICAL: This is where the previous version had bugs.

**Hide when printing:**
- Header/navigation
- All controls (size, difficulty, generate button)
- Affiliate banner
- Advanced options section
- Footer

**Show when printing:**
- Puzzle grid only
- Optional: Title "Sudoku Puzzle" at top
- Optional: Solution on separate page (if selected)

**Page breaks:**
- Use `page-break-after: always` for multi-puzzle bundles
- Use `page-break-inside: avoid` to prevent puzzles splitting across pages

**Paper sizes:**
- A4: 210mm × 297mm
- Letter: 8.5" × 11"
- Grid should fill ~70% of printable area

### PNG Export

- Render grid to canvas
- Export as PNG with filename: `sudoku-[size]-[difficulty]-[timestamp].png`
- Clean output: No UI chrome, just the puzzle
- Download via `<a download>` link

### Mobile Responsiveness

- Minimum viewport: 320px
- Controls stack vertically on small screens
- Grid scales to fit screen (with minimum cell size for touch)
- Advanced options remain collapsed
- Touch-friendly button sizes (min 44px tap target)

### Accessibility

- Keyboard navigation for all controls
- Focus indicators on interactive elements
- ARIA labels where needed
- Sufficient color contrast

## Code Quality Requirements

**CRITICAL — Learn from previous bugs:**

1. **No duplicate CSS rules** — Define each rule once
2. **No broken selectors** — Every selector must match actual HTML
3. **Proper CSS organization:**
   ```css
   /* Base styles */
   /* Layout */
   /* Components */
   /* Print styles */
   ```
4. **No unused CSS** — If it's not used, don't include it
5. **No inline styles** — Use classes
6. **Comment your code** — Future-you will thank you

## Commercial License Text

Display in two places:
1. **Footer of every page:**
   ```
   Free Commercial Use License
   All puzzles generated on Puzzle Engine are free for personal and commercial use.
   Use them in your KDP books, activity books, worksheets, and more. No attribution required.
   ```

2. **KDP tools section:**
   ```
   ✓ Commercial License: Free to use in your KDP books. No attribution required.
   ```

## Deployment

- **Target:** Cloudflare Pages (will provide deployment instructions separately)
- **Files:** Static HTML, CSS, JS only — no server-side processing needed
- **Build:** No build step required — serve files as-is

## Success Criteria

- [ ] Landing page loads with navigation to Sudoku
- [ ] Sudoku page generates valid puzzles for all sizes (4×4, 6×6, 9×9)
- [ ] All difficulty levels work correctly
- [ ] Print preview shows ONLY the puzzle (no UI chrome)
- [ ] Multi-puzzle bundles generate correctly with page breaks
- [ ] PNG export downloads clean image
- [ ] Mobile-responsive on 320px viewport
- [ ] No console errors
- [ ] No duplicate CSS rules
- [ ] No broken CSS selectors

## Notes for the Developer

- This is a clean rebuild. The previous version had CSS bugs (duplicate rules, broken selectors) and print issues.
- Start fresh. Don't copy from the old version.
- Focus on code quality over features. A working, clean Sudoku generator is better than a broken multi-puzzle site.
- Test print CSS thoroughly. Open print preview and verify nothing unexpected appears.
- The affiliate banner is a placeholder. Real Amazon affiliate IDs will be added later.
- Comment your code. Explain the "why" not just the "what."

---

Build this clean, build it right. Phase 1 is Sudoku done well.