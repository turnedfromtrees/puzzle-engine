/**
 * Puzzle Engine - Shared Core Utilities
 * Common functions used across all puzzle types
 * 
 * Includes:
 * - Array manipulation
 * - Grid utilities
 * - Canvas helpers
 * - Large Print configuration
 * - DPI scaling helpers
 * - Bulk export progress tracking
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array
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
 * Create empty grid of given size
 * @param {number} size - Grid dimension
 * @returns {Array<Array>} - 2D array filled with empty values
 */
function createEmptyGrid(size, fillValue = '') {
  return Array(size).fill(null).map(() => Array(size).fill(fillValue));
}

/**
 * Generate a canvas with puzzle metadata header
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {string} title - Puzzle title
 * @param {string} subtitle - Puzzle subtitle (e.g., "Easy - 15x15")
 * @returns {HTMLCanvasElement} - Canvas with header drawn
 */
function createCanvasWithHeader(width, height, title, subtitle) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Header
  ctx.fillStyle = '#1a202c';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, canvas.width / 2, 30);
  
  if (subtitle) {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#4a5568';
    ctx.fillText(subtitle, canvas.width / 2, 55);
  }
  
  return canvas;
}

/**
 * Draw grid cells on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array<Array>} grid - 2D grid of values
 * @param {number} cellSize - Size of each cell
 * @param {number} startX - X offset
 * @param {number} startY - Y offset
 * @param {Object} options - Drawing options
 */
