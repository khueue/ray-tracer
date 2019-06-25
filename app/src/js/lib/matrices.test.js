const test = require('tap').test;

const numbers = require('./numbers');
const matrices = require('./matrices');
const tuples = require('./tuples');

test('construct 2x2 matrix', function(t) {
	const m = new matrices.Matrix([
		[-3.0, 5.0], // prettier-ignore
		[1.0, -2.0],
	]);

	t.ok(numbers.equal(m[0][0], -3.0));
	t.ok(numbers.equal(m[0][1], 5.0));
	t.ok(numbers.equal(m[1][0], 1.0));
	t.ok(numbers.equal(m[1][1], -2.0));

	t.end();
});

test('construct 3x3 matrix', function(t) {
	const m = new matrices.Matrix([
		[-3.0, 5.0, 0.0],
		[1.0, -2.0, -7.0],
		[0.0, 1.0, 1.0],
	]);

	t.ok(numbers.equal(m[0][0], -3.0));
	t.ok(numbers.equal(m[1][1], -2.0));
	t.ok(numbers.equal(m[2][2], 1.0));

	t.end();
});

test('construct 4x4 matrix', function(t) {
	const m = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(numbers.equal(m[0][0], 1.0));
	t.ok(numbers.equal(m[0][3], 4.0));
	t.ok(numbers.equal(m[1][0], 5.5));
	t.ok(numbers.equal(m[1][2], 7.5));
	t.ok(numbers.equal(m[2][2], 11.0));
	t.ok(numbers.equal(m[3][0], 13.5));
	t.ok(numbers.equal(m[3][2], 15.5));

	t.end();
});

test('same size, equal matrices', function(t) {
	const a = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(matrices.equal(a, b));

	t.end();
});

test('same size, non-equal matrices', function(t) {
	const a = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 17.5], // Diff at last.
	]);

	t.ok(!matrices.equal(a, b));

	t.end();
});

test('different size matrices', function(t) {
	const a = new matrices.Matrix([
		[1.0, 2.0], // prettier-ignore
		[5.5, 6.5],
	]);
	const b = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 17.5],
	]);

	t.ok(!matrices.equal(a, b));

	t.end();
});

test('matrix mult, 4x4', function(t) {
	const a = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[5.0, 6.0, 7.0, 8.0],
		[9.0, 8.0, 7.0, 6.0],
		[5.0, 4.0, 3.0, 2.0],
	]);
	const b = new matrices.Matrix([
		[-2.0, 1.0, 2.0, 3.0],
		[3.0, 2.0, 1.0, -1.0],
		[4.0, 3.0, 6.0, 5.0],
		[1.0, 2.0, 7.0, 8.0],
	]);

	const actual = matrices.mult(a, b);

	const expected = new matrices.Matrix([
		[20.0, 22.0, 50.0, 48.0],
		[44.0, 54.0, 114.0, 108.0],
		[40.0, 58.0, 110.0, 102.0],
		[16.0, 26.0, 46.0, 42.0],
	]);

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('matrix mult, by tuple', function(t) {
	const m = new matrices.Matrix([
		[1.0, 2.0, 3.0, 4.0],
		[2.0, 4.0, 4.0, 2.0],
		[8.0, 6.0, 4.0, 1.0],
		[0.0, 0.0, 0.0, 1.0],
	]);
	const tup = tuples.Tuple(1.0, 2.0, 3.0, 1.0);

	const actual = matrices.multTuple(m, tup);
	const expected = tuples.Tuple(18.0, 24.0, 33.0, 1.0);

	t.ok(tuples.equal(actual, expected));

	t.end();
});

