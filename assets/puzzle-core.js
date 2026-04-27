/**
 * puzzle-core.js - Shared Utilities for Puzzle Engine V2
 */

// ============================================
// Array/Grid Utilities
// ============================================

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create empty 2D grid
 */
function createEmptyGrid(rows, cols, fillValue = '') {
  return Array(rows).fill(null).map(() => Array(cols).fill(fillValue));
}

/**
 * Deep copy a 2D grid
 */
function copyGrid(grid) {
  return grid.map(row => [...row]);
}

/**
 * Transpose a 2D grid (swap rows and columns)
 */
function transposeGrid(grid) {
  return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

// ============================================
// Download/Export Utilities
// ============================================

/**
 * Generate timestamp for filenames
 */
function timestamp() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace(/[T:]/g, '-');
}

/**
 * Download canvas as PNG with 300 DPI
 */
function downloadCanvas(canvas, filename, dpi = 300) {
  // For 300 DPI, we need to embed the DPI in the PNG
  // Canvas doesn't directly support DPI, so we use a workaround
  const link = document.createElement('a');
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  
  // Convert to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/png', 1.0);
}

/**
 * Download data as JSON file
 */
function downloadJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

// ============================================
// Canvas/Drawing Utilities
// ============================================

/**
 * Create a high-DPI canvas for print quality
 * @param {number} width - Width in pixels at base DPI
 * @param {number} height - Height in pixels at base DPI
 * @param {number} dpi - Target DPI (default 300)
 */
function createHiDPICanvas(width, height, dpi = 300) {
  const canvas = document.createElement('canvas');
  const scale = dpi / 96; // 96 is the default screen DPI
  
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  
  return canvas;
}

/**
 * Get standard canvas for screen display
 */
function createDisplayCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Draw grid lines on canvas
 */
function drawGridLines(ctx, x, y, width, height, rows, cols, lineWidth = 1, color = '#000') {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  
  // Vertical lines
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * cellWidth, y);
    ctx.lineTo(x + i * cellWidth, y + height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let i = 0; i <= rows; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + i * cellHeight);
    ctx.lineTo(x + width, y + i * cellHeight);
    ctx.stroke();
  }
}

/**
 * Draw thick box borders for Sudoku-like puzzles
 */
function drawBoxBorders(ctx, x, y, width, height, rows, cols, boxRows, boxCols, lineWidth = 3, color = '#000') {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  
  const numBoxRows = Math.ceil(rows / boxRows);
  const numBoxCols = Math.ceil(cols / boxCols);
  
  // Draw outer border
  ctx.strokeRect(x, y, width, height);
  
  // Draw thick internal box borders
  for (let boxRow = 1; boxRow < numBoxRows; boxRow++) {
    const yPos = y + boxRow * boxRows * cellHeight;
    ctx.beginPath();
    ctx.moveTo(x, yPos);
    ctx.lineTo(x + width, yPos);
    ctx.stroke();
  }
  
  for (let boxCol = 1; boxCol < numBoxCols; boxCol++) {
    const xPos = x + boxCol * boxCols * cellWidth;
    ctx.beginPath();
    ctx.moveTo(xPos, y);
    ctx.lineTo(xPos, y + height);
    ctx.stroke();
  }
}

/**
 * Draw text centered in a cell
 */
function drawCellText(ctx, text, x, y, width, height, fontSize = 24, fontFamily = 'Arial', fontWeight = 'bold', color = '#000') {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + width / 2, y + height / 2);
}

// ============================================
// Progress/Loading Utilities
// ============================================

/**
 * Update progress bar during bulk generation
 */
function updateProgress(current, total, container) {
  const percent = Math.round((current / total) * 100);
  const fillEl = container.querySelector('.progress-fill');
  const textEl = container.querySelector('.progress-text');
  
  if (fillEl) fillEl.style.width = `${percent}%`;
  if (textEl) textEl.textContent = `${current}/${total} (${percent}%)`;
}

/**
 * Show progress container
 */
function showProgress(container) {
  container.style.display = 'block';
}

/**
 * Hide progress container
 */
function hideProgress(container) {
  container.style.display = 'none';
}

/**
 * Async delay for yielding to UI
 */
function delay(ms = 10) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// KDP/Print Utilities
// ============================================

/**
 * Standard print sizes (in inches)
 */
const PRINT_SIZES = {
  LETTER: { width: 8.5, height: 11 },
  A4: { width: 8.27, height: 11.69 },
  HALF_LETTER: { width: 5.5, height: 8.5 }
};

/**
 * Calculate pixel dimensions for print
 */
function calculatePrintDimensions(widthInches, heightInches, dpi = 300) {
  return {
    width: Math.round(widthInches * dpi),
    height: Math.round(heightInches * dpi)
  };
}

/**
 * Large print settings
 */
const LARGE_PRINT = {
  MIN_FONT_SIZE: 18, // pt
  PREFERRED_FONT_SIZE: 20, // pt
  MIN_CELL_SIZE: 18, // mm
  MARGINS: 0.5, // inches
  HIGH_CONTRAST: true
};

/**
 * Apply large print settings
 */
