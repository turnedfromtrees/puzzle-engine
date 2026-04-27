/**
 * KDP Export Utilities
 * Shared functions for Kindle Direct Publishing puzzle exports
 * 
 * Features:
 * - Large Print mode (16pt+ fonts, larger cells, 0.5"+ margins)
 * - 300 DPI PNG export
 * - Bulk generation helper
 * - Solution format options
 */

// ============================================================================
// Large Print Configuration
// ============================================================================

const LARGE_PRINT_CONFIG = {
  minFontPt: 16,
  preferredFontPt: 18,
  maxFontPt: 24,
  cellMinMM: 12,           // Minimum cell size: 12mm for grids
  marginInch: 0.5,         // Standard KDP margins
  colors: {
    background: '#ffffff',
    text: '#000000',
    grid: '#333333',
    gridLight: '#666666'
  }
};

// ============================================================================
// KDP Trim Sizes (for reference and PDF generation)
// ============================================================================

const KDP_TRIM_SIZES = {
  'large-print': { 
    width: 8.5, 
    height: 11, 
    name: 'Large Print (Letter)',
    gutterInch: 0.5,
    outsideMarginInch: 0.5
  },
  'standard': { 
    width: 8.5, 
    height: 11, 
    name: 'Standard Letter',
    gutterInch: 0.375,
    outsideMarginInch: 0.25
  },
  'pocket': { 
    width: 5, 
    height: 8, 
    name: 'Pocket/Travel',
    gutterInch: 0.375,
    outsideMarginInch: 0.25
  },
  'paperback': { 
    width: 6, 
    height: 9, 
    name: 'Standard Paperback',
    gutterInch: 0.375,
    outsideMarginInch: 0.25
  }
};

// ============================================================================
// DPI Scaling Constants
// ============================================================================

const DPI_CONFIG = {
  screen: 96,        // Standard screen DPI
  print: 300,        // KDP recommended print DPI
  highQuality: 600   // High-quality print option
};

// ============================================================================
// Solution Format Options
// ============================================================================

const SOLUTION_FORMATS = {
  'same-page': {
    name: 'Same Page',
    description: 'Solution below puzzle on same page'
  },
  'separate': {
    name: 'Separate',
    description: 'Solutions in separate folder/section'
  },
  'end-of-book': {
    name: 'End of Book',
    description: 'All solutions at the end of the book'
  },
  'compact': {
    name: 'Compact',
    description: '4-6 solutions per page'
  }
};

// ============================================================================
// Core Export Functions
// ============================================================================

/**
 * Create a canvas with proper DPI scaling for print
 * @param {number} widthWidth in screen pixels (96 DPI)
 * @param {number} heightHeight in screen pixels (96 DPI)
 * @param {Object} options Configuration options
 * @returns {Object} { canvas, ctx, scale }
 */
