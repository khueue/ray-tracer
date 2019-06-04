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

module.exports = {
	equalFloats,
	equalTuples,
	tuple,
	point,
	vector,
	isPoint,
	isVector,
};
