import * as test from 'tape';

import * as matrices from './matrices';
import * as numbers from './numbers';
import * as tuples from './tuples';

test('construct 2x2 matrix', function(t) {
	const m = new matrices.Matrix([
		[-3, 5], // prettier-ignore
		[1, -2],
	]);

	t.ok(numbers.equal(m[0][0], -3));
	t.ok(numbers.equal(m[0][1], 5));
	t.ok(numbers.equal(m[1][0], 1));
	t.ok(numbers.equal(m[1][1], -2));

	t.end();
});

test('matrix keeps track of size', function(t) {
	const m = new matrices.Matrix([
		[0, 0], // prettier-ignore
		[0, 0],
	]);

	t.ok(m.numRows === 2);
	t.ok(m.numCols === 2);
	t.ok(m.equalSize(m));

	t.end();
});

test('construct 3x3 matrix', function(t) {
	const m = new matrices.Matrix([
		[-3, 5, 0], // prettier-ignore
		[1, -2, -7],
		[0, 1, 1],
	]);

	t.ok(numbers.equal(m[0][0], -3));
	t.ok(numbers.equal(m[1][1], -2));
	t.ok(numbers.equal(m[2][2], 1));

	t.end();
});

test('construct 4x4 matrix', function(t) {
	const m = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(numbers.equal(m[0][0], 1));
	t.ok(numbers.equal(m[0][3], 4));
	t.ok(numbers.equal(m[1][0], 5.5));
	t.ok(numbers.equal(m[1][2], 7.5));
	t.ok(numbers.equal(m[2][2], 11));
	t.ok(numbers.equal(m[3][0], 13.5));
	t.ok(numbers.equal(m[3][2], 15.5));

	t.end();
});

test('same size, equal matrices', function(t) {
	const a = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(a.equal(b));

	t.end();
});

test('same size, non-equal matrices', function(t) {
	const a = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 17.5], // Diff at last.
	]);

	t.ok(!a.equal(b));

	t.end();
});

test('different size matrices', function(t) {
	const a = new matrices.Matrix([
		[1, 2], // prettier-ignore
		[5.5, 6.5],
	]);
	const b = new matrices.Matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 17.5],
	]);

	t.ok(!a.equal(b));

	t.end();
});

// XXX Broken.
// test('identity constant can not be changed', function(t) {
// 	matrices.IDENTITY_44[0][0] = 0;
// 	t.ok(numbers.equal(matrices.IDENTITY_44[0][0], 1));
// 	t.end();
// });

