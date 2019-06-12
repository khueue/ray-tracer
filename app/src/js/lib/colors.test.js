const test = require('tape');

const { color, add, sub, mult } = require('./colors');
const numbers = require('./numbers');

test('color are (red, green, blue) tuples', function(t) {
	t.plan(3);

	const c = color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));
});

test('color are (red, green, blue) tuples', function(t) {
	t.plan(3);

	const c = color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));
});

test('adding colors', function(t) {
	t.plan(3);

	const a = color(0.9, 0.6, 0.75);
	const b = color(0.7, 0.1, 0.25);
	const res = add(a, b);
	t.ok(numbers.equal(res.red, 1.6));
	t.ok(numbers.equal(res.green, 0.7));
	t.ok(numbers.equal(res.blue, 1.0));
});

test('subtracting colors', function(t) {
	t.plan(3);

	const a = color(0.9, 0.6, 0.75);
	const b = color(0.7, 0.1, 0.25);
	const res = sub(a, b);
	t.ok(numbers.equal(res.red, 0.2));
	t.ok(numbers.equal(res.green, 0.5));
	t.ok(numbers.equal(res.blue, 0.5));
});

test('multiplying colors', function(t) {
	t.plan(3);

	const a = color(1, 0.2, 0.4);
	const b = color(0.9, 1, 0.1);
	const res = mult(a, b);
	t.ok(numbers.equal(res.red, 0.9));
	t.ok(numbers.equal(res.green, 0.2));
	t.ok(numbers.equal(res.blue, 0.04));
});
