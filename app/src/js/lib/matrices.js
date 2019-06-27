const numbers = require('./numbers');
const tuples = require('./tuples');

/**
 * Matrix constructor supporting two forms:
 *
 * Literal:
 * - new Matrix([[...], ...])
 *
 * Dimensions and init value:
 * - new Matrix(4, 1, 0.0)
 */
function Matrix(rows, cols, init = NaN) {
	if (Array.isArray(rows)) {
		// Assume rows is an array representing a matrix literal.
		const m = rows;
		this.numRows = m.length;
		this.numCols = m[0].length;
		for (let row = 0; row < this.numRows; ++row) {
			// NOTE: This only makes references to existing rows.
			this[row] = m[row];
		}
	} else {
		// Construct new matrix from dimensions and init value.
		this.numRows = rows;
		this.numCols = cols;
		for (let row = 0; row < this.numRows; ++row) {
			this[row] = new Array(this.numCols).fill(init);
		}
	}
}

Matrix.prototype.equal = function(b) {
	if (!this.equalSize(b)) {
		return false;
	} else {
		for (let row = 0; row < this.numRows; ++row) {
			for (let col = 0; col < this.numCols; ++col) {
				if (!numbers.equal(this[row][col], b[row][col])) {
					return false;
				}
			}
		}
		return true;
	}
};

Matrix.prototype.equalSize = function(b) {
	return this.numRows === b.numRows && this.numCols === b.numCols;
};

/**
 * Only supports 4-col x 4-row matrices.
 */
Matrix.prototype.multiply = function(b) {
	if (tuples.isTuple(b)) {
		return this.multiplyByTuple(b);
	}

	// Result is sized as rows of this, columns of b.
	let c = new Matrix(this.numRows, b.numCols, 0);

	for (let row = 0; row < this.numRows; ++row) {
		for (let col = 0; col < b.numCols; ++col) {
			c[row][col] =
				this[row][0] * b[0][col] +
				this[row][1] * b[1][col] +
				this[row][2] * b[2][col] +
				this[row][3] * b[3][col];
		}
	}

	return c;
};

Matrix.prototype.multiplyByTuple = function(t) {
	const b = tupleToMatrix(t);
	const c = this.multiply(b);
	return c.toTuple();
};

Matrix.prototype.transpose = function() {
	let trans = new Matrix(this.numRows, this.numCols, 0);

	for (let row = 0; row < this.numRows; ++row) {
		for (let col = 0; col < this.numCols; ++col) {
			trans[col][row] = this[row][col];
		}
	}

	return trans;
};

Matrix.prototype.determinant = function() {
	if (this.numRows === 2) {
		return this[0][0] * this[1][1] - this[0][1] * this[1][0];
	} else {
		let det = 0;
		for (let col = 0; col < this.numCols; ++col) {
			det += this[0][col] * this.cofactor(0, col);
		}
		return det;
	}
};

Matrix.prototype.submatrix = function(rowToSkip, colToSkip) {
	// Submatrix is always one smaller than the input.
	let sub = new Matrix(this.numRows - 1, this.numCols - 1, 0);

	for (let row = 0, subRow = 0; row < this.numRows; ++row, ++subRow) {
		if (row === rowToSkip) {
			// Avoid making a "gap" row in the result matrix.
			--subRow;
			continue;
		}
		for (let col = 0, subCol = 0; col < this.numCols; ++col, ++subCol) {
			if (col === colToSkip) {
				// Avoid making a "gap" column in the result matrix.
				--subCol;
				continue;
			}
			sub[subRow][subCol] = this[row][col];
		}
	}

	return sub;
};

Matrix.prototype.minor = function(rowToSkip, colToSkip) {
	const sub = this.submatrix(rowToSkip, colToSkip);
	return sub.determinant();
};

Matrix.prototype.cofactor = function(rowToSkip, colToSkip) {
	const minor = this.minor(rowToSkip, colToSkip);
	if ((rowToSkip + colToSkip) % 2 === 1) {
		return -minor;
	} else {
		return minor;
	}
};

Matrix.prototype.invertible = function() {
	return !numbers.equal(this.determinant(), 0);
};

Matrix.prototype.inverse = function() {
	const det = this.determinant();

	// Reimplement invertible() here, to avoid double computation.
	if (numbers.equal(det, 0)) {
		throw new Error('inverse() requires invertible matrix');
	}

	let inv = new Matrix(this.numRows, this.numCols, 0);

	for (let row = 0; row < this.numRows; ++row) {
		for (let col = 0; col < this.numCols; ++col) {
			const cofactor = this.cofactor(row, col);
			inv[col][row] = cofactor / det; // Transpose on the fly: [col][row].
		}
	}

	return inv;
};

/**
 * Only supports 4x1 matrices.
 */
Matrix.prototype.toTuple = function() {
	return new tuples.Tuple(this[0][0], this[1][0], this[2][0], this[3][0]);
};

function tupleToMatrix(t) {
	return new Matrix([
		[t.x], // prettier-ignore
		[t.y],
		[t.z],
		[t.w],
	]);
}

const IDENTITY_44 = Object.freeze(
	new Matrix(
		Object.freeze([
			Object.freeze([1, 0, 0, 0]),
			Object.freeze([0, 1, 0, 0]),
			Object.freeze([0, 0, 1, 0]),
			Object.freeze([0, 0, 0, 1]),
		])
	)
);

module.exports = {
	IDENTITY_44,
	Matrix,
	tupleToMatrix,
};
