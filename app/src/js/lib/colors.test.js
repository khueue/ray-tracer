const test = require('tap').test;

const numbers = require('./numbers');

const {
	Color,
	add,
	sub,
	mult,
	equal,
} = require('./colors');

test('color are (red, green, blue) tuples', function(t) {
	const c = Color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));

	t.end();
});

test('color are (red, green, blue) tuples', function(t) {
	const c = Color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));

	t.end();
});

test('adding colors', function(t) {
	const a = Color(0.9, 0.6, 0.75);
	const b = Color(0.7, 0.1, 0.25);
	const result = add(a, b);
	t.ok(numbers.equal(result.red, 1.6));
	t.ok(numbers.equal(result.green, 0.7));
	t.ok(numbers.equal(result.blue, 1.0));

	t.end();
});

test('subtracting colors', function(t) {
	const a = Color(0.9, 0.6, 0.75);
	const b = Color(0.7, 0.1, 0.25);
	const result = sub(a, b);
	t.ok(numbers.equal(result.red, 0.2));
	t.ok(numbers.equal(result.green, 0.5));
	t.ok(numbers.equal(result.blue, 0.5));

	t.end();
});

test('multiplying colors', function(t) {
	const a = Color(1.0, 0.2, 0.4);
	const b = Color(0.9, 1.0, 0.1);
	const result = mult(a, b);
	t.ok(numbers.equal(result.red, 0.9));
	t.ok(numbers.equal(result.green, 0.2));
	t.ok(numbers.equal(result.blue, 0.04));

	t.end();
});

test('comparing colors', function(t) {
	const a = Color(1.0, 0.2, 0.4);
	const b = Color(1.0, 0.2, 0.4);
	t.ok(equal(a, b));

	t.end();
});
