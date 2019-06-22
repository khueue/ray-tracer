const numbers = require('./numbers');

function Tuple(x, y, z, w) {
	return {
		x,
		y,
		z,
		w,
	};
}

function Point(x, y, z) {
	return Tuple(x, y, z, 1.0);
}

function Vector(x, y, z) {
	return Tuple(x, y, z, 0.0);
}

function equal(a, b) {
	return (
		numbers.equal(a.x, b.x) &&
		numbers.equal(a.y, b.y) &&
		numbers.equal(a.z, b.z) &&
		numbers.equal(a.w, b.w)
	);
}

function isPoint(a) {
	return numbers.equal(a.w, 1.0);
}

function isVector(a) {
	return numbers.equal(a.w, 0.0);
}

function add(a, b) {
	return Tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

function sub(a, b) {
	return Tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

function mult(a, s) {
	return Tuple(a.x * s, a.y * s, a.z * s, a.w * s);
}

function div(a, s) {
	return Tuple(a.x / s, a.y / s, a.z / s, a.w / s);
}

function negate(a) {
	return Tuple(-a.x, -a.y, -a.z, -a.w);
}

function magnitude(a) {
	return Math.sqrt(
		a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w
	);
}

function normalize(a) {
	const mag = magnitude(a);
	return Tuple(a.x / mag, a.y / mag, a.z / mag, a.w / mag);
}

function dot(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

function cross(a, b) {
	return Vector(
		a.y * b.z - a.z * b.y,
		a.z * b.x - a.x * b.z,
		a.x * b.y - a.y * b.x
	);
}

module.exports = {
	Tuple,
	Point,
	Vector,
	equal,
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
};
