import { test } from 'tap';

import * as numbers from './numbers';
import * as colors from './colors';

test('color are (red, green, blue) tuples', function(t) {
	const c = new colors.Color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));

	t.end();
});

test('color are (red, green, blue) tuples', function(t) {
	const c = new colors.Color(-0.5, 0.4, 1.7);
	t.ok(numbers.equal(c.red, -0.5));
	t.ok(numbers.equal(c.green, 0.4));
	t.ok(numbers.equal(c.blue, 1.7));

	t.end();
});

test('adding colors', function(t) {
	const a = new colors.Color(0.9, 0.6, 0.75);
	const b = new colors.Color(0.7, 0.1, 0.25);
	const result = a.add(b);
	t.ok(numbers.equal(result.red, 1.6));
	t.ok(numbers.equal(result.green, 0.7));
	t.ok(numbers.equal(result.blue, 1));

	t.end();
});

test('subtracting colors', function(t) {
	const a = new colors.Color(0.9, 0.6, 0.75);
	const b = new colors.Color(0.7, 0.1, 0.25);
	const result = a.subtract(b);
	t.ok(numbers.equal(result.red, 0.2));
	t.ok(numbers.equal(result.green, 0.5));
	t.ok(numbers.equal(result.blue, 0.5));

	t.end();
});

test('multiplying colors', function(t) {
	const a = new colors.Color(1, 0.2, 0.4);
	const b = new colors.Color(0.9, 1, 0.1);
	const result = a.multiply(b);
	t.ok(numbers.equal(result.red, 0.9));
	t.ok(numbers.equal(result.green, 0.2));
	t.ok(numbers.equal(result.blue, 0.04));

	t.end();
});

test('comparing colors', function(t) {
	const a = new colors.Color(1, 0.2, 0.4);
	const b = new colors.Color(1, 0.2, 0.4);
	t.ok(a.equal(b));

	t.end();
});
