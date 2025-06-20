const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

let manager;

let text = 'F';
let fontSize = 1200;
let fontfamily = 'sans-serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  // only need to run this once
  // define the grid properties of canvas
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontfamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = 0.5 * (cols - mw) - mx;
    const ty = 0.5 * (rows - mh) - my;
    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    console.log(`${typeData.length} pixels`);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';
    // context.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);
      context.font = `${cell * 2}px ${fontfamily}`;
      if (Math.random() < 0.1) {
        context.font = `${cell * 6}px ${fontfamily}`;
      }

      // context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      context.fillStyle = 'white';

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.fillText(glyph, 0, 0);
      context.restore();
    }
  };
};

const getGlyph = v => {
  if (v < 50) return '';
  const glyphs = 'fail';
  const index = Math.floor((v / 255) * (glyphs.length - 1));
  // if (Math.random() < 0.1)
  return glyphs[Math.floor(Math.random() * glyphs.length)];
  // return glyphs[index];
};

document.addEventListener('keydown', e => {
  // text = e.key.toUpperCase();
  text = e.key;
  console.log(`Key pressed: ${text}`);
  manager.render();
});

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};
start();
