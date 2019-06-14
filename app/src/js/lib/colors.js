const numbers = require('./numbers');

function color(red, green, blue) {
	return {
		red,
		green,
		blue,
	};
}

function add(a, b) {
	return color(a.red + b.red, a.green + b.green, a.blue + b.blue);
}

function sub(a, b) {
	return color(a.red - b.red, a.green - b.green, a.blue - b.blue);
}

function mult(a, b) {
	return color(a.red * b.red, a.green * b.green, a.blue * b.blue);
}

function equal(a, b) {
	return (
		numbers.equal(a.red, b.red) &&
		numbers.equal(a.green, b.green) &&
		numbers.equal(a.blue, b.blue)
	);
}

module.exports = {
	color,
	add,
	sub,
	mult,
	equal,
};
