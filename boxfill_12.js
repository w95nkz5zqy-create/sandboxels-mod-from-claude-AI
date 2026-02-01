// Sandboxels Box Fill Tool v12 - Fills to the edge of the box properly
(function() {
  console.log('Box Fill Tool v12: Starting...');

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
      
      // Find the main canvas
      const gameCanvas = document.querySelector('canvas');
      let canvasOffsetX = 0;
      let canvasOffsetY = 0;
      
      if (gameCanvas) {
        const rect = gameCanvas.getBoundingClientRect();
        canvasOffsetX = rect.left;
        canvasOffsetY = rect.top;
      }
      
      // Convert to canvas coordinates
      const canvasX1 = startPos.x - canvasOffsetX;
      const canvasY1 = startPos.y - canvasOffsetY;
      const canvasX2 = endPos.x - canvasOffsetX;
      const canvasY2 = endPos.y - canvasOffsetY;
      
      // Get pixel size
      const pSize = window.pixelSize || 1;
      
      // Convert to grid - include all pixels in the dragged area
      const x1 = Math.floor(canvasX1 / pSize);
      const y1 = Math.floor(canvasY1 / pSize);
      const x2 = Math.floor(canvasX2 / pSize);
      const y2 = Math.floor(canvasY2 / pSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      console.log(`Filling ${(maxX - minX + 1)} x ${(maxY - minY + 1)} box with ${window.currentElement}`);
      
      // Try to fill using changePixel first (better for updates)
      if (window.changePixel && window.currentElement !== undefined) {
        let pixelsChanged = 0;
        
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            try {
              window.changePixel(x, y, window.currentElement);
              pixelsChanged++;
            } catch (err) {
              // Skip errors
            }
          }
        }
        console.log(`Changed ${pixelsChanged} pixels`);
      } else if (window.createPixel && window.currentElement !== undefined) {
        // Fallback to createPixel
        let pixelsCreated = 0;
        
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            try {
              window.createPixel(x, y, window.currentElement);
              pixelsCreated++;
            } catch (err) {
              // Skip errors
            }
          }
        }
        console.log(`Created ${pixelsCreated} pixels`);
      }
      
      isDrawingBox = false;
      startPos = null;
      currentMousePos = null;
    }
  });

  console.log('Box Fill Tool v12 loaded! Press B to toggle. Click and drag to fill.');
})();
