/**
 * Puzzle Engine - Shared Core Utilities
 * Common functions used across all puzzle types
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

/**
 * Initialize mobile navigation toggle
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-visible');
    });
  }
}

// Initialize mobile nav on DOM ready
document.addEventListener('DOMContentLoaded', initMobileNav);

// Export for use in puzzle files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    shuffleArray,
    createEmptyGrid,
    createCanvasWithHeader,
    drawGridCells,
    addCanvasFooter,
    downloadCanvas
  };
}