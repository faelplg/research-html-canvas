console.log("== Main - Experiment 03 ==");

/*
 * Canvas config
 *
 * Default canvas width (not strictly used, but kept for reference)
 * Default canvas height (not strictly used, but kept for reference)
 * Aspect ratio (width / height) for responsive resizing
 * Minimum margin (in pixels) around the canvas
 * Background color for the canvas
 * Device pixel ratio for high-DPI screens
 */
const config = {
  width: 1080,
  height: 1080,
  aspect: 2.5,
  margin: 32,
  background: "#f4f1f5",
  pixelRatio: window.devicePixelRatio || 1,
};

/* Sets up the canvas to be responsive and high-DPI aware */
function setupCanvas(canvas, config) {
  function resize() {
    const main = canvas.parentElement; // Gets the parent container of the canvas
    const dpr = config.pixelRatio;          // Uses the configured device pixel ratio
   
    /* Calculates available width and height, considering margins */
    const mainWidth = main.clientWidth - config.margin * 2;
    const mainHeight =
      window.innerHeight -
      main.getBoundingClientRect().top -
      config.margin * 2;
    let width = mainWidth;
    let height = mainHeight;
     
    console.log(`canvas width: ${width}`);
    console.log(`canvas height: ${height}`);

    /* Sets the actual canvas pixel size (for high-DPI) */
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    /* Sets the CSS size of the canvas */
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Resets any existing transforms
    ctx.scale(dpr, dpr);                // Scales context for high-DPI rendering

    draw(ctx, width, height, config);   // Calls the draw function to render content
  }

  window.addEventListener("resize", resize);  // Re-runs resize logic on window resize
  resize(); // Initial call to set up the canvas
}

/* Handles all drawing logic for the canvas */
function draw(ctx, width, height, config) {
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, width, height);

  const squareSize = 0.1 * height;
  console.log(squareSize);
  const gap = 16;
  const off = 24;

  const usableWidth = width - 2 * gap;
  const usableHeight = height - 2 * gap;

  const squaresPerRow = Math.floor((usableWidth + gap) / (squareSize + gap));
  const squaresPerColumn = Math.floor((usableHeight + gap) / (squareSize + gap));

  const totalWidth = squaresPerRow * squareSize + (squaresPerRow - 1) * gap;
  const totalHeight = squaresPerColumn * squareSize + (squaresPerColumn - 1) * gap;

  const startX = (width - totalWidth) / 2;
  const startY = (height - totalHeight) / 2;

  for (let row = 0; row < squaresPerColumn; row++) {
    for (let col = 0; col < squaresPerRow; col++) {
      const x = startX + col * (squareSize + gap);
      const y = startY + row * (squareSize + gap);

      ctx.strokeStyle = '#b7e2dc';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.rect(x, y, squareSize, squareSize);
      ctx.stroke();

      if (Math.random() > 0.5) {
        ctx.strokeStyle = '#6ec1b2';
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.rect(x + off/2, y + off/2, squareSize - off, squareSize - off);
        ctx.stroke();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("showroom");
  setupCanvas(canvas, config);
});
