const numbers = require('./numbers');

function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
}

Color.prototype.add = function(b) {
	return new Color(
		this.red + b.red,
		this.green + b.green,
		this.blue + b.blue
	);
};

Color.prototype.subtract = function(b) {
	return new Color(
		this.red - b.red,
		this.green - b.green,
		this.blue - b.blue
	);
};

Color.prototype.multiply = function(b) {
	return new Color(
		this.red * b.red,
		this.green * b.green,
		this.blue * b.blue
	);
};

Color.prototype.equal = function(b) {
	return (
		numbers.equal(this.red, b.red) &&
		numbers.equal(this.green, b.green) &&
		numbers.equal(this.blue, b.blue)
	);
};

module.exports = {
	Color,
};
