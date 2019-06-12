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

module.exports = {
	color,
	add,
	sub,
	mult,
};
