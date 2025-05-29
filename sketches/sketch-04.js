const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
	dimensions: [1080, 1080],
	animate: true,
};

const params = {
	cols: 10,
	rows: 10,
	scaleMin: 1,
	scaleMax: 30,
	freq: 0.001,
	amp: 0.2,
	animate: true,
	frame: 0,
	lineCap: 'butt', // 'butt', 'round', 'square'
};

const sketch = () => {
	return ({ context, width, height, frame }) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		const cols = params.cols;
		const rows = params.rows;
		const numCells = cols * rows;
		const gridWidth = 0.8 * width;
		const gridHeight = 0.8 * height;
		const cellWidth = gridWidth / cols;
		const cellHeight = gridHeight / rows;
		const marginX = 0.5 * (width - gridWidth);
		const marginY = 0.5 * (height - gridHeight);

		// for (let i = 0; i < numCells; i++) {
		// 	const col = i % cols;
		// 	const row = Math.floor(i / cols);
		// 	const x = marginX + col * cellWidth;
		// 	const y = marginY + row * cellHeight;

		// 	context.strokeStyle = 'black';
		// 	context.lineWidth = 4;
		// 	context.strokeRect(x, y, cellWidth, cellHeight);

		// 	context.save();

		// 	context.translate(0.5 * cellWidth, 0.5 * cellHeight);
		// 	context.beginPath();
		// 	context.arc(x, y, 8, 0, Math.PI * 2);
		// 	context.fillStyle = 'red';
		// 	context.fill();

		// 	context.fillStyle = 'black';
		// 	context.font = 'bold 24px Arial';
		// 	context.textAlign = 'center';
		// 	context.textBaseline = 'middle';
		// 	context.fillText(`Cell ${i + 1}`, x, y);

		// 	context.restore();
		// }

		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cellWidth;
			const y = row * cellHeight;
			const w = 0.8 * cellWidth;
			const h = 0.8 * cellHeight;

			const f = params.animate ? frame : params.frame;

			// const n = random.noise2D(x + frame * 10, y, params.freq); // Adjust the frequency to control the noise pattern
			const n = random.noise3D(x, y, f * 10, params.freq); // Adjust the frequency to control the noise pattern
			// n goest from -1 to 1, so we can use it to control the angle and scale
			const angle = n * Math.PI * params.amp;
			// const scale = ((n + 1) / 2) * 30; // Map to an interval [0,1]
			// const scale = (n * 0.5 + 0.5) * 30; // Map to an interval [0,1]
			const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax); // Map to an interval [1,30]

			context.save();

			context.translate(x, y);
			// context.beginPath();
			// context.arc(0, 0, 8, 0, Math.PI * 2);
			// context.fillStyle = 'red';
			// context.fill();

			context.translate(marginX, marginY);
			// context.beginPath();
			// context.arc(0, 0, 8, 0, Math.PI * 2);
			// context.fillStyle = 'blue';
			// context.fill();

			context.translate(0.5 * cellWidth, 0.5 * cellHeight);
			// context.beginPath();
			// context.arc(0, 0, 8, 0, Math.PI * 2);
			// context.fillStyle = 'green';
			// context.fill();

			context.rotate(angle);

			context.lineWidth = scale;
			context.lineCap = params.lineCap;

			context.beginPath();
			context.moveTo(-0.5 * w, 0);
			context.lineTo(0.5 * h, 0);
			context.stroke();

			context.restore();
		}
	};
};

const createPane = () => {
	const pane = new Tweakpane.Pane();
	let folder = pane.addFolder({
		title: 'Grid',
	});

	folder.addInput(params, 'lineCap', {
		options: {
			butt: 'butt',
			round: 'round',
			square: 'square',
		},
	});
	folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
	folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

	folder = pane.addFolder({ title: 'Noise' });
	folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
	folder.addInput(params, 'amp', { min: 0, max: 1 });
	folder.addInput(params, 'animate');
	folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);
