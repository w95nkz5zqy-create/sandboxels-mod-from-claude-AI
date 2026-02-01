// Sandboxels Box Fill Tool
console.log('Box Fill Tool: Starting...');

// Log available globals to find the API
console.log('Looking for Sandboxels API...');
if (typeof window !== 'undefined') {
  const keys = Object.keys(window).filter(k => 
    k.includes('pixel') || k.includes('draw') || k.includes('brush') || 
    k.includes('element') || k.includes('change') || k.includes('set')
  );
  console.log('Potential API functions:', keys);
}

let boxFillActive = false;
let startPos = null;
let isDrawingBox = false;

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
    console.log('Box started at:', startPos);
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDrawingBox && startPos) {
    console.log('Dragging to:', { x: e.clientX, y: e.clientY });
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDrawingBox && startPos) {
    const endPos = { x: e.clientX, y: e.clientY };
    console.log('Box released. Area:', startPos, 'to', endPos);
    isDrawingBox = false;
    startPos = null;
  }
});

console.log('Box Fill Tool loaded! Press B to toggle.');