test('matrix mult, by identity', function(t) {
	const m = new matrices.Matrix([
		[0.0, 1.0, 2.0, 4.0],
		[1.0, 2.0, 4.0, 8.0],
		[2.0, 4.0, 8.0, 16.0],
		[4.0, 8.0, 16.0, 32.0],
	]);

	const actual = matrices.mult(m, matrices.IDENTITY_44);
	const expected = m;

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('identity mult, by tuple', function(t) {
	const tup = tuples.Tuple(1.0, 2.0, 3.0, 4.0);

	const actual = matrices.multTuple(matrices.IDENTITY_44, tup);
	const expected = tup;

	t.ok(tuples.equal(actual, expected));

	t.end();
});

test('transpose matrix', function(t) {
	const m = new matrices.Matrix([
		[0.0, 9.0, 3.0, 0.0],
		[9.0, 8.0, 0.0, 8.0],
		[1.0, 8.0, 5.0, 3.0],
		[0.0, 0.0, 5.0, 8.0],
	]);

	const actual = matrices.transpose(m);

	const expected = new matrices.Matrix([
		[0.0, 9.0, 1.0, 0.0],
		[9.0, 8.0, 8.0, 0.0],
		[3.0, 0.0, 5.0, 5.0],
		[0.0, 8.0, 3.0, 8.0],
	]);

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('transpose identity matrix', function(t) {
	const m = matrices.IDENTITY_44;

	const actual = matrices.transpose(m);
	const expected = matrices.IDENTITY_44;

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('determinant of 2x2', function(t) {
	const m = new matrices.Matrix([
		[1.0, 5.0], // prettier-ignore
		[-3.0, 2.0],
	]);

	const actual = matrices.determinant(m);
	const expected = 17.0;

	t.ok(numbers.equal(actual, expected));

	t.end();
});

test('submatrix of 3x3 is 2x2', function(t) {
	const m = new matrices.Matrix([
		[1.0, 5.0, 0.0],
		[-3.0, 2.0, 7.0],
		[0.0, 6.0, -3.0],
	]);

	const actual = matrices.submatrix(m, 0, 2);

	const expected = new matrices.Matrix([
		[-3.0, 2.0], // prettier-ignore
		[0.0, 6.0],
	]);

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('submatrix of 4x4 is 3x3', function(t) {
	const m = new matrices.Matrix([
		[-6.0, 1.0, 1.0, 6.0],
		[-8.0, 5.0, 8.0, 6.0],
		[-1.0, 0.0, 8.0, 2.0],
		[-7.0, 1.0, -1.0, 1.0],
	]);

	const actual = matrices.submatrix(m, 2, 1);

	const expected = new matrices.Matrix([
		[-6.0, 1.0, 6.0],
		[-8.0, 8.0, 6.0],
		[-7.0, -1.0, 1.0],
	]);

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('a minor of 3x3', function(t) {
	const m = new matrices.Matrix([
		[3.0, 5.0, 0.0],
		[2.0, -1.0, -7.0],
		[6.0, -1.0, 5.0],
	]);

	const sub = matrices.submatrix(m, 1, 0);
	const det = matrices.determinant(sub);
	t.ok(numbers.equal(det, 25.0));

	const minor = matrices.minor(m, 1, 0);
	t.ok(numbers.equal(minor, 25.0));

	t.end();
});

test('a cofactor of 3x3', function(t) {
	const m = new matrices.Matrix([
		[3.0, 5.0, 0.0],
		[2.0, -1.0, -7.0],
		[6.0, -1.0, 5.0],
	]);

	t.ok(numbers.equal(matrices.minor(m, 0, 0), -12.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 0), -12.0));

	t.ok(numbers.equal(matrices.minor(m, 1, 0), 25.0));
	t.ok(numbers.equal(matrices.cofactor(m, 1, 0), -25.0));

	t.end();
});

test('determinant of 3x3', function(t) {
	const m = new matrices.Matrix([
		[1.0, 2.0, 6.0],
		[-5.0, 8.0, -4.0],
		[2.0, 6.0, 4.0],
	]);

	t.ok(numbers.equal(matrices.cofactor(m, 0, 0), 56.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 1), 12.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 2), -46.0));
	t.ok(numbers.equal(matrices.determinant(m), -196.0));

	t.end();
});

test('determinant of 4x4', function(t) {
	const m = new matrices.Matrix([
		[-2.0, -8.0, 3.0, 5.0],
		[-3.0, 1.0, 7.0, 3.0],
		[1.0, 2.0, -9.0, 6.0],
		[-6.0, 7.0, 7.0, -9.0],
	]);

	t.ok(numbers.equal(matrices.cofactor(m, 0, 0), 690.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 1), 447.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 2), 210.0));
	t.ok(numbers.equal(matrices.cofactor(m, 0, 3), 51.0));
	t.ok(numbers.equal(matrices.determinant(m), -4071.0));

	t.end();
});

test('matrix is invertible', function(t) {
	const m = new matrices.Matrix([
		[6.0, 4.0, 4.0, 4.0],
		[5.0, 5.0, 7.0, 6.0],
		[4.0, -9.0, 3.0, -7.0],
		[9.0, 1.0, 7.0, -6.0],
	]);

	t.ok(numbers.equal(matrices.determinant(m), -2120.0));
	t.ok(matrices.invertible(m));

	t.end();
});

test('matrix is not invertible', function(t) {
	const m = new matrices.Matrix([
		[-4.0, 2.0, -2.0, -3.0],
		[9.0, 6.0, 2.0, 6.0],
		[0.0, -5.0, 1.0, -5.0],
		[0.0, 0.0, 0.0, 0.0],
	]);

	t.ok(numbers.equal(matrices.determinant(m), 0.0));
	t.ok(!matrices.invertible(m));

	t.end();
});

test('inverse of matrix', function(t) {
	const m = new matrices.Matrix([
		[-5.0, 2.0, 6.0, -8.0],
		[1.0, -5.0, 1.0, 8.0],
		[7.0, 7.0, -6.0, -7.0],
		[1.0, -3.0, 7.0, 4.0],
	]);

	const inv = matrices.inverse(m);

	t.ok(numbers.equal(matrices.determinant(m), 532.0));

	t.ok(numbers.equal(matrices.cofactor(m, 2, 3), -160.0));
	t.ok(numbers.equal(inv[3][2], -160.0 / 532.0));

	t.ok(numbers.equal(matrices.cofactor(m, 3, 2), 105.0));
	t.ok(numbers.equal(inv[2][3], 105.0 / 532.0));

	const expected = new matrices.Matrix([
		[0.21805, 0.45113, 0.2406, -0.04511],
		[-0.80827, -1.45677, -0.44361, 0.52068],
		[-0.07895, -0.22368, -0.05263, 0.19737],
		[-0.52256, -0.81391, -0.30075, 0.30639],
	]);

	t.ok(matrices.equal(inv, expected));

	t.end();
});

test('inverse can fail', function(t) {
	const m = new matrices.Matrix([
		[-4.0, 2.0, -2.0, -3.0],
		[9.0, 6.0, 2.0, 6.0],
		[0.0, -5.0, 1.0, -5.0],
		[0.0, 0.0, 0.0, 0.0],
	]);

	t.ok(!matrices.invertible(m));

	t.throws(function() {
		matrices.inverse(m);
	}, Error);

	t.end();
});
