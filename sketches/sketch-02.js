const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [1080, 1080],
};

const degToRad = (degrees) => {
	return (degrees * Math.PI) / 180;
};

const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.fillStyle = 'black';

		const cx = 0.5 * width;
		const cy = 0.5 * height;
		const w = 0.01 * width;
		const h = 0.1 * height;

		const num = 12; // number of rectangles
		const radius = 0.3 * width; // radius from the center
		let x, y;

		for (let i = 0; i < num; i++) {
			const slice = degToRad(360 / num);
			const angle = slice * i;

			x = cx + Math.sin(angle) * radius; // calculate x position
			y = cy + Math.cos(angle) * radius; // calculate y position

			context.save();
			context.translate(x, y); // new (0,0)
			context.rotate(-angle); // rotate 45 degrees

			context.beginPath();
			context.rect(0.5 * -w, 0.5 * -h, w, h); // center the rectangle relative to the new (0,0)
			context.fill();
			context.restore();
		}

		/* AI example */
		// for (let i = 0; i < num; i++) {
		// 	const angle = (i / num) * Math.PI * 2;
		// 	const xOffset = Math.cos(angle) * 0.4 * width;
		// 	const yOffset = Math.sin(angle) * 0.4 * height;

		// 	context.save();
		// 	context.translate(x + xOffset, y + yOffset); // new (0,0)
		// 	context.rotate(degToRad((i / num) * 360)); // rotate based on index

		// 	context.beginPath();
		// 	context.rect(0.5 * -w, 0.5 * -h, w, h); // center the rectangle relative to the new (0,0)
		// 	context.fill();
		// 	context.restore();
		// }

		/* Initial example */
		// context.save();
		// context.translate(x, y); // new (0,0)
		// context.rotate(degToRad(45)); // rotate 45 degrees

		// context.beginPath();
		// context.rect(0.5 * -w, 0.5 * -h, w, h); // center the rectangle relative to the new (0,0)
		// context.fill();
		// context.restore();
	};
};

canvasSketch(sketch, settings);