function createKDPCanvas(width, height, options = {}) {
  const {
    largePrint = false,
    dpi = DPI_CONFIG.print,
    title = '',
    titlePt = largePrint ? 22 : 18,
    subtitle = '',
    subtitlePt = largePrint ? 14 : 12,
    padding = largePrint ? 40 : 30
  } = options;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Calculate scale for target DPI
  const scale = dpi / DPI_CONFIG.screen;
  
  canvas.width = width * scale;
  canvas.height = height * scale;
  
  // Scale context for drawing
  ctx.scale(scale, scale);
  
  // White background
  ctx.fillStyle = LARGE_PRINT_CONFIG.colors.background;
  ctx.fillRect(0, 0, width, height);
  
  // Title header
  if (title) {
    ctx.fillStyle = LARGE_PRINT_CONFIG.colors.text;
    ctx.font = `bold ${titlePt}pt Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, padding);
  }
  
  // Subtitle
  if (subtitle) {
    ctx.font = `${subtitlePt}pt Arial, sans-serif`;
    ctx.fillStyle = '#4a5568';
    ctx.fillText(subtitle, width / 2, padding + titlePt + 5);
  }
  
  return { canvas, ctx, scale };
}

/**
 * Calculate cell size for large print compatibility
 * @param {number} gridSize Number of cells in grid
 * @param {number} containerWidth Available width in pixels
 * @param {number} padding Total padding on both sides
 * @returns {number} Cell size in screen pixels
 */
function calculateLargePrintCellSize(gridSize, containerWidth, padding = 60) {
  // Minimum 12mm cells for large print
  const minMM = LARGE_PRINT_CONFIG.cellMinMM;
  const pixelsPerMM = DPI_CONFIG.print / 25.4; // 25.4mm per inch
  const minPixels = minMM * pixelsPerMM / (DPI_CONFIG.print / DPI_CONFIG.screen);
  
  const availableWidth = containerWidth - padding;
  const maxCellSize = availableWidth / gridSize;
  
  return Math.max(minPixels, maxCellSize);
}

/**
 * Get DPI scale factor for canvas drawing
 * @param {number} targetDPI Target DPI (default 300)
 * @returns {number} Scale factor
 */
function getDPIScale(targetDPI = DPI_CONFIG.print) {
  return targetDPI / DPI_CONFIG.screen;
}

// ============================================================================
// Bulk Generation Helpers
// ============================================================================

/**
 * Bulk export progress tracker
 */
class BulkExportProgress {
  constructor(total, onProgress) {
    this.total = total;
    this.completed = 0;
    this.onProgress = onProgress || (() => {});
    this.startTime = Date.now();
  }
  
  increment(count = 1) {
    this.completed += count;
    const percent = Math.round((this.completed / this.total) * 100);
    const elapsed = (Date.now() - this.startTime) / 1000;
    const eta = this.completed > 0 
      ? (elapsed / this.completed) * (this.total - this.completed)
      : 0;
    
    this.onProgress({
      completed: this.completed,
      total: this.total,
      percent,
      elapsed,
      eta
    });
  }
  
  complete() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    this.onProgress({
      completed: this.total,
      total: this.total,
      percent: 100,
      elapsed,
      eta: 0
    });
  }
}

/**
 * Generate bulk puzzles with progress tracking
 * @param {Function} generatorFn Function that returns { puzzle, solution }
 * @param {number} count Number of puzzles to generate
 * @param {Object} options Generation options
 * @returns {Promise<Array>} Array of { puzzle, solution } objects
 */
async function generateBulkPuzzles(generatorFn, count, options = {}) {
  const {
    onProgress = null,
    batchSize = 10,
    delayMs = 0 // Delay between batches to prevent UI freeze
  } = options;
  
  const progress = new BulkExportProgress(count, onProgress);
  const results = [];
  
  for (let i = 0; i < count; i += batchSize) {
    const batchEnd = Math.min(i + batchSize, count);
    
    for (let j = i; j < batchEnd; j++) {
      const result = generatorFn(j);
      results.push(result);
      progress.increment();
    }
    
    // Yield to event loop
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } else {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  progress.complete();
  return results;
}

// ============================================================================
// ZIP Export Helpers
// ============================================================================

/**
 * Create ZIP file with puzzles and solutions
 * @param {Array} puzzles Array of puzzle canvases
 * @param {Array} solutions Array of solution canvases
 * @param {string} puzzleType Puzzle type name (e.g., 'sudoku', 'word-search')
 * @param {Object} options Export options
 * @returns {Promise<Blob>} ZIP file as blob
 */
async function createBulkZip(puzzles, solutions, puzzleType, options = {}) {
  const {
    puzzleFolder = 'puzzles',
    solutionFolder = 'solutions',
    filenamePrefix = puzzleType,
    solutionFormat = 'separate'
  } = options;
  
  // Check for JSZip
  if (typeof JSZip === 'undefined' && typeof window.JSZip === 'undefined') {
    throw new Error('JSZip library required for ZIP export');
  }
  
  const JSZipLib = typeof JSZip !== 'undefined' ? JSZip : window.JSZip;
  const zip = new JSZipLib();
  
  const puzzlesFolder = zip.folder(puzzleFolder);
  const solutionsFolder = zip.folder(solutionFolder);
  
  for (let i = 0; i < puzzles.length; i++) {
    const numStr = String(i + 1).padStart(3, '0');
    
    // Add puzzle
    if (puzzles[i]) {
      const puzzleData = puzzles[i].toDataURL('image/png').split(',')[1];
      puzzlesFolder.file(`${filenamePrefix}-${numStr}.png`, puzzleData, { base64: true });
    }
    
    // Add solution
    if (solutions[i]) {
      const solutionData = solutions[i].toDataURL('image/png').split(',')[1];
      solutionsFolder.file(`${filenamePrefix}-${numStr}-solution.png`, solutionData, { base64: true });
    }
  }
  
  return zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
}

/**
 * Download ZIP blob
 * @param {Blob} blob ZIP file blob
 * @param {string} filename Download filename
 */
function downloadZip(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ============================================================================
// Solution Rendering Helpers
// ============================================================================

/**
 * Render compact solutions (multiple per page)
 * @param {Array} solutions Array of solution canvases
 * @param {number} perPage Solutions per page (4 or 6)
 * @returns {Array<HTMLCanvasElement>} Array of page canvases
 */
function renderCompactSolutions(solutions, perPage = 4) {
  const pages = [];
  
  const layout = perPage === 4 
    ? { cols: 2, rows: 2, padding: 40 }
    : { cols: 3, rows: 2, padding: 30 };
  
  for (let i = 0; i < solutions.length; i += perPage) {
    const pageCanvas = document.createElement('canvas');
    const ctx = pageCanvas.getContext('2d');
    
    // Letter size at 300 DPI
    const pageWidth = 8.5 * 300;
    const pageHeight = 11 * 300;
    
    pageCanvas.width = pageWidth;
    pageCanvas.height = pageHeight;
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageWidth, pageHeight);
    
    const cellWidth = (pageWidth - layout.padding * (layout.cols + 1)) / layout.cols;
    const cellHeight = (pageHeight - layout.padding * (layout.rows + 1)) / layout.rows;
    
    for (let j = 0; j < perPage && i + j < solutions.length; j++) {
      const col = j % layout.cols;
      const row = Math.floor(j / layout.cols);
      
      const x = layout.padding + col * (cellWidth + layout.padding);
      const y = layout.padding + row * (cellHeight + layout.padding);
      
      // Draw solution number
      ctx.fillStyle = '#666666';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`#${i + j + 1}`, x, y - 10);
      
      // Scale and draw solution
      if (solutions[i + j]) {
        const sol = solutions[i + j];
        const scale = Math.min(
          (cellWidth - 20) / sol.width,
          (cellHeight - 40) / sol.height
        );
        
        ctx.save();
        ctx.translate(x + 10, y + 20);
        ctx.scale(scale * (300/96), scale * (300/96));
        ctx.drawImage(sol, 0, 0);
        ctx.restore();
      }
    }
    
    pages.push(pageCanvas);
  }
  
  return pages;
}

// ============================================================================
// Export Utilities
// ============================================================================

/**
 * Export canvas as PNG download
 * @param {HTMLCanvasElement} canvas Canvas to export
 * @param {string} filename Filename without extension
 * @param {Object} options Export options
 */
function exportPNG(canvas, filename, options = {}) {
  const {
    dpi = DPI_CONFIG.print,
    quality = 0.95
  } = options;
  
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png', quality);
  link.click();
}

// ============================================================================
// Module Exports
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Config
    LARGE_PRINT_CONFIG,
    KDP_TRIM_SIZES,
    DPI_CONFIG,
    SOLUTION_FORMATS,
    
    // Core functions
    createKDPCanvas,
    calculateLargePrintCellSize,
    getDPIScale,
    
    // Bulk generation
    BulkExportProgress,
    generateBulkPuzzles,
    
    // ZIP export
    createBulkZip,
    downloadZip,
    
    // Solution helpers
    renderCompactSolutions,
    
    // Export utilities
    exportPNG
  };
}