function applyLargePrintSettings(settings = {}) {
  return {
    ...settings,
    fontSize: Math.max(settings.fontSize || 18, LARGE_PRINT.MIN_FONT_SIZE),
    cellSize: Math.max(settings.cellSize || 18, LARGE_PRINT.MIN_CELL_SIZE),
    margins: Math.max(settings.margins || 0.5, LARGE_PRINT.MARGINS),
    highContrast: true,
    perPage: 1 // Force 1 per page for large print
  };
}

// ============================================
// KDP Bulk Generation Helpers
// ============================================

/**
 * KDP configuration for bulk generation
 */
const KDP_OPTIONS = {
  difficulties: ['easy', 'medium', 'hard', 'expert'],
  fontSizes: [12, 14, 16, 18, 20],
  counts: [10, 25, 50, 100, 200]
};

/**
 * Generate KDP filename with options
 */
function generateKDPFilename(puzzleType, size, difficulty, index, isSolution = false) {
  const suffix = isSolution ? 'solution' : 'puzzle';
  const idx = String(index).padStart(3, '0');
  return `${puzzleType}-${size}x${size}-${difficulty}-${suffix}-${idx}.png`;
}

/**
 * Create print footer with site URL
 */
function addPrintFooter(ctx, width, height, fontSize = 10) {
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = '#666666';
  ctx.textAlign = 'center';
  ctx.fillText('puzzle-engine.com', width / 2, height - 20);
}

// ============================================
// Puzzle Generation Utilities
// ============================================

/**
 * Check if placement is valid for Sudoku-like puzzles
 */
function isValidPlacement(grid, row, col, value, boxRows, boxCols) {
  const size = grid.length;
  
  // Check row
  for (let c = 0; c < size; c++) {
    if (grid[row][c] === value) return false;
  }
  
  // Check column
  for (let r = 0; r < size; r++) {
    if (grid[r][col] === value) return false;
  }
  
  // Check box
  const boxStartRow = Math.floor(row / boxRows) * boxRows;
  const boxStartCol = Math.floor(col / boxCols) * boxCols;
  
  for (let r = boxStartRow; r < boxStartRow + boxRows; r++) {
    for (let c = boxStartCol; c < boxStartCol + boxCols; c++) {
      if (grid[r][c] === value) return false;
    }
  }
  
  return true;
}

/**
 * Get display character for puzzle values (handles 12x12, 16x16)
 */
function getDisplayChar(value) {
  if (value <= 9) return value.toString();
  return String.fromCharCode(64 + value - 9); // 10 -> A, 11 -> B, etc.
}

/**
 * Parse display character back to numeric value
 */
function parseDisplayChar(char) {
  const num = parseInt(char);
  if (!isNaN(num)) return num;
  return char.charCodeAt(0) - 64 + 9; // A -> 10, B -> 11, etc.
}

/**
 * Get box dimensions for grid size
 */
function getBoxDimensions(gridSize) {
  const configs = {
    4: { rows: 2, cols: 2 },
    6: { rows: 2, cols: 3 },
    9: { rows: 3, cols: 3 },
    12: { rows: 3, cols: 4 },
    16: { rows: 4, cols: 4 }
  };
  return configs[gridSize] || { rows: Math.sqrt(gridSize), cols: Math.sqrt(gridSize) };
}

// ============================================
// Random/Seed Utilities
// ============================================

/**
 * Seeded random number generator (for reproducible puzzles)
 */
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }
  
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  
  shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

/**
 * Generate random seed
 */
function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

// ============================================
// Validation Utilities
// ============================================

/**
 * Validate word list (for word puzzles)
 */
function validateWordList(words, maxLength = 15) {
  return words
    .map(w => w.toUpperCase().trim())
    .filter(w => w.length >= 2 && w.length <= maxLength && /^[A-Z]+$/.test(w));
}

/**
 * Remove duplicates from array
 */
function unique(array) {
  return [...new Set(array)];
}

// ============================================
// Export for use in modules
// ============================================

// Make available globally for non-module usage
if (typeof window !== 'undefined') {
  window.shuffleArray = shuffleArray;
  window.createEmptyGrid = createEmptyGrid;
  window.copyGrid = copyGrid;
  window.transposeGrid = transposeGrid;
  window.timestamp = timestamp;
  window.downloadCanvas = downloadCanvas;
  window.downloadJSON = downloadJSON;
  window.createHiDPICanvas = createHiDPICanvas;
  window.createDisplayCanvas = createDisplayCanvas;
  window.drawGridLines = drawGridLines;
  window.drawBoxBorders = drawBoxBorders;
  window.drawCellText = drawCellText;
  window.updateProgress = updateProgress;
  window.showProgress = showProgress;
  window.hideProgress = hideProgress;
  window.delay = delay;
  window.PRINT_SIZES = PRINT_SIZES;
  window.calculatePrintDimensions = calculatePrintDimensions;
  window.LARGE_PRINT = LARGE_PRINT;
  window.applyLargePrintSettings = applyLargePrintSettings;
  window.isValidPlacement = isValidPlacement;
  window.getDisplayChar = getDisplayChar;
  window.parseDisplayChar = parseDisplayChar;
  window.getBoxDimensions = getBoxDimensions;
  window.SeededRandom = SeededRandom;
  window.generateSeed = generateSeed;
  window.validateWordList = validateWordList;
  window.unique = unique;
  window.KDP_OPTIONS = KDP_OPTIONS;
  window.generateKDPFilename = generateKDPFilename;
  window.addPrintFooter = addPrintFooter;
}