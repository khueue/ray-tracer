import * as numbers from './numbers';
import * as tuples from './tuples';

/**
 * Matrix constructor supporting two forms:
 *
 * Literal:
 * - new Matrix([[...], ...])
 *
 * Dimensions and init value:
 * - new Matrix(4, 1, 0.0)
 */
export class Matrix {
	numRows: number;
	numCols: number;

	constructor(m: number[][], _?, __?);
	constructor(rows: number, cols: number, init?: any);
	constructor(rows: any, cols: any, init: any = 0) {
		if (Array.isArray(rows)) {
			const m = rows;
			this.numRows = m.length;
			this.numCols = m[0].length;
			for (let row = 0; row < this.numRows; ++row) {
				this[row] = [];
				for (let col = 0; col < this.numCols; ++col) {
					this[row][col] = m[row][col];
				}
			}
		} else {
			this.numRows = rows;
			this.numCols = cols;
			for (let row = 0; row < this.numRows; ++row) {
				this[row] = new Array(this.numCols).fill(init);
			}
		}
	}

	equal(b: Matrix) {
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
	}

	equalSize(b: Matrix) {
		return this.numRows === b.numRows && this.numCols === b.numCols;
	}

	multiply(b: tuples.Tuple): tuples.Tuple;
	multiply(b: Matrix): Matrix;
	multiply(b: any) {
		if (b instanceof tuples.Tuple) {
			return this.multiplyByTuple(b);
		}

		// Result is sized as: rows of this, columns of b.
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
	}

	multiplyByTuple(t: tuples.Tuple) {
		const b = tupleToMatrix(t);
		const c = this.multiply(b);
		return c.toTuple();
	}

	transpose() {
		let trans = new Matrix(this.numRows, this.numCols, 0);

		for (let row = 0; row < this.numRows; ++row) {
			for (let col = 0; col < this.numCols; ++col) {
				trans[col][row] = this[row][col];
			}
		}

		return trans;
	}

	determinant() {
		if (this.numRows === 2) {
			return this[0][0] * this[1][1] - this[0][1] * this[1][0];
		} else {
			let det = 0;
			for (let col = 0; col < this.numCols; ++col) {
				det += this[0][col] * this.cofactor(0, col);
			}
			return det;
		}
	}

	submatrix(rowToSkip: number, colToSkip: number) {
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
	}

	minor(rowToSkip: number, colToSkip: number) {
		const sub = this.submatrix(rowToSkip, colToSkip);
		return sub.determinant();
	}

	cofactor(rowToSkip: number, colToSkip: number) {
		const minor = this.minor(rowToSkip, colToSkip);
		if ((rowToSkip + colToSkip) % 2 === 1) {
			return -minor;
		} else {
			return minor;
		}
	}

	invertible() {
		return !numbers.equal(this.determinant(), 0);
	}

	inverse() {
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
	}

	/**
	 * Only supports 4x1 matrices.
	 */
	toTuple() {
		return new tuples.Tuple(this[0][0], this[1][0], this[2][0], this[3][0]);
	}
}

export function tupleToMatrix(t: tuples.Tuple) {
	return new Matrix([
		[t.x], // prettier-ignore
		[t.y],
		[t.z],
		[t.w],
	]);
}

export const IDENTITY_44 = new Matrix([
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1],
]);
