const test = require('tape');

const {
	equalFloats,
	equalTuples,
	tuple,
	point,
	vector,
	isPoint,
	isVector,
} = require('./tuples');

test('a tuple with w=1.0 is a point', function(t) {
	t.plan(6);

	const a = tuple(4.3, -4.2, 3.1, 1.0);
	t.ok(equalFloats(a.x, 4.3));
	t.ok(equalFloats(a.y, -4.2));
	t.ok(equalFloats(a.z, 3.1));
	t.ok(equalFloats(a.w, 1.0));
	t.ok(isPoint(a));
	t.ok(!isVector(a));
});

test('a tuple with w=0.0 is a vector', function(t) {
	t.plan(6);

	const a = tuple(4.3, -4.2, 3.1, 0.0);
	t.ok(equalFloats(a.x, 4.3));
	t.ok(equalFloats(a.y, -4.2));
	t.ok(equalFloats(a.z, 3.1));
	t.ok(equalFloats(a.w, 0.0));
	t.ok(!isPoint(a));
	t.ok(isVector(a));
});

test('point() creates a point', function(t) {
	t.plan(1);

	const a = point(4, -4, 3);
	const b = tuple(4, -4, 3, 1);
	t.ok(equalTuples(a, b));
});

test('vector() creates a vector', function(t) {
	t.plan(1);

	const a = vector(4, -4, 3);
	const b = tuple(4, -4, 3, 0);
	t.ok(equalTuples(a, b));
});
