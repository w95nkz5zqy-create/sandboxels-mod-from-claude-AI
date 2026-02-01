// Sandboxels Box Fill Tool v6
(function() {
  console.log('Box Fill Tool v6: Starting...');

  // Log available globals to find the API
  console.log('Looking for Sandboxels API...');
  const keys = Object.keys(window).filter(k => 
    k.includes('pixel') || k.includes('draw') || k.includes('brush') || 
    k.includes('element') || k.includes('change') || k.includes('set') ||
    k.includes('Pixel') || k.includes('Draw') || k.includes('Element')
  );
  console.log('Potential API functions found:', keys);
  
  // Also check for common object names
  if (window.pixelData) console.log('Found: pixelData');
  if (window.elements) console.log('Found: elements');
  if (window.ctx) console.log('Found: ctx');
  if (window.canvas) console.log('Found: canvas');

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
      // Could add visual feedback here
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

  console.log('Box Fill Tool v6 loaded! Press B to toggle.');
})();
