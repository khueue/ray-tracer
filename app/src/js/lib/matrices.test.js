const test = require('tap').test;

const numbers = require('./numbers');
const matrices = require('./matrices');
const tuples = require('./tuples');

test('construct 2x2 matrix', function(t) {
	const m = matrices.Matrix22([
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
	const m = matrices.Matrix33([
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
	const m = matrices.Matrix44([
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
	const a = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(matrices.equal(a, b));

	t.end();
});

test('same size, non-equal matrices', function(t) {
	const a = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 17.5], // Diff at last.
	]);

	t.ok(!matrices.equal(a, b));

	t.end();
});

test('different size matrices', function(t) {
	const a = matrices.Matrix22([
		[1.0, 2.0], // prettier-ignore
		[5.5, 6.5],
	]);
	const b = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 17.5],
	]);

	t.ok(!matrices.equal(a, b));

	t.end();
});

test('matrix mult, 4x4', function(t) {
	const a = matrices.Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.0, 6.0, 7.0, 8.0],
		[9.0, 8.0, 7.0, 6.0],
		[5.0, 4.0, 3.0, 2.0],
	]);
	const b = matrices.Matrix44([
		[-2.0, 1.0, 2.0, 3.0],
		[3.0, 2.0, 1.0, -1.0],
		[4.0, 3.0, 6.0, 5.0],
		[1.0, 2.0, 7.0, 8.0],
	]);

	const actual = matrices.mult(a, b);

	const expected = matrices.Matrix44([
		[20.0, 22.0, 50.0, 48.0],
		[44.0, 54.0, 114.0, 108.0],
		[40.0, 58.0, 110.0, 102.0],
		[16.0, 26.0, 46.0, 42.0],
	]);

	t.ok(matrices.equal(actual, expected));

	t.end();
});

test('matrix mult, by tuple', function(t) {
	const m = matrices.Matrix44([
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
	const m = matrices.Matrix44([
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
	const m = matrices.Matrix44([
		[0.0, 9.0, 3.0, 0.0],
		[9.0, 8.0, 0.0, 8.0],
		[1.0, 8.0, 5.0, 3.0],
		[0.0, 0.0, 5.0, 8.0],
	]);

	const actual = matrices.transpose(m);

	const expected = matrices.Matrix44([
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
	const m = matrices.Matrix22([
		[1.0, 5.0], // prettier-ignore
		[-3.0, 2.0],
	]);

	const actual = matrices.determinant(m);
	const expected = 17.0;

	t.ok(numbers.equal(actual, expected));

	t.end();
});
