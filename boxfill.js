// Box Fill Tool for Sandboxels
// Click and drag to create a rectangle, release to fill with selected material

(function() {
  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  // Create canvas overlay for preview
  const canvas = document.createElement('canvas');
  canvas.id = 'boxfill-preview';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawPreviewBox() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!isDrawing) return;

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    // Draw blue box outline
    ctx.strokeStyle = '#0099ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Semi-transparent fill
    ctx.fillStyle = 'rgba(0, 153, 255, 0.1)';
    ctx.fillRect(x, y, width, height);
  }

  function fillBox(x1, y1, x2, y2) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    // Access the game's pixel setting function
    if (window.setPixel) {
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          window.setPixel(x, y);
        }
      }
    }
  }

  // Mouse events
  document.addEventListener('mousedown', (e) => {
    // Only activate if left clicking and not on UI elements
    if (e.button === 0 && !e.target.closest('input, button, select')) {
      isDrawing = true;
      startX = e.clientX;
      startY = e.clientY;
      currentX = e.clientX;
      currentY = e.clientY;
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      currentX = e.clientX;
      currentY = e.clientY;
      drawPreviewBox();
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawing) {
      isDrawing = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Convert screen coordinates to game coordinates
      // This is a simplified conversion - you may need to adjust based on game's coordinate system
      if (window.screenToGame) {
        const start = window.screenToGame(startX, startY);
        const end = window.screenToGame(currentX, currentY);
        fillBox(start.x, start.y, end.x, end.y);
      }
    }
  });

  console.log('Box Fill Tool loaded! Click and drag to create rectangles.');
})();
