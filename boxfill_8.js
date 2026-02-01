// Sandboxels Box Fill Tool v8 - With blue preview rectangle
(function() {
  console.log('Box Fill Tool v8: Starting...');

  let boxFillActive = false;
  let startPos = null;
  let isDrawingBox = false;
  let currentMousePos = null;

  // Create overlay canvas for blue rectangle preview
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.id = 'boxfill-preview';
  overlayCanvas.style.position = 'fixed';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.pointerEvents = 'none';
  overlayCanvas.style.zIndex = '10000';
  document.body.appendChild(overlayCanvas);

  const ctx = overlayCanvas.getContext('2d');
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;

  function drawPreviewBox() {
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    if (isDrawingBox && startPos && currentMousePos) {
      const x = Math.min(startPos.x, currentMousePos.x);
      const y = Math.min(startPos.y, currentMousePos.y);
      const w = Math.abs(currentMousePos.x - startPos.x);
      const h = Math.abs(currentMousePos.y - startPos.y);
      
      // Draw blue rectangle outline
      ctx.strokeStyle = '#0099ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      
      // Semi-transparent blue fill
      ctx.fillStyle = 'rgba(0, 153, 255, 0.15)';
      ctx.fillRect(x, y, w, h);
    }
  }

  window.addEventListener('resize', () => {
    overlayCanvas.width = window.innerWidth;
    overlayCanvas.height = window.innerHeight;
  });

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
      console.log('Box started at:', startPos);
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDrawingBox && startPos) {
      currentMousePos = { x: e.clientX, y: e.clientY };
      drawPreviewBox();
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawingBox && startPos) {
      const endPos = { x: e.clientX, y: e.clientY };
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      
      console.log('Box released. Filling from', startPos, 'to', endPos);
      
      // Convert screen coordinates to game grid coordinates
      const pSize = window.pixelSize || 1;
      const x1 = Math.floor(startPos.x / pSize);
      const y1 = Math.floor(startPos.y / pSize);
      const x2 = Math.floor(endPos.x / pSize);
      const y2 = Math.floor(endPos.y / pSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      console.log(`Filling box from (${minX}, ${minY}) to (${maxX}, ${maxY})`);
      console.log('Current element:', window.currentElement);
      
      // Fill the box with currently selected element
      if (window.createPixel && window.currentElement !== undefined) {
        let pixelsCreated = 0;
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            try {
              window.createPixel(x, y, window.currentElement);
              pixelsCreated++;
            } catch (err) {
              // Silently skip errors (out of bounds, etc)
            }
          }
        }
        console.log(`Created ${pixelsCreated} pixels with element: ${window.currentElement}`);
      } else {
        console.error('Missing: createPixel or currentElement');
      }
      
      isDrawingBox = false;
      startPos = null;
      currentMousePos = null;
    }
  });

  console.log('Box Fill Tool v8 loaded! Press B to toggle. Click and drag to fill with selected material.');
})();
