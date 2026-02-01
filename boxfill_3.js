// Sandboxels Box Fill Tool - Simple Version
console.log('Box Fill Tool: Starting...');

let boxFillActive = false;
let startPos = null;
let isDrawingBox = false;
let currentMousePos = null;

// Create overlay canvas
const overlayCanvas = document.createElement('canvas');
overlayCanvas.id = 'boxfill-overlay';
overlayCanvas.style.position = 'fixed';
overlayCanvas.style.top = '0';
overlayCanvas.style.left = '0';
overlayCanvas.style.pointerEvents = 'none';
overlayCanvas.style.zIndex = '10000';
document.body.appendChild(overlayCanvas);

const ctx = overlayCanvas.getContext('2d');
overlayCanvas.width = window.innerWidth;
overlayCanvas.height = window.innerHeight;

function redrawBox() {
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
  if (isDrawingBox && startPos && currentMousePos) {
    const x = Math.min(startPos.x, currentMousePos.x);
    const y = Math.min(startPos.y, currentMousePos.y);
    const w = Math.abs(currentMousePos.x - startPos.x);
    const h = Math.abs(currentMousePos.y - startPos.y);
    
    // Draw blue rectangle
    ctx.strokeStyle = '#0099ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    
    // Semi-transparent fill
    ctx.fillStyle = 'rgba(0, 153, 255, 0.15)';
    ctx.fillRect(x, y, w, h);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'b' || e.key === 'B') {
    boxFillActive = !boxFillActive;
    console.log('Box Fill Tool: ' + (boxFillActive ? 'ENABLED' : 'DISABLED'));
  }
});

document.addEventListener('mousedown', (e) => {
  if (boxFillActive && e.button === 0) {
    isDrawingBox = true;
    startPos = { x: e.clientX, y: e.clientY };
    currentMousePos = { x: e.clientX, y: e.clientY };
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDrawingBox) {
    currentMousePos = { x: e.clientX, y: e.clientY };
    redrawBox();
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDrawingBox && startPos) {
    isDrawingBox = false;
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    startPos = null;
    currentMousePos = null;
  }
});

window.addEventListener('resize', () => {
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
});

console.log('Box Fill Tool loaded! Press B to toggle.');
