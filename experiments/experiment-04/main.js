console.log("== Main - Experiment 04 ==");

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

const degToRad = (degrees) => {
  return (degrees * Math.PI) / 180;
}

/* Handles all drawing logic for the canvas */
function draw(ctx, width, height, config) {
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#6EC1B2';
  
  const cx = 0.5 * width;       // center x
  const cy = 0.5 * height;      // center y
  const radius = 0.25 * width;  // circle radius
  const num = 12;               // number of slices

  ctx.beginPath();
  ctx.ellipse(cx, cy, 0.5 * width, 0.5 * height, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = '#B7E2DC';

  ctx.beginPath();
  ctx.arc(cx, cy, 0.25 * width, 0, 2 * Math.PI);
  ctx.fill();

  for (let i = 0; i < num; i ++) {
    const slice = degToRad(360 / num);
    console.log(`slice = ${slice}`);
    const angle = slice * i;
    console.log(`angle = ${angle}`);

    /*
     * In the trigonometric unit circle, we have the following relationship:
     *cos(θ) represents the x-coordinate on the unit circle.
     *sin(θ) represents the y-coordinate on the unit circle.
     * However, this is a version rotated by 90deg, when the Y-axis grows downward.
     *Like HTML Canvas.
     */

    x = cx + Math.sin(angle) * radius;
    y = cy + Math.cos(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#472C63';
    ctx.fill();
  }

}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("showroom");
  setupCanvas(canvas, config);
});
