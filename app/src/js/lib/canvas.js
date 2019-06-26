const colors = require('./colors');

function Canvas(width, height) {
	let pixels = [];
	for (let x = 0; x < width; ++x) {
		pixels[x] = [];
		for (let y = 0; y < height; ++y) {
			pixels[x][y] = new colors.Color(0.0, 0.0, 0.0);
		}
	}
	return {
		width,
		height,
		pixels,
	};
}

function writePixel(canvas, x, y, color) {
	canvas.pixels[x][y] = color;
}

function pixelAt(canvas, x, y) {
	return canvas.pixels[x][y];
}

module.exports = {
	Canvas,
	writePixel,
	pixelAt,
};
