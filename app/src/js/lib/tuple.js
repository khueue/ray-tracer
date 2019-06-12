const EPSILON = 0.00001;

function equalFloats(a, b) {
	return Math.abs(a - b) < EPSILON;
}

function equalTuples(a, b) {
	return (
		equalFloats(a.x, b.x) &&
		equalFloats(a.y, b.y) &&
		equalFloats(a.z, b.z) &&
		equalFloats(a.w, b.w)
	);
}

function tuple(x, y, z, w) {
	return {
		x,
		y,
		z,
		w,
	};
}

function point(x, y, z) {
	return tuple(x, y, z, 1.0);
}

function vector(x, y, z) {
	return tuple(x, y, z, 0.0);
}

function isPoint(a) {
	return equalFloats(a.w, 1.0);
}

function isVector(a) {
	return equalFloats(a.w, 0.0);
}

function add(a, b) {
	return tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

function sub(a, b) {
	return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

function mult(a, s) {
	return tuple(a.x * s, a.y * s, a.z * s, a.w * s);
}

function div(a, s) {
	return tuple(a.x / s, a.y / s, a.z / s, a.w / s);
}

function negate(a) {
	return tuple(-a.x, -a.y, -a.z, -a.w);
}

function magnitude(a) {
	return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
}

function normalize(a) {
	const mag = magnitude(a);
	return tuple(a.x / mag, a.y / mag, a.z / mag, a.w / mag);
}

function dot(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

function cross(a, b) {
	return vector(
		a.y * b.z - a.z * b.y,
		a.z * b.x - a.x * b.z,
		a.x * b.y - a.y * b.x,
	);
}

function color(red, green, blue) {
	return {
		red,
		green,
		blue,
	};
}

function colorAdd(a, b) {
	return color(a.red + b.red, a.green + b.green, a.blue + b.blue);
}

function colorSub(a, b) {
	return color(a.red - b.red, a.green - b.green, a.blue - b.blue);
}

function colorMult(a, b) {
	return color(a.red * b.red, a.green * b.green, a.blue * b.blue);
}

module.exports = {
	equalFloats,
	equalTuples,
	tuple,
	point,
	vector,
	isPoint,
	isVector,
	add,
	sub,
	mult,
	div,
	negate,
	magnitude,
	normalize,
	dot,
	cross,
	color,
	colorAdd,
	colorSub,
	colorMult,
};
