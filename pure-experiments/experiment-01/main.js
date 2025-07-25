console.log("==Main==");

const config = {
  width: 1000,
  height: 400,
  aspect: 2.5,
  margin: 32,
  background: "#e9e6ea",
  pixelRatio: window.devicePixelRatio || 1,
};

function setupCanvas(canvas, config) {
  function resize() {
    const container = canvas.parentElement;
    const dpr = config.pixelRatio;
    const containerWidth = container.clientWidth - config.margin * 2;
    const containerHeight =
      window.innerHeight -
      container.getBoundingClientRect().top -
      config.margin * 2;

    let width = containerWidth;
    let height = width / config.aspect;
    if (height > containerHeight) {
      height = containerHeight;
      width = height * config.aspect;
    }
    width = Math.floor(width);
    height = Math.floor(height);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    draw(ctx, width, height, config);
  }

  window.addEventListener("resize", resize);
  resize();
}

function draw(ctx, width, height, config) {
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, width, height);

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
