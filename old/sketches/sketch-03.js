'use strict';
/**
 * @fileoverview
 * This project creates an animated sketch using the `canvas-sketch` framework, where multiple agents (circles)
 * move around a 2D canvas, bouncing off the edges. Each agent has a random position, velocity, radius, and
 * line width, resulting in a dynamic and visually interesting animation. The main strategies used include:
 * - Object-oriented design with `Agent` and `Vector` classes to encapsulate agent behavior and position.
 * - Randomization for initial agent properties and drawing styles to enhance visual diversity.
 * - Animation loop with per-frame updates and rendering, leveraging the `canvas-sketch` animation system.
 * - Edge detection and velocity reversal to simulate bouncing behavior.
 */

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Define the settings for the sketch, including canvas size and animation flag
const settings = {
	dimensions: [1080, 1080], // Set canvas width and height
	animate: true, // Enable animation
};

// Define the main sketch function
const sketch = ({ context, width, height }) => {
	const agents = []; // Create an array to hold Agent instances
	for (let i = 0; i < 40; i++) {
		// Loop to create 40 agents
		const x = random.range(0, width); // Random x position within canvas
		const y = random.range(0, height); // Random y position within canvas
		agents.push(new Agent(x, y)); // Add new Agent to the array
	}

	// Return the render function that will be called every frame
	return ({ context, width, height }) => {
		context.fillStyle = 'white'; // Set background color to white
		context.fillRect(0, 0, width, height); // Fill the entire canvas

		agents.forEach((agent) => {
			// For each agent:
			agent.update(); // Update its position
			agent.draw(context); // Draw it on the canvas
			agent.bounce(width, height); // Make it bounce off the edges
		});
	};
};

// Start the sketch with the defined settings
canvasSketch(sketch, settings);

// Define a simple 2D vector class
class Vector {
	constructor(x, y) {
		this.x = x; // X coordinate
		this.y = y; // Y coordinate
	}
}

// Define the Agent class representing a moving circle
class Agent {
	constructor(x, y) {
		this.position = new Vector(x, y); // Agent's position as a Vector
		this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1)); // Random velocity
		this.radius = random.range(4, 12); // Random radius for the agent
	}

	// Reverse velocity if agent hits canvas boundaries
	bounce(width, height) {
		if (this.position.x < 0 || this.position.x > width) {
			this.velocity.x *= -1; // Reverse x velocity
		}
		if (this.position.y < 0 || this.position.y > height) {
			this.velocity.y *= -1; // Reverse y velocity
		}
	}

	// Update agent's position based on its velocity
	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	// Draw the agent as a circle on the canvas
	draw(context) {
		context.save(); // Save the current drawing state
		context.translate(this.position.x, this.position.y); // Move to agent's position
		context.lineWidth = random.range(4, 8); // Set a random line width

		context.beginPath(); // Start a new path
		context.arc(0, 0, this.radius, 0, Math.PI * 2); // Draw a circle
		context.fill(); // Fill the circle
		context.stroke(); // Stroke the circle outline

		context.restore(); // Restore the previous drawing state
	}
}
