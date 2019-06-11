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
};
