const colors = require('./colors');

const COLOR_BLACK = new colors.Color(0.0, 0.0, 0.0);

function Canvas(width, height) {
	this.width = width;
	this.height = height;
	for (let x = 0; x < width; ++x) {
		this[x] = Array(height).fill(COLOR_BLACK);
	}
}

module.exports = {
	Canvas,
};
