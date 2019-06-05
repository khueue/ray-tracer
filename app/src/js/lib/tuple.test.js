const test = require('tape');

const {
	equalFloats,
	equalTuples,
	tuple,
	point,
	vector,
	isPoint,
	isVector,
	add,
	sub,
	mult,
	div,
	negate,
} = require('./tuple');

test('tuple with w=1.0 is a point', function(t) {
	t.plan(6);

	const a = tuple(4.3, -4.2, 3.1, 1.0);
	t.ok(equalFloats(a.x, 4.3));
	t.ok(equalFloats(a.y, -4.2));
	t.ok(equalFloats(a.z, 3.1));
	t.ok(equalFloats(a.w, 1.0));
	t.ok(isPoint(a));
	t.ok(!isVector(a));
});

test('tuple with w=0.0 is a vector', function(t) {
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

test('adding two tuples', function(t) {
	t.plan(1);

	const a = tuple(3, -2, 5, 1);
	const b = tuple(-2, 3, 1, 0);
	const res = add(a, b);
	t.ok(equalTuples(res, { x: 1, y: 1, z: 6, w: 1 }));
});

test('subtracting two points', function(t) {
	t.plan(1);

	const a = point(3, 2, 1);
	const b = point(5, 6, 7);
	const res = sub(a, b);
	t.ok(equalTuples(res, vector(-2, -4, -6)));
});

test('subtracting vector from point', function(t) {
	t.plan(1);

	const a = point(3, 2, 1);
	const b = vector(5, 6, 7);
	const res = sub(a, b);
	t.ok(equalTuples(res, point(-2, -4, -6)));
});

test('subtracting two vectors', function(t) {
	t.plan(1);

	const a = vector(3, 2, 1);
	const b = vector(5, 6, 7);
	const res = sub(a, b);
	t.ok(equalTuples(res, vector(-2, -4, -6)));
});

test('subtracting a vector from the zero vector', function(t) {
	t.plan(1);

	const zero = vector(0, 0, 0);
	const v = vector(1, -2, 3);
	const res = sub(zero, v);
	t.ok(equalTuples(res, vector(-1, 2, -3)));
});

test('multiplying a tuple by a scalar', function(t) {
	t.plan(1);

	const a = tuple(1, -2, 3, -4);
	const s = 3.5;
	const res = mult(a, s);
	t.ok(equalTuples(res, tuple(3.5, -7, 10.5, -14)));
});

test('multiplying a tuple by a fraction', function(t) {
	t.plan(1);

	const a = tuple(1, -2, 3, -4);
	const s = 0.5;
	const res = mult(a, s);
	t.ok(equalTuples(res, tuple(0.5, -1, 1.5, -2)));
});

test('dividing a tuple by a scalar', function(t) {
	t.plan(1);

	const a = tuple(1, -2, 3, -4);
	const s = 2;
	const res = div(a, s);
	t.ok(equalTuples(res, tuple(0.5, -1, 1.5, -2)));
});

test('negating a tuple', function(t) {
	t.plan(1);

	const a = tuple(1, -2, 3, -4);
	const res = negate(a);
	t.ok(equalTuples(res, tuple(-1, 2, -3, 4)));
});
