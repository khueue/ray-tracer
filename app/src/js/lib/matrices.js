const numbers = require('./numbers');
const tuples = require('./tuples');

/**
 * General purpose matrix constructor supporting two forms:
 *
 * Literal:
 * - new Matrix([[...], ...])
 *
 * Dimensions and init value:
 * - new Matrix(4, 1, 0.0)
 */
function Matrix(rows, cols, init = NaN) {
	const self = this;
	if (Array.isArray(rows)) {
		// Assume rows is an array representing a matrix literal.
		self.numRows = rows.length;
		self.numCols = rows[0].length;
		for (let row = 0; row < self.numRows; ++row) {
			self[row] = rows[row];
		}
	} else {
		// Construct new matrix from dimensions and init value.
		self.numRows = rows;
		self.numCols = cols;
		for (let row = 0; row < self.numRows; ++row) {
			self[row] = new Array(self.numCols).fill(init);
		}
	}
}

const IDENTITY_44 = new Matrix([
	[1.0, 0.0, 0.0, 0.0],
	[0.0, 1.0, 0.0, 0.0],
	[0.0, 0.0, 1.0, 0.0],
	[0.0, 0.0, 0.0, 1.0],
]);

function equal(a, b) {
	if (a.numRows !== b.numRows) {
		return false;
	} else {
		for (let row = 0; row < a.numRows; ++row) {
			for (let col = 0; col < a.numCols; ++col) {
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
	// Rows of a, columns of b.
	let m = new Matrix(a.numRows, b.numCols, 0.0);

	for (let row = 0; row < a.numRows; ++row) {
		for (let col = 0; col < b.numCols; ++col) {
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
	return new Matrix([
		[t.x], // prettier-ignore
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

function transpose(m) {
	let trans = new Matrix(m.numRows, m.numCols, 0.0);

	for (let row = 0; row < m.numRows; ++row) {
		for (let col = 0; col < m.numCols; ++col) {
			trans[col][row] = m[row][col];
		}
	}

	return trans;
}

function determinant(m) {
	if (m.numRows === 2) {
		return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	} else {
		let det = 0.0;
		for (let col = 0; col < m.numCols; ++col) {
			det += m[0][col] * cofactor(m, 0, col);
		}
		return det;
	}
}

function submatrix(m, rowToSkip, colToSkip) {
	// Submatrix is always one smaller than the input.
	let sub = new Matrix(m.numRows - 1, m.numCols - 1, 0.0);

	let subRow = 0;
	for (let row = 0; row < m.numRows; ++row, ++subRow) {
		if (row === rowToSkip) {
			// Avoid making a "gap" row in the result matrix.
			--subRow;
			continue;
		}
		let subCol = 0;
		for (let col = 0; col < m.numCols; ++col, ++subCol) {
			if (col === colToSkip) {
				// Avoid making a "gap" column in the result matrix.
				--subCol;
				continue;
			}
			sub[subRow][subCol] = m[row][col];
		}
	}

	return sub;
}

function minor(m, rowToSkip, colToSkip) {
	const sub = submatrix(m, rowToSkip, colToSkip);
	return determinant(sub);
}

function cofactor(m, rowToSkip, colToSkip) {
	const min = minor(m, rowToSkip, colToSkip);
	if ((rowToSkip + colToSkip) % 2 === 1) {
		return -min;
	} else {
		return min;
	}
}

function invertible(m) {
	return !numbers.equal(determinant(m), 0.0);
}

function inverse(m) {
	const det = determinant(m);

	// Reimplement invertible() here, to avoid double computation.
	if (numbers.equal(det, 0.0)) {
		throw new Error('inverse() requires invertible matrix');
	}

	let inv = new Matrix(m.numRows, m.numCols, 0.0);

	for (let row = 0; row < m.numRows; ++row) {
		for (let col = 0; col < m.numCols; ++col) {
			const cof = cofactor(m, row, col);
			inv[col][row] = cof / det; // Transpose on the fly: [col][row].
		}
	}

	return inv;
}

module.exports = {
	IDENTITY_44,
	Matrix,
	equal,
	mult,
	multTuple,
	transpose,
	determinant,
	submatrix,
	minor,
	cofactor,
	invertible,
	inverse,
};
