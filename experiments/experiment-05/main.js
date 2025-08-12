console.log("=== Main - Experiment 05 ===");

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
  background: '#f4f1f5',
  color: '#6EC1B2',
  pixelRatio: window.devicePixelRatio || 1
};

/*
 * Utils functions
 */
/* Converts degrees to radians */
const degToRad = (degrees) => {
  return (degrees * Math.PI) / 180;
}
/* Returns a random range between min and max */
const randomRange = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }
  return Math.random() * (max - min) + min;
}
/* Maps a value from an interval to another */
const mapRange = (value, inputMin, inputMax, outputMin, outputMax, clamp = false) => {
  if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
    return outputMin
  }
  let outVal = ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin);
  if (clamp) {
    if (outputMax < outputMin) {
      if (outVal < outputMax) outVal = outputMax;
      else if (outVal > outputMin) outVal = outputMin;
    } else {
      if (outVal > outputMax) outVal = outputMax;
      else if (outVal < outputMin) outVal = outputMin;
    }
  }
  return outVal;
}



/*
 * Sets up the canvas to be responsive and high-DPI aware 
 */
function setupCanvas(canvas, config) {
  let ctx = null;
  let width = 0;
  let height = 0;
  let agents = [];
  let randomX, randomY;
  let agentNum = 160;
  let frame = 0;
  let animated = true;
  let animationId = null;
  let lastTime = 0;
  const frameInterval = 1000 / 30; // FPS

  /*
   * Rerun after resizing page
   */
  function resize() {
    const main = canvas.parentElement;  // Gets the parent container of the canvas
    const dpr = config.pixelRatio;      // Uses the configured device pixel ratio
    agents = [];

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

    console.log('=== Loop agents creation ===');
    for (let i = 0; i < agentNum; i++) {
      randomX = randomRange(0, width);
      randomY = randomRange(0, height);
      agents.push(new Agent(randomX, randomY));
    }

    /*
     * Runs animation strategy
     */
    function animate(now) {
      console.log('=== Animate ===');
      console.log(`frame: ${frame}`);
      if (!lastTime) lastTime = now;
      const delta = now - lastTime;
      if (delta > frameInterval) {
        draw(ctx, width, height, config, frame, agents);
        frame++;
        lastTime = now;
      }
     animationId = requestAnimationFrame(animate);
    }

    frame = 0;
    if (animationId) cancelAnimationFrame(animationId);
    if (animated) {
      animationId = requestAnimationFrame(animate);
    } else {
      draw(ctx, width, height, config, frame, agents);   // Calls the draw function to render content
    }
  }

  window.addEventListener("resize", resize);  // Re-runs resize logic on window resize
  resize();                                   // Initial call to set up the canvas
}

/*
 * Handles all drawing logic for the canvas
 */
function draw(ctx, width, height, config, frame, agents) {
  console.log('=== Draw ===');
  console.log('frame', frame);
  ctx.fillStyle = config.background;
  ctx.strokeStyle = config.color;
  ctx.fillRect(0, 0, width, height);
 
  console.log('=== Loop draw agents ===');
  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    for (let j = i + 1; j < agents.length; j++) {
      if (Math.random() < 0.1) {
        agents[i].bump(agents[j]);
      }
      const other = agents[j];
      const distance = agent.position.getDistanceTo(other.position);
      if (distance > 160) continue;
      ctx.save();
      ctx.lineWidth = mapRange(distance, 0, 200, 10, 0)
      ctx.beginPath();
      ctx.moveTo(agent.position.x, agent.position.y);
      ctx.lineTo(other.position.x, other.position.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  agents.forEach(agent => {
    agent.update();
    agent.draw(ctx);
    if (Math.random() < 0.5) {
      agent.bounce(width, height);
    } else {
      agent.wrap(width, height);
    }
  });
  
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("showroom");
  setupCanvas(canvas, config);
});

/*
 * Vector
 */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistanceTo(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/*
 * Agent
 */
class Agent {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(randomRange(-4, 4), randomRange(-4, 4));
    this.radius = randomRange(8, 32);
    this.lineWidth = randomRange(2, 8);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  bounce(width, height) {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  wrap(width, height) {
    if (this.position.x < 0) {
      this.position.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
    }
  }
  
  bump(other) {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDist = this.radius + other.radius;
    if ( distance < minDist) {
      // collision angle
      const angle = Math.atan2(dy, dx);

      // change velocities
      const speed1 = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      const speed2 = Math.sqrt(other.velocity.x ** 2 + other.velocity.y ** 2);

      this.velocity.x = Math.cos(angle) * speed2;
      this.velocity.y = Math.sin(angle) * speed2;
      other.velocity.x = -Math.cos(angle) * speed1;
      other.velocity.y = -Math.sin(angle) * speed1;

      // Optional: separate agents to avoid overlap
      /*const overlap = minDist - distance;
      this.position.x += Math.cos(angle) * (overlap / 2);
      this.position.y += Math.sin(angle) * (overlap / 2);
      other.position.x -= Math.cos(angle) * (overlap / 2);
      other.position.y -= Math.sin(angle) * (overlap / 2);*/
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

