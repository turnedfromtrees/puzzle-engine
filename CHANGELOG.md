# Puzzle Engine Changelog

All notable changes to this project will be documented in this file.

## [v1.0-sudoku] - 2026-04-22

### Features
- **Sudoku Generator** - Complete, stable implementation
  - Grid sizes: 4x4, 6x6, 9x9
  - Difficulty levels: Easy, Medium, Hard, Expert
  - Per page options: 1, 2, 4 puzzles
  - Print-ready layout with centered logo and title
  - Bulk ZIP export (60 puzzles with solutions)
  
### Export Features
- Puzzles grouped by difficulty (easy-001, medium-001, etc.)
- Solutions grouped by difficulty (12 per page)
- Consistent naming: "Easy 1" format for puzzles and solutions
- PNG export for KDP workflow

### UI/UX
- Clean, responsive design
- KDP Tools panel (bulk generation controls)
- Progress bar for bulk export
- Print styles matching screen display

### SEO & Monetization
- Meta keywords targeting teachers, parents, care homes, KDP publishers
- "Perfect For" section with 6 use cases
- Affiliate links to Amazon sudoku books (ntropydelay-21)
- Commercial license notice

### Technical
- Pure frontend (HTML/CSS/JS)
- No external dependencies except JSZip CDN
- Responsive grid layouts
- Uniform border styling on print

---

## Future Versions (Planned)

### [v1.1] - Word Search
- Grid sizes: 10x10, 15x15, 20x20
- Word direction options
- Themed word lists

### [v1.2] - Mazes
- Grid sizes: 15x15, 25x25, 40x40
- Difficulty levels
- Path solution overlay

### [v1.3] - Number Search
- Grid sizes: 15x15, 20x20, 25x25
- Number range options

See PUZZLE_ROADMAP.md for full development plan.