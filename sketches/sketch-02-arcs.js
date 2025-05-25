'use strict';
/**
 * @fileoverview
 * Generates a generative art sketch using canvas-sketch, arranging rectangles and arcs in a circular pattern.
 * The sketch leverages trigonometric functions (sine and cosine) to position each shape evenly around a central point,
 * effectively mapping each element to a point on a circle. Rectangles are randomly scaled and rotated to add visual variety,
 * while arcs are drawn with randomized radii and angles to create a dynamic, abstract composition.
 * Utilizes canvas-sketch-util for mathematical operations and randomness, resulting in a visually engaging, algorithmically generated artwork.
 */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
	dimensions: [1080, 1080],
};

const sketch = () => {
	return ({ context, width, height }) => {
		// Fill background
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.fillStyle = 'black';

		const cx = 0.5 * width; // Canvas center X
		const cy = 0.5 * height; // Canvas center Y
		const w = 0.01 * width; // Rectangle width
		const h = 0.1 * height; // Rectangle height

		const num = 48; // Number of rectangles
		const radius = 0.3 * width; // Circle radius

		for (let i = 0; i < num; i++) {
			const slice = math.degToRad(360 / num); // Angle per slice
			const angle = slice * i;

			const x = cx + Math.sin(angle) * radius;
			const y = cy + Math.cos(angle) * radius;

			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			// Randomly scale rectangle in both x and y directions
			context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

			context.beginPath();
			// Draw rectangle centered at (0, 0)
			context.rect(0.5 * -w, random.range(0, 0.5 * -h), w, h);
			context.fill();
			context.restore();

			context.save();
			context.translate(cx, cy);
			context.rotate(-angle);

			context.lineWidth = random.range(5, 20);

			context.beginPath();
			// Draw arc with random radius and angles
			context.arc(
				0,
				0,
				radius * random.range(0.7, 1.3),
				random.range(1, -8) * slice,
				random.range(1, 5) * slice,
			);
			context.stroke();

			context.restore();
		}
	};
};

canvasSketch(sketch, settings);
