# Puzzle Engine - Puzzle Type Roadmap

Analysis of 20 popular puzzle types with build complexity and required options.

---

## Currently Implemented

### 1. Sudoku ✅
**Complexity:** COMPLETE
**Grid Sizes:** 4x4, 6x6, 9x9
**Difficulty Levels:** Easy, Medium, Hard, Expert
**Options:**
- Per page (1, 2, 4)
- Solutions (none, separate page)
- Bulk export (ZIP with PNGs grouped by difficulty)

---

## High Priority - Low Complexity

### 2. Word Search
**Complexity:** LOW
**Build Time:** 2-3 days
**Core Algorithm:** Random word placement in grid, fill remaining with random letters
**Required Options:**
- Grid sizes: Small (10x10), Medium (15x15), Large (20x20)
- Word lists: Pre-defined themes or custom input
- Difficulty: Word direction (horizontal only, horizontal+vertical, all 8 directions)
- Word count: 5-20 words per puzzle
- Solutions: Highlight words in solution

### 3. Mazes
**Complexity:** LOW
**Build Time:** 1-2 days
**Core Algorithm:** Recursive backtracking or randomized Prim's algorithm
**Required Options:**
- Grid sizes: Small (15x15), Medium (25x25), Large (40x40)
- Difficulty: Path width, dead-end density
- Styles: Square, circular, hexagonal
- Solutions: Show path overlay

### 4. Number Search (Number Find)
**Complexity:** LOW
**Build Time:** 1-2 days
**Core Algorithm:** Same as Word Search, replace letters with numbers
**Required Options:**
- Grid sizes: 15x15, 20x20, 25x25
- Number ranges: 1-50, 1-100, 1-500
- Difficulty: Direction count
- Solutions: Highlight found numbers

### 5. Dot-to-Dot
**Complexity:** LOW
**Build Time:** 2-3 days
**Core Algorithm:** Pre-defined image paths converted to numbered points
**Required Options:**
- Image templates: Simple shapes, animals, objects
- Point density: Sparse (kids), Dense (adults)
- Number range: 1-50, 1-100, 1-200
- Solutions: Show completed image outline

### 6. Word Scramble
**Complexity:** LOW
**Build Time:** 1 day
**Core Algorithm:** Scramble letters of words from dictionary
**Required Options:**
- Word count: 5, 10, 15, 20 per page
- Word length: 3-5 letters, 5-8 letters, 8+ letters
- Categories: Animals, foods, places, etc.
- Solutions: Unscrambled word list

---

## Medium Priority - Medium Complexity

### 7. Crosswords
**Complexity:** MEDIUM
**Build Time:** 3-5 days
**Core Algorithm:** Word database + grid fitting + clue generation
**Required Options:**
- Grid sizes: Mini (5x5), Small (10x10), Standard (15x15)
- Difficulty: Kids, Easy, Medium, Hard
- Themes: General knowledge, themed topics
- Solutions: Filled grid

### 8. Wordoku (Letter Sudoku)
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Modified Sudoku with letters, hidden word constraint
**Required Options:**
- Grid sizes: Same as Sudoku (4x4, 6x6, 9x9)
- Word lists: Pre-defined 4/6/9 letter words
- Difficulty: Based on Sudoku logic
- Solutions: Same as Sudoku

### 9. Kakuro (Cross Sums)
**Complexity:** MEDIUM
**Build Time:** 3-4 days
**Core Algorithm:** Constraint-based grid generation with sum clues
**Required Options:**
- Grid sizes: Small (6x6), Medium (8x8), Large (12x12)
- Difficulty: Clue complexity
- Number range: 1-9 only
- Solutions: Filled grid with values

### 10. Fill-Ins (Word Fill-In)
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Place words from list into grid, check intersections
**Required Options:**
- Grid sizes: 15x15, 21x21
- Word lists: Themed or random
- Difficulty: Word length variety
- Solutions: Filled grid

### 11. Cryptograms
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Letter substitution cipher with quote database
**Required Options:**
- Quote categories: Famous quotes, sayings, facts
- Difficulty: Hint letters provided
- Hint system: Reveal 1-3 letters
- Solutions: Decoded quote with key

### 12. Numbrix
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Path-finding puzzle, numbers 1-N in sequence
**Required Options:**
- Grid sizes: 5x5, 7x7, 9x9, 11x11
- Difficulty: Starting numbers count
- Time challenges: Optional timer
- Solutions: Complete path highlighted

