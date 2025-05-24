const canvasSketch = require('canvas-sketch'); // Import the canvas-sketch library
const math = require('canvas-sketch-util/math'); // Import math utilities from canvas-sketch
const random = require('canvas-sketch-util/random'); // Import random utilities from canvas-sketch

const settings = {
	dimensions: [1080, 1080], // Set the canvas dimensions to 1080x1080 pixels
};

const sketch = () => {
	return ({ context, width, height }) => {
		// Main drawing function with context, width, and height
		context.fillStyle = 'white'; // Set fill color to white
		context.fillRect(0, 0, width, height); // Fill the entire canvas with white

		context.fillStyle = 'black'; // Set fill color to black for shapes

		const cx = 0.5 * width; // X coordinate of canvas center
		const cy = 0.5 * height; // Y coordinate of canvas center
		const w = 0.01 * width; // Rectangle width (1% of canvas width)
		const h = 0.1 * height; // Rectangle height (10% of canvas height)

		const num = 12; // Number of rectangles to draw
		const radius = 0.3 * width; // Distance from center to place rectangles
		let x, y; // Variables for rectangle positions

		for (let i = 0; i < num; i++) {
			// Loop through each rectangle
			const slice = math.degToRad(360 / num); // Angle between each rectangle in radians
			const angle = slice * i; // Current angle for this rectangle

			x = cx + Math.sin(angle) * radius; // Calculate x position on the circle
			y = cy + Math.cos(angle) * radius; // Calculate y position on the circle

			context.save(); // Save the current context state
			context.translate(x, y); // Move origin to (x, y)
			context.rotate(-angle); // Rotate context by -angle
			context.scale(random.range(1, 3), 1); // Randomly scale the rectangle in x direction

			context.beginPath(); // Start a new path
			context.rect(0.5 * -w, 0.5 * -h, w, h); // Draw rectangle centered at (0,0)
			context.fill(); // Fill the rectangle
			context.restore(); // Restore the context to previous state
		}
	};
};

canvasSketch(sketch, settings); // Run the sketch with the specified settings
