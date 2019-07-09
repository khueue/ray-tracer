import * as test from 'tape';

import * as spheres from './spheres';
import * as numbers from './numbers';
import * as rays from './rays';
import * as tuples from './tuples';
import * as matrices from './matrices';
import * as transformations from './transformations';

test('each sphere is unique', function(t) {
	const a = new spheres.Sphere();
	const b = new spheres.Sphere();

	t.ok(a.id !== b.id);

	t.end();
});

test('sphere has identity as default transformation', function(t) {
	const a = new spheres.Sphere();

	t.ok(a.transformation.equal(matrices.IDENTITY_44));

	t.end();
});

test('changing sphere transformation', function(t) {
	const a = new spheres.Sphere();
	a.transformation = transformations.scaling(2, 2, 2);

	t.ok(a.transformation.equal(transformations.scaling(2, 2, 2)));

	t.end();
});

test('intersecting scaled sphere with ray', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	s.transformation = transformations.scaling(2, 2, 2);
	const xs = r.intersects(s);

	t.ok(xs.length === 2);
	t.ok(numbers.equal(xs[0].t, 3));
	t.ok(numbers.equal(xs[1].t, 7));

	t.end();
});

test('intersecting translated sphere with ray', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	s.transformation = transformations.translation(5, 0, 0);
	const xs = r.intersects(s);

	t.ok(xs.length === 0);

	t.end();
});

test('intersecting translated sphere with ray', function(t) {
	const r = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1)
	);
	const s = new spheres.Sphere();
	s.transformation = transformations.translation(5, 0, 0);
	const xs = r.intersects(s);

	t.ok(xs.length === 0);

	t.end();
});
