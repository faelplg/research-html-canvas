'use strict';

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

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

		for (let i = 0; i < agents.length; i++) {
			const agent = agents[i];
			for (let j = i + 1; j < agents.length; j++) {
				const other = agents[j];
				const distance = agent.position.getDistanceTo(other.position);
				if (distance > 200) continue;
				context.lineWidth = math.mapRange(distance, 0, 200, 10, 0);

				context.beginPath();
				context.moveTo(agent.position.x, agent.position.y);
				context.lineTo(other.position.x, other.position.y);
				context.stroke();
			}
		}

		agents.forEach((agent) => {
			// For each agent:
			agent.update(); // Update its position
			agent.draw(context); // Draw it on the canvas
			if (Math.random() < 0.5) {
				agent.wrap(width, height);
			} else {
				agent.bounce(width, height);
			}
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

	getDistanceTo(v) {
		// Calculate the distance to another vector
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy); // Return the Euclidean distance
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

	wrap(width, height) {
		// Wrap the agent's position around the canvas edges
		if (this.position.x < 0) {
			this.position.x = width; // Wrap to right edge
		} else if (this.position.x > width) {
			this.position.x = 0; // Wrap to left edge
		}
		if (this.position.y < 0) {
			this.position.y = height; // Wrap to bottom edge
		} else if (this.position.y > height) {
			this.position.y = 0; // Wrap to top edge
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
		context.lineWidth = 4;

		context.beginPath(); // Start a new path
		context.arc(0, 0, this.radius, 0, Math.PI * 2); // Draw a circle
		context.fill(); // Fill the circle
		context.stroke(); // Stroke the circle outline

		context.restore(); // Restore the previous drawing state
	}
}
