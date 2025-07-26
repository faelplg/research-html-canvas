console.log("==Main - Experiment 02 ==");

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

  ctx.beginPath();
  ctx.moveTo(width/2, 0);
  ctx.lineTo(width/2, height);
  ctx.stroke();
  
  ctx.fillStyle = "#1a0e1d";
  ctx.font = "24px Space Grotesk, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "Welcome to the HTML Canvas Experiments Showroom!",
    width / 2,
    height / 2
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("showroom");
  setupCanvas(canvas, config);
});
