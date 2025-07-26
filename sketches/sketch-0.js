const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'lightblue';
    context.lineWidth = 0.01 * width;

    const w = 0.1 * width;
    const h = 0.1 * height;
    const gap = 0.03 * width;
    const ix = 0.17 * width;
    const iy = 0.17 * width;
    const off = 0.02 * width;
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.fill();
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