function drawGridCells(ctx, grid, cellSize, startX, startY, options = {}) {
  const {
    borderColor = '#cbd5e0',
    borderWidth = 1,
    textColor = '#1a202c',
    fontSize = cellSize * 0.5,
    highlightCells = null,
    highlightColor = 'rgba(107, 70, 193, 0.2)'
  } = options;
  
  const size = grid.length;
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${fontSize}px Arial`;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const x = startX + col * cellSize;
      const y = startY + row * cellSize;
      
      // Highlight if needed
      if (highlightCells && highlightCells[row] && highlightCells[row][col]) {
        ctx.fillStyle = highlightColor;
        ctx.fillRect(x, y, cellSize, cellSize);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, cellSize, cellSize);
      }
      
      // Border
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(x, y, cellSize, cellSize);
      
      // Value
      if (grid[row][col]) {
        ctx.fillStyle = textColor;
        ctx.fillText(grid[row][col], x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
}

/**
 * Add footer to canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function addCanvasFooter(ctx, width, height) {
  ctx.fillStyle = '#718096';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('puzzle-engine.com', width / 2, height - 10);
}

/**
 * Download a canvas as PNG
 * @param {HTMLCanvasElement} canvas - Canvas to download
 * @param {string} filename - Filename for download
 */
function downloadCanvas(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ============================================================================
// Large Print Configuration
// ============================================================================

/**
 * Large Print mode configuration for accessibility and KDP
 */
const LARGE_PRINT = {
  enabled: false,
  minFontPt: 16,
  preferredFontPt: 18,
  maxFontPt: 24,
  cellMinMM: 12,           // Minimum 12mm cells for accessibility
  marginInch: 0.5,          // Extra margins for large print
  lineHeight: 1.5,          // Increased line height
  colors: {
    background: '#ffffff',
    text: '#000000',
    grid: '#333333',
    highlight: '#f0f0f0'
  }
};

/**
 * Enable or disable large print mode
 * @param {boolean} enabled - Whether to enable large print
 * @returns {Object} Current large print config
 */
function setLargePrintMode(enabled) {
  LARGE_PRINT.enabled = enabled;
  return { ...LARGE_PRINT };
}

/**
 * Get font size adjusted for large print mode
 * @param {number} baseFontPt - Base font size in points
 * @returns {number} Adjusted font size
 */
function getLargePrintFontSize(baseFontPt) {
  if (!LARGE_PRINT.enabled) return baseFontPt;
  return Math.max(baseFontPt, LARGE_PRINT.minFontPt);
}

/**
 * Get cell size adjusted for large print mode
 * @param {number} baseCellPx - Base cell size in pixels
 * @returns {number} Adjusted cell size
 */
function getLargePrintCellSize(baseCellPx) {
  if (!LARGE_PRINT.enabled) return baseCellPx;
  // Convert minimum mm to pixels (at 96 DPI screen)
  const minPixels = (LARGE_PRINT.cellMinMM / 25.4) * 96;
  return Math.max(baseCellPx, minPixels);
}

// ============================================================================
// DPI Scaling Helpers
// ============================================================================

/**
 * DPI configuration constants
 */
const DPI = {
  SCREEN: 96,
  PRINT: 300,
  HIGH_QUALITY: 600
};

/**
 * Calculate scale factor for target DPI
 * @param {number} targetDPI - Target DPI (default 300)
 * @returns {number} Scale factor to multiply dimensions
 */
function getDPIScale(targetDPI = DPI.PRINT) {
  return targetDPI / DPI.SCREEN;
}

/**
 * Scale a canvas for high-DPI rendering
 * @param {HTMLCanvasElement} canvas - Canvas to scale
 * @param {number} targetDPI - Target DPI (default 300)
 * @returns {Object} { ctx, scale } - Scaled context and scale factor
 */
function scaleCanvasForDPI(canvas, targetDPI = DPI.PRINT) {
  const ctx = canvas.getContext('2d');
  const scale = getDPIScale(targetDPI);
  
  // Store original dimensions
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  
  // Scale canvas dimensions
  canvas.width = originalWidth * scale;
  canvas.height = originalHeight * scale;
  
  // Scale context for drawing operations
  ctx.scale(scale, scale);
  
  return { ctx, scale };
}

/**
 * Convert millimeters to pixels
 * @param {number} mm - Millimeters
 * @param {number} dpi - Target DPI (default 300)
 * @returns {number} Pixels
 */
function mmToPixels(mm, dpi = DPI.SCREEN) {
  return (mm / 25.4) * dpi;
}

/**
 * Convert inches to pixels
 * @param {number} inches - Inches
 * @param {number} dpi - Target DPI (default 300)
 * @returns {number} Pixels
 */
function inchesToPixels(inches, dpi = DPI.SCREEN) {
  return inches * dpi;
}

// ============================================================================
// Bulk Export Progress Tracking
// ============================================================================

/**
 * Progress tracker for bulk puzzle generation
 */
class BulkProgressTracker {
  constructor(total, onProgress = null) {
    this.total = total;
    this.completed = 0;
    this.onProgress = onProgress;
    this.startTime = Date.now();
    this.errors = [];
  }
  
  /**
   * Increment progress by count
   * @param {number} count - Number completed (default 1)
   */
  increment(count = 1) {
    this.completed += count;
    if (this.onProgress) {
      const elapsed = (Date.now() - this.startTime) / 1000;
      const rate = this.completed / elapsed;
      const remaining = this.total - this.completed;
      const eta = rate > 0 ? remaining / rate : 0;
      
      this.onProgress({
        completed: this.completed,
        total: this.total,
        percent: Math.round((this.completed / this.total) * 100),
        elapsed: Math.round(elapsed),
        eta: Math.round(eta),
        errors: this.errors.length
      });
    }
  }
  
  /**
   * Record an error
   * @param {Error} error - Error that occurred
   */
  recordError(error) {
    this.errors.push({
      error: error.message,
      time: Date.now()
    });
  }
  
  /**
   * Mark as complete and get final stats
   * @returns {Object} Final progress stats
   */
  complete() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const result = {
      completed: this.completed,
      total: this.total,
      percent: 100,
      elapsed: Math.round(elapsed),
      eta: 0,
      errors: this.errors.length,
      rate: this.completed / elapsed
    };
    
    if (this.onProgress) {
      this.onProgress(result);
    }
    
    return result;
  }
  
  /**
   * Check if cancelled
   * @returns {boolean} True if should cancel
   */
  isCancelled() {
    return this._cancelled === true;
  }
  
  /**
   * Cancel the operation
   */
  cancel() {
    this._cancelled = true;
  }
}

/**
 * Generate puzzles in batches with progress tracking
 * @param {Function} generatorFn - Function that generates one puzzle
 * @param {number} count - Total puzzles to generate
 * @param {Object} options - Options
 * @returns {Promise<Array>} Array of generated puzzles
 */
async function generateWithProgress(generatorFn, count, options = {}) {
  const {
    onProgress = null,
    batchSize = 10,
    yieldMs = 0
  } = options;
  
  const tracker = new BulkProgressTracker(count, onProgress);
  const results = [];
  
  for (let i = 0; i < count; i += batchSize) {
    if (tracker.isCancelled()) break;
    
    const batchEnd = Math.min(i + batchSize, count);
    
    for (let j = i; j < batchEnd; j++) {
      if (tracker.isCancelled()) break;
      
      try {
        const puzzle = generatorFn(j);
        results.push(puzzle);
      } catch (error) {
        tracker.recordError(error);
        results.push(null);
      }
      tracker.increment();
    }
    
    // Yield to event loop to prevent UI freeze
    if (yieldMs >= 0) {
      await new Promise(resolve => setTimeout(resolve, yieldMs));
    }
  }
  
  tracker.complete();
  return results;
}

// ============================================================================
// Mobile Navigation
// ============================================================================

/**
 * Initialize mobile navigation toggle
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    // Toggle menu on button click
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = navMenu.classList.toggle('is-visible');
      navToggle.setAttribute('aria-expanded', isVisible);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-visible');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-visible');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Initialize mobile nav on DOM ready
document.addEventListener('DOMContentLoaded', initMobileNav);

// ============================================================================
// Module Exports
// ============================================================================

// Export for use in puzzle files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Core utilities
    shuffleArray,
    createEmptyGrid,
    createCanvasWithHeader,
    drawGridCells,
    addCanvasFooter,
    downloadCanvas,
    
    // Large print
    LARGE_PRINT,
    setLargePrintMode,
    getLargePrintFontSize,
    getLargePrintCellSize,
    
    // DPI scaling
    DPI,
    getDPIScale,
    scaleCanvasForDPI,
    mmToPixels,
    inchesToPixels,
    
    // Bulk progress
    BulkProgressTracker,
    generateWithProgress
  };
}