---

## Lower Priority - Higher Complexity

### 13. Logic Puzzles (Grid-Based)
**Complexity:** HIGH
**Build Time:** 5-7 days
**Core Algorithm:** Constraint generation + story creation + grid layout
**Required Options:**
- Categories: 3, 4, or 5 variables
- Clue difficulty: Direct, indirect, negation
- Story themes: Various scenarios
- Solutions: Logic grid with deductions

### 14. Brain Teasers
**Complexity:** HIGH
**Build Time:** 4-6 days
**Core Algorithm:** Curated database + formatting
**Required Options:**
- Categories: Logic, lateral thinking, math, wordplay
- Difficulty: Easy, Medium, Hard
- Pages: 10, 25, 50, 100 per book
- Solutions: Answer with explanation

### 15. Spot the Difference
**Complexity:** HIGH
**Build Time:** 5-7 days
**Core Algorithm:** Image manipulation + difference placement
**Required Options:**
- Image themes: Scenes, objects, patterns
- Difference count: 5, 10, 15, 20
- Difficulty: Difference size and subtlety
- Solutions: Circle differences

### 16. Code Words
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Letter substitution cipher, no word boundaries
**Required Options:**
- Word categories: Various themes
- Alphabet: Standard A-Z
- Hint letters: 0-5 starter letters
- Solutions: Decoded text with key

### 17. Trivia Crosswords
**Complexity:** MEDIUM-HIGH
**Build Time:** 3-5 days
**Core Algorithm:** Question database + crossword grid generation
**Required Options:**
- Categories: History, science, sports, entertainment
- Difficulty: Easy, Medium, Hard
- Grid sizes: Mini to standard
- Solutions: Filled grid

### 18. Math Puzzles
**Complexity:** MEDIUM
**Build Time:** 2-3 days
**Core Algorithm:** Arithmetic generation + puzzle formatting
**Required Options:**
- Types: Magic squares, number chains, arithmetic
- Difficulty: Grade levels or complexity
- Operations: +, -, ×, ÷
- Solutions: Solved equations

### 19. Hidden Pictures
**Complexity:** HIGH
**Build Time:** 5-7 days
**Core Algorithm:** Image generation + object placement
**Required Options:**
- Scene types: Indoor, outdoor, fantasy
- Object count: 5, 10, 15, 20
- Object types: Themed lists
- Solutions: Highlighted objects

### 20. Acrostics
**Complexity:** MEDIUM-HIGH
**Build Time:** 3-4 days
**Core Algorithm:** Quote + word selection + letter mapping
**Required Options:**
- Quote sources: Famous quotes, literature
- Grid layout: Standard format
- Word count: 15-25 clues per puzzle
- Solutions: Quote revealed with word answers

---

## Build Priority Recommendations

### Phase 2 (Next 3 months)
1. **Word Search** - High demand, low complexity
2. **Mazes** - Simple algorithm, popular for kids/seniors
3. **Number Search** - Leverage Word Search code
4. **Word Scramble** - Simple, quick win

### Phase 3 (3-6 months)
5. **Crosswords** - Core puzzle type, medium complexity
6. **Wordoku** - Leverage Sudoku code
7. **Fill-Ins** - Popular in puzzle books
8. **Cryptograms** - Good for adult puzzle books

### Phase 4 (6-12 months)
9. **Kakuro** - Number puzzle variety
10. **Numbrix** - Path puzzle alternative
11. **Code Words** - Cipher-based puzzle
12. **Dot-to-Dot** - Kids and adult versions

### Future Consideration
13-20 require more complex algorithms or image processing. Evaluate demand before building.

---

## Technical Notes

### Shared Infrastructure
- **Puzzle base class** - Grid, solution, title, difficulty
- **Export system** - ZIP download, PNG generation, PDF print
- **Theme engine** - Word lists, image assets, quote databases

### Data Requirements
- **Word databases** - Multiple languages, themed lists
- **Quote databases** - Famous quotes, categorized
- **Image assets** - For mazes, dot-to-dot, hidden pictures
- **Clue databases** - For crosswords, trivia

### Third-Party Libraries
- **Word generation** - Consider wordnet or curated dictionaries
- **Image processing** - Canvas API for spot-the-difference
- **Path algorithms** - A* or similar for maze generation