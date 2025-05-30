const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [1080, 1080],
};

let text = 'F';
let fontSize = 1200;
let fontfamily = 'serif';

const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.fillStyle = 'black';
		context.font = `${fontSize}px ${fontfamily}`;
		context.textBaseline = 'top';
		// context.textAlign = 'center';

		const metrics = context.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh =
			metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		const x = 0.5 * (width - mw) - mx;
		const y = 0.5 * (height - mh) - my;
		context.save();
		context.translate(x, y);

		context.beginPath();
		context.rect(mx, my, mw, mh);
		context.stroke();

		context.fillText(text, 0, 0);
		context.restore();
	};
};

document.addEventListener('keyup', (e) => {
	text = e.key.toUpperCase();
	console.log(`Key pressed: ${text}`);
	manager.render();
});

const start = async () => {
	manager = await canvasSketch(sketch, settings);
};
start();
