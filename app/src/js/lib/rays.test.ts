import { test } from 'tap';

import * as numbers from './numbers';
import * as tuples from './tuples';
import * as rays from './rays';
import * as spheres from './spheres';

test('creating ray', function(t) {
	const origin = new tuples.Point(1, 2, 3);
	const direction = new tuples.Vector(4, 5, 6);
	const r = new rays.Ray(origin, direction);

	t.ok(r.origin.equal(origin));
	t.ok(r.direction.equal(direction));

	t.end();
});

test('computing point from distance', function(t) {
	const r = new rays.Ray(
		new tuples.Point(2, 3, 4),
		new tuples.Vector(1, 0, 0)
	);

	t.ok(r.position(0).equal(new tuples.Point(2, 3, 4)));
	t.ok(r.position(1).equal(new tuples.Point(3, 3, 4)));
	t.ok(r.position(-1).equal(new tuples.Point(1, 3, 4)));
	t.ok(r.position(2.5).equal(new tuples.Point(4.5, 3, 4)));

	t.end();
});

test('ray intersects sphere at two points', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	const xs = r.intersects(s);

	t.ok(xs.length === 2);
	t.ok(numbers.equal(xs[0], 4.0));
	t.ok(numbers.equal(xs[1], 6.0));

	t.end();
});

test('ray intersects sphere at tangent', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 1, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	const xs = r.intersects(s);

	t.ok(xs.length === 2);
	t.ok(numbers.equal(xs[0], 5.0));
	t.ok(numbers.equal(xs[1], 5.0));

	t.end();
});

test('ray misses sphere', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 2, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	const xs = r.intersects(s);

	t.ok(xs.length === 0);

	t.end();
});

test('ray originates inside sphere', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, 0),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	const xs = r.intersects(s);

	t.ok(xs.length === 2);
	t.ok(numbers.equal(xs[0], -1.0));
	t.ok(numbers.equal(xs[1], 1.0));

	t.end();
});

test('ray is passed sphere', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, 5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	const xs = r.intersects(s);

	t.ok(xs.length === 2);
	t.ok(numbers.equal(xs[0], -6.0));
	t.ok(numbers.equal(xs[1], -4.0));

	t.end();
});
