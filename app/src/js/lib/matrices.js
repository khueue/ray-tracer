const numbers = require('./numbers');
const tuples = require('./tuples');

/**
 * General purpose matrix constructor supporting two forms:
 *
 * Literal:
 * - Matrix([[...], ...])
 *
 * Dimensions and init value:
 * - Matrix(4, 1, 0.0)
 *
 * For efficiency, use the MatrixXX functions where applicable.
 */
function Matrix(rows, cols, init = NaN) {
	if (typeof rows === 'object') {
		// Assume it's an Array representing a matrix and just return it.
		// Note that this does not make a copy.
		return rows;
	} else {
		// Construct new matrix from dimensions and init value.
		let m = new Array(rows);
		for (let row = 0; row < rows; ++row) {
			m[row] = new Array(cols).fill(init);
		}
		return m;
	}
}

// Currently only supports 4x4.
// function MatrixZero() {
// 	return [
// 		[0.0, 0.0, 0.0, 0.0],
// 		[0.0, 0.0, 0.0, 0.0],
// 		[0.0, 0.0, 0.0, 0.0],
// 		[0.0, 0.0, 0.0, 0.0],
// 	];
// }

function Matrix22(m) {
	// Note that this will not create new objects.
	return m;
}

function Matrix33(m) {
	// Note that this will not create new objects.
	return m;
}

function Matrix44(m) {
	// Note that this will not create new objects.
	return m;
}

function equal(a, b) {
	if (a.length !== b.length) {
		return false;
	} else {
		const rows = a.length;
		const cols = a[0].length;
		for (let row = 0; row < rows; ++row) {
			for (let col = 0; col < cols; ++col) {
				if (!numbers.equal(a[row][col], b[row][col])) {
					return false;
				}
			}
		}
		return true;
	}
}

/**
 * Only supports 4-col x 4-row matrices.
 */
function mult(a, b) {
	const rows = a.length; // Rows of a.
	const cols = b[0].length; // Cols of b.

	let m = Matrix(rows, cols, 0.0);

	for (let row = 0; row < rows; ++row) {
		for (let col = 0; col < cols; ++col) {
			m[row][col] =
				a[row][0] * b[0][col] +
				a[row][1] * b[1][col] +
				a[row][2] * b[2][col] +
				a[row][3] * b[3][col];
		}
	}

	return m;
}

function tupleAsMatrix(t) {
	// prettier-ignore
	return Matrix([
		[t.x],
		[t.y],
		[t.z],
		[t.w],
	]);
}

/**
 * Only supports 4x1 matrices.
 */
function matrixAsTuple(m) {
	return tuples.Tuple(m[0][0], m[1][0], m[2][0], m[3][0]);
}

function multTuple(a, t) {
	const b = tupleAsMatrix(t);
	const m = mult(a, b);
	return matrixAsTuple(m);
}

module.exports = {
	Matrix22,
	Matrix33,
	Matrix44,
	equal,
	mult,
	multTuple,
};
