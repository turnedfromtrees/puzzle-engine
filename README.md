# Puzzle Engine

Free printable puzzle generator for puzzle-engine.com.

## Project Structure

```
puzzle-engine/
├── index.html              # Landing page with navigation
├── sudoku/
│   └── index.html          # Sudoku generator (self-contained)
├── assets/
│   └── styles.css          # Shared styles
└── README.md               # This file
```

## Features

### Landing Page
- Clean navigation to puzzle types
- Value propositions (Free, Print-ready, Commercial license, KDP tools)
- Mobile-responsive design
- SEO-optimized

### Sudoku Generator
- **Grid sizes:** 4×4 (Kids), 6×6 (Junior), 9×9 (Standard)
- **Difficulty levels:** Easy, Medium, Hard, Expert
- **Print-ready:** Clean print styles that hide UI chrome
- **PNG export:** Download puzzles as images
- **Bulk generation:** Create multiple puzzles for KDP books
- **Commercial license:** Free to use in commercial projects

## Technical Details

### Sudoku Generation Algorithm
1. Generate a complete valid solution using backtracking
2. Remove numbers based on difficulty level
3. Validate that puzzle has exactly one solution
4. Render as HTML table with proper styling

### Grid Sizes
| Size | Box Structure | Givens (Easy/Medium/Hard/Expert) |
|------|---------------|----------------------------------|
| 4×4  | 2×2 boxes     | 8/6/5/4                         |
| 6×6  | 2×3 boxes     | 15/12/10/8                      |
| 9×9  | 3×3 boxes     | 40/32/26/22                     |

### CSS Architecture
- CSS Custom Properties for theming
- BEM naming convention for classes
- Mobile-first responsive design
- Clean print styles (@media print)
- No duplicate rules in same scope

## Development

### Local Testing
Simply open `index.html` in a browser. No build step required.

### Print Testing
1. Generate a puzzle
2. Open browser print preview (Ctrl/Cmd+P)
3. Verify only the puzzle grid is visible
4. No UI chrome, controls, or affiliate banner should appear

### PNG Export
1. Generate a puzzle
2. Click "Export PNG"
3. Image downloads automatically

## Deployment

Target: Cloudflare Pages (static hosting)

```bash
# Files are served as-is, no build step needed
# Just deploy the root directory
```

## License

All puzzles generated are free for personal and commercial use.
No attribution required.

## Future Phases

- Phase 2: Word Search generator
- Phase 3: Maze generator
- Phase 4: Crossword generator