test('matrix mult, 4x4', function(t) {
	const a = new matrices.Matrix([
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 8, 7, 6],
		[5, 4, 3, 2],
	]);
	const b = new matrices.Matrix([
		[-2, 1, 2, 3],
		[3, 2, 1, -1],
		[4, 3, 6, 5],
		[1, 2, 7, 8],
	]);

	const actual = a.multiply(b);

	const expected = new matrices.Matrix([
		[20, 22, 50, 48],
		[44, 54, 114, 108],
		[40, 58, 110, 102],
		[16, 26, 46, 42],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('matrix mult, by tuple', function(t) {
	const m = new matrices.Matrix([
		[1, 2, 3, 4],
		[2, 4, 4, 2],
		[8, 6, 4, 1],
		[0, 0, 0, 1],
	]);
	const tup = new tuples.Tuple(1, 2, 3, 1);

	const actual = m.multiply(tup);
	const expected = new tuples.Tuple(18, 24, 33, 1);

	t.ok(actual.equal(expected));

	t.end();
});

test('matrix mult, by identity', function(t) {
	const m = new matrices.Matrix([
		[0, 1, 2, 4],
		[1, 2, 4, 8],
		[2, 4, 8, 16],
		[4, 8, 16, 32],
	]);

	const actual = m.multiply(matrices.IDENTITY_44);
	const expected = m;

	t.ok(actual.equal(expected));

	t.end();
});

test('identity mult, by tuple', function(t) {
	const tup = new tuples.Tuple(1, 2, 3, 4);

	const actual = matrices.IDENTITY_44.multiply(tup);
	const expected = tup;

	t.ok(actual.equal(expected));

	t.end();
});

test('transpose matrix', function(t) {
	const m = new matrices.Matrix([
		[0, 9, 3, 0],
		[9, 8, 0, 8],
		[1, 8, 5, 3],
		[0, 0, 5, 8],
	]);

	const actual = m.transpose();

	const expected = new matrices.Matrix([
		[0, 9, 1, 0],
		[9, 8, 8, 0],
		[3, 0, 5, 5],
		[0, 8, 3, 8],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('transpose identity matrix', function(t) {
	const m = matrices.IDENTITY_44;

	const actual = m.transpose();
	const expected = matrices.IDENTITY_44;

	t.ok(actual.equal(expected));

	t.end();
});

test('determinant of 2x2', function(t) {
	const m = new matrices.Matrix([
		[1, 5], // prettier-ignore
		[-3, 2],
	]);

	const actual = m.determinant();
	const expected = 17;

	t.ok(numbers.equal(actual, expected));

	t.end();
});

test('submatrix of 3x3 is 2x2', function(t) {
	const m = new matrices.Matrix([
		[1, 5, 0], // prettier-ignore
		[-3, 2, 7],
		[0, 6, -3],
	]);

	const actual = m.submatrix(0, 2);

	const expected = new matrices.Matrix([
		[-3, 2], // prettier-ignore
		[0, 6],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('submatrix of 4x4 is 3x3', function(t) {
	const m = new matrices.Matrix([
		[-6, 1, 1, 6],
		[-8, 5, 8, 6],
		[-1, 0, 8, 2],
		[-7, 1, -1, 1],
	]);

	const actual = m.submatrix(2, 1);

	const expected = new matrices.Matrix([
		[-6, 1, 6], // prettier-ignore
		[-8, 8, 6],
		[-7, -1, 1],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('a minor of 3x3', function(t) {
	const m = new matrices.Matrix([
		[3, 5, 0], // prettier-ignore
		[2, -1, -7],
		[6, -1, 5],
	]);

	const sub = m.submatrix(1, 0);
	const det = sub.determinant();
	t.ok(numbers.equal(det, 25));

	const minor = m.minor(1, 0);
	t.ok(numbers.equal(minor, 25));

	t.end();
});

test('a cofactor of 3x3', function(t) {
	const m = new matrices.Matrix([
		[3, 5, 0], // prettier-ignore
		[2, -1, -7],
		[6, -1, 5],
	]);

	t.ok(numbers.equal(m.minor(0, 0), -12));
	t.ok(numbers.equal(m.cofactor(0, 0), -12));

	t.ok(numbers.equal(m.minor(1, 0), 25));
	t.ok(numbers.equal(m.cofactor(1, 0), -25));

	t.end();
});

test('determinant of 3x3', function(t) {
	const m = new matrices.Matrix([
		[1, 2, 6], // prettier-ignore
		[-5, 8, -4],
		[2, 6, 4],
	]);

	t.ok(numbers.equal(m.cofactor(0, 0), 56));
	t.ok(numbers.equal(m.cofactor(0, 1), 12));
	t.ok(numbers.equal(m.cofactor(0, 2), -46));
	t.ok(numbers.equal(m.determinant(), -196));

	t.end();
});

test('determinant of 4x4', function(t) {
	const m = new matrices.Matrix([
		[-2, -8, 3, 5],
		[-3, 1, 7, 3],
		[1, 2, -9, 6],
		[-6, 7, 7, -9],
	]);

	t.ok(numbers.equal(m.cofactor(0, 0), 690));
	t.ok(numbers.equal(m.cofactor(0, 1), 447));
	t.ok(numbers.equal(m.cofactor(0, 2), 210));
	t.ok(numbers.equal(m.cofactor(0, 3), 51));
	t.ok(numbers.equal(m.determinant(), -4071));

	t.end();
});

test('matrix is invertible', function(t) {
	const m = new matrices.Matrix([
		[6, 4, 4, 4],
		[5, 5, 7, 6],
		[4, -9, 3, -7],
		[9, 1, 7, -6],
	]);

	t.ok(numbers.equal(m.determinant(), -2120));
	t.ok(m.invertible());

	t.end();
});

test('matrix is not invertible', function(t) {
	const m = new matrices.Matrix([
		[-4, 2, -2, -3],
		[9, 6, 2, 6],
		[0, -5, 1, -5],
		[0, 0, 0, 0],
	]);

	t.ok(numbers.equal(m.determinant(), 0));
	t.ok(!m.invertible());

	t.end();
});

test('inverse of matrix, 1', function(t) {
	const m = new matrices.Matrix([
		[-5, 2, 6, -8],
		[1, -5, 1, 8],
		[7, 7, -6, -7],
		[1, -3, 7, 4],
	]);

	const inv = m.inverse();

	t.ok(numbers.equal(m.determinant(), 532));

	t.ok(numbers.equal(m.cofactor(2, 3), -160));
	t.ok(numbers.equal(inv[3][2], -160 / 532));

	t.ok(numbers.equal(m.cofactor(3, 2), 105));
	t.ok(numbers.equal(inv[2][3], 105 / 532));

	const expected = new matrices.Matrix([
		[0.21805, 0.45113, 0.2406, -0.04511],
		[-0.80827, -1.45677, -0.44361, 0.52068],
		[-0.07895, -0.22368, -0.05263, 0.19737],
		[-0.52256, -0.81391, -0.30075, 0.30639],
	]);

	t.ok(inv.equal(expected));

	t.end();
});

test('inverse of matrix, 2', function(t) {
	const m = new matrices.Matrix([
		[8, -5, 9, 2],
		[7, 5, 6, 1],
		[-6, 0, 9, 6],
		[-3, 0, -9, -4],
	]);

	const actual = m.inverse();

	const expected = new matrices.Matrix([
		[-0.15385, -0.15385, -0.28205, -0.53846],
		[-0.07692, 0.12308, 0.02564, 0.03077],
		[0.35897, 0.35897, 0.4359, 0.92308],
		[-0.69231, -0.69231, -0.76923, -1.92308],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('inverse of matrix, 3', function(t) {
	const m = new matrices.Matrix([
		[9, 3, 0, 9],
		[-5, -2, -6, -3],
		[-4, 9, 6, 4],
		[-7, 6, 6, 2],
	]);

	const actual = m.inverse();

	const expected = new matrices.Matrix([
		[-0.04074, -0.07778, 0.14444, -0.22222],
		[-0.07778, 0.03333, 0.36667, -0.33333],
		[-0.02901, -0.1463, -0.10926, 0.12963],
		[0.17778, 0.06667, -0.26667, 0.33333],
	]);

	t.ok(actual.equal(expected));

	t.end();
});

test('inverse can fail', function(t) {
	const m = new matrices.Matrix([
		[-4, 2, -2, -3],
		[9, 6, 2, 6],
		[0, -5, 1, -5],
		[0, 0, 0, 0],
	]);

	t.ok(!m.invertible());

	t.throws(function() {
		m.inverse();
	}, Error);

	t.end();
});

test('multiply product by its inverse', function(t) {
	const a = new matrices.Matrix([
		[3, -9, 7, 3],
		[3, -8, 2, -9],
		[-4, 4, 4, 1],
		[-6, 5, -1, 1],
	]);

	const b = new matrices.Matrix([
		[8, 2, 2, 2],
		[3, -1, 7, 0],
		[7, 0, 5, 4],
		[6, -2, -0, 5],
	]);

	const c = a.multiply(b);

	t.ok(c.multiply(b.inverse()).equal(a));

	t.end();
});

test('invert identity gives identity', function(t) {
	const identity = matrices.IDENTITY_44;

	t.ok(identity.equal(identity.inverse()));

	t.end();
});

test('multiply matrix by its inverse', function(t) {
	const a = new matrices.Matrix([
		[3, -9, 7, 3],
		[3, -8, 2, -9],
		[-4, 4, 4, 1],
		[-6, 5, -1, 1],
	]);

	const invTrans = a.inverse().transpose();
	const transInv = a.transpose().inverse();
	t.ok(invTrans.equal(transInv));

	t.end();
});
