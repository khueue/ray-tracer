import * as test from 'tape';

import * as colors from './colors';
import * as lights from './lights';
import * as materials from './materials';
import * as numbers from './numbers';
import * as rays from './rays';
import * as spheres from './spheres';
import * as transformations from './transformations';
import * as tuples from './tuples';
import * as worlds from './worlds';

function newDefaultWorld() {
	const light = new lights.PointLight(
		new tuples.Point(-10, 10, -10),
		colors.WHITE,
	);

	const s1 = new spheres.Sphere();
	s1.material = new materials.Material();
	s1.material.color = new colors.Color(0.8, 1.0, 0.6);
	s1.material.diffuse = 0.7;
	s1.material.specular = 0.2;

	const s2 = new spheres.Sphere();
	s2.transformation = transformations.scaling(0.5, 0.5, 0.5);

	const world = new worlds.World();
	world.setLight(light);
	world.setObject(s1);
	world.setObject(s2);

	return world;
}

test('create empty world', function(t) {
	const w = new worlds.World();

	t.ok(!w.light);
	t.ok(w.objects.size === 0);

	t.end();
});

test('create default world', function(t) {
	const w = newDefaultWorld();

	t.ok(w.light);
	t.ok(w.objects.size === 2);

	t.end();
});

test('intersect world with ray', function(t) {
	const world = newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1),
	);

	const xs = ray.intersectsWorld(world);
	t.ok(xs.length === 4);
	t.ok(numbers.equal(xs[0].t, 4));
	t.ok(numbers.equal(xs[1].t, 4.5));
	t.ok(numbers.equal(xs[2].t, 5.5));
	t.ok(numbers.equal(xs[3].t, 6));

	t.end();
});
