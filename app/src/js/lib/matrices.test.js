const test = require('tap').test;

const numbers = require('./numbers');

const {
	Matrix22,
	Matrix33,
	Matrix44,
	equal,
	valueAt,
} = require('./matrices');

test('construct 2x2 matrix', function(t) {
	const m = Matrix22([[-3.0, 5.0], [1.0, -2.0]]);

	t.ok(numbers.equal(valueAt(m, 0, 0), -3.0));
	t.ok(numbers.equal(valueAt(m, 0, 1), 5.0));
	t.ok(numbers.equal(valueAt(m, 1, 0), 1.0));
	t.ok(numbers.equal(valueAt(m, 1, 1), -2.0));

	t.end();
});

test('construct 3x3 matrix', function(t) {
	const m = Matrix33([
		[-3.0, 5.0, 0.0],
		[1.0, -2.0, -7.0],
		[0.0, 1.0, 1.0],
	]);

	t.ok(numbers.equal(valueAt(m, 0, 0), -3.0));
	t.ok(numbers.equal(valueAt(m, 1, 1), -2.0));
	t.ok(numbers.equal(valueAt(m, 2, 2), 1.0));

	t.end();
});

test('construct 4x4 matrix', function(t) {
	const m = Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(numbers.equal(valueAt(m, 0, 0), 1.0));
	t.ok(numbers.equal(valueAt(m, 0, 3), 4.0));
	t.ok(numbers.equal(valueAt(m, 1, 0), 5.5));
	t.ok(numbers.equal(valueAt(m, 1, 2), 7.5));
	t.ok(numbers.equal(valueAt(m, 2, 2), 11.0));
	t.ok(numbers.equal(valueAt(m, 3, 0), 13.5));
	t.ok(numbers.equal(valueAt(m, 3, 2), 15.5));

	t.end();
});

test('equal matrices', function(t) {
	const a = Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);

	t.ok(equal(a, b));

	t.end();
});

test('non-equal matrices', function(t) {
	const a = Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 16.5],
	]);
	const b = Matrix44([
		[1.0, 2.0, 3.0, 4.0],
		[5.5, 6.5, 7.5, 8.5],
		[9.0, 10.0, 11.0, 12.0],
		[13.5, 14.5, 15.5, 17.5], // Diff at last.
	]);

	t.ok(!equal(a, b));

	t.end();
});
