const colors = require('./colors');

function canvas(width, height) {
	let pixels = [];
	for (let x = 0; x < width; ++x) {
		pixels[x] = [];
		for (let y = 0; y < height; ++y) {
			pixels[x][y] = colors.color(0, 0, 0);
		}
	}
	return {
		width,
		height,
		pixels,
	};
}

module.exports = {
	canvas,
};
