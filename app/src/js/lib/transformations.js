const matrices = require('./matrices');

function translation(x, y, z) {
	return new matrices.Matrix([
		[1, 0, 0, x],
		[0, 1, 0, y],
		[0, 0, 1, z],
		[0, 0, 0, 1],
	]);
}

function scaling(x, y, z) {
	return new matrices.Matrix([
		[x, 0, 0, 0],
		[0, y, 0, 0],
		[0, 0, z, 0],
		[0, 0, 0, 1],
	]);
}

function rotationX(r) {
	const cosR = Math.cos(r);
	const sinR = Math.sin(r);
	return new matrices.Matrix([
		[1, 0, 0, 0],
		[0, cosR, -sinR, 0],
		[0, sinR, cosR, 0],
		[0, 0, 0, 1],
	]);
}

module.exports = {
	translation,
	scaling,
	rotationX,
};
