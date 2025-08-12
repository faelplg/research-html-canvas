console.log("=== Main - Experiment 04 ===");

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
  let ctx = null;
  let width = 0;
  let height = 0;
  let frame = 0;
  let animated = true;
  let animationId = null;
  let lastTime = 0;
  const frameInterval = 1000 / 8; // FPS

  function animate(now) {
    console.log('=== Animate ===');
    console.log(`frame: ${frame}`);
    if (!lastTime) lastTime = now;
    const delta = now - lastTime;
    if (delta > frameInterval) {
      draw(ctx, width, height, config, frame);
      frame++;
      lastTime = now;
    }
   animationId = requestAnimationFrame(animate);
  }

  function resize() {
    const main = canvas.parentElement;  // Gets the parent container of the canvas
    const dpr = config.pixelRatio;      // Uses the configured device pixel ratio

    /* Calculates available width and height, considering margins */
    const mainWidth = main.clientWidth - config.margin * 2;
    const mainHeight =
      window.innerHeight -
      main.getBoundingClientRect().top -
      config.margin * 2;
    width = mainWidth;
    height = mainHeight;

    console.log(`canvas width: ${width}`);
    console.log(`canvas height: ${height}`);

    /* Sets the actual canvas pixel size (for high-DPI) */
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    /* Sets the CSS size of the canvas */
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Resets any existing transforms
    ctx.scale(dpr, dpr);                // Scales context for high-DPI rendering

    frame = 0;
    if (animationId) cancelAnimationFrame(animationId);
    if (animated) {
      animationId = requestAnimationFrame(animate);
    } else {
      draw(ctx, width, height, config, frame);   // Calls the draw function to render content
    }
  }

  window.addEventListener("resize", resize);  // Re-runs resize logic on window resize
  resize();                                   // Initial call to set up the canvas
}

const degToRad = (degrees) => {
  return (degrees * Math.PI) / 180;
}

const randomRange = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }
  return Math.random() * (max - min) + min;
}

/* Handles all drawing logic for the canvas */
function draw(ctx, width, height, config, frame) {
  console.log('=== Draw ===');
  console.log('frame', frame);
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, width, height);

  const cx = 0.5 * width;       // center x
  const cy = 0.5 * height;      // center y
  const radius = 0.25 * height;  // circle radius

  const num = 32;               // number of slices
  const w = 0.01 * width;       // width of the rectangle
  const h = 0.1 * height;       // height of the rectangle

  /* Main circle */
  ctx.save();
  ctx.fillStyle = '#B7E2DC';
  ctx.beginPath();
  ctx.arc(cx, cy, randomRange(0.2 * height, 0.25 * height), 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();


  const slice = degToRad(360 / num);
  console.log(degToRad(360));
  console.log(`slice = ${slice} num = ${num}`);

  let angle = 0;
  let x = 0;
  let y = 0;

  console.log('=== Loop rectangles ===');
  for (let i = 0; i < num; i ++) {
    angle = slice * i;

    /*
     * In the trigonometric unit circle, we have the following relationship:
     *cos(θ) represents the x-coordinate on the unit circle.
     *sin(θ) represents the y-coordinate on the unit circle.
     * However, this is a version rotated by 90deg, when the Y-axis grows downward.
     *Like HTML Canvas.
     */
    x = cx + Math.sin(angle) * radius;
    y = cy + Math.cos(angle) * radius;
 
    /*
     * Rectangle
     */
    ctx.save();
    ctx.fillStyle = '#B7E2DC';
    ctx.translate(x, y);                                // new (0,0)
    ctx.rotate(-angle);                                 // negative to match clockwise
    ctx.scale(randomRange(0.5, 2.5),randomRange(1, 3)); // scale rectangle dimensions
    ctx.beginPath();
    ctx.rect(0.5 * -w, 0.5 * -h, w, h);
    ctx.fill();
    ctx.restore();
    /**/
  }
  console.log('=== Loop FX ===');
  for (let j = 0; j < num; j ++) {
    angle = slice * j;

    /*
     * In the trigonometric unit circle, we have the following relationship:
     *cos(θ) represents the x-coordinate on the unit circle.
     *sin(θ) represents the y-coordinate on the unit circle.
     * However, this is a version rotated by 90deg, when the Y-axis grows downward.
     *Like HTML Canvas.
     */
    x = cx + Math.sin(angle) * radius;
    y = cy + Math.cos(angle) * radius;
 
    /* FX Lines */
    ctx.save();
    ctx.strokeStyle = '#6EC1B2';
    ctx.translate(cx, cy);
    ctx.rotate(-angle);
    ctx.lineWidth = randomRange(5, 20);
    ctx.beginPath();
    ctx.arc(0, 0, radius * randomRange(0.2, 0.8), slice * randomRange(0.8, -0.8), slice * randomRange(0.4, 0.8));
    ctx.stroke();
    ctx.restore();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("showroom");
  setupCanvas(canvas, config);
});
