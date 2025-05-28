## Settings

Dimensions: 1080x1080

## Running

New canvas-sketch project:
`canvas-sketch sketch-name --output=output-folder/sub-folder --new --open --stream`

## Utils

```javascript
// Converts an angle from degrees to radians.
const degToRad = (nDeg) => {
	return (nDeg * Math.PI) / 180;
};
```

```javascript
// Generate a random number between min and max
const randomRange = (min, max) => {
	return Math.random() * (max - min) + min;
};
```
