import * as test from 'tape';

import * as numbers from './numbers';
import * as tuples from './tuples';
import * as rays from './rays';
import * as spheres from './spheres';
import * as transformations from './transformations';

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
	t.ok(numbers.equal(xs[0].t, 4.0));
	t.ok(numbers.equal(xs[1].t, 6.0));

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
	t.ok(numbers.equal(xs[0].t, 5.0));
	t.ok(numbers.equal(xs[1].t, 5.0));

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
	t.ok(numbers.equal(xs[0].t, -1.0));
	t.ok(numbers.equal(xs[1].t, 1.0));

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
	t.ok(numbers.equal(xs[0].t, -6.0));
	t.ok(numbers.equal(xs[1].t, -4.0));

	t.end();
});

test('translating ray', function(t) {
	const r = new rays.Ray(
		new tuples.Point(1, 2, 3),
		new tuples.Vector(0, 1, 0)
	);
	const m = transformations.translation(3, 4, 5);
	const r2 = r.transform(m);

	t.ok(r2.origin.equal(new tuples.Point(4, 6, 8)));
	t.ok(r2.direction.equal(new tuples.Vector(0, 1, 0)));

	t.end();
});

test('scaling ray', function(t) {
	const r = new rays.Ray(
		new tuples.Point(1, 2, 3),
		new tuples.Vector(0, 1, 0)
	);
	const m = transformations.scaling(2, 3, 4);
	const r2 = r.transform(m);

	t.ok(r2.origin.equal(new tuples.Point(2, 6, 12)));
	t.ok(r2.direction.equal(new tuples.Vector(0, 3, 0)));

	t.end();
});
