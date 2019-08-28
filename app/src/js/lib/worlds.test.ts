import * as test from 'tape';

import * as colors from './colors';
import * as intersections from './intersections';
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

	const shape1 = new spheres.Sphere();
	shape1.material = new materials.Material();
	shape1.material.color = new colors.Color(0.8, 1.0, 0.6);
	shape1.material.diffuse = 0.7;
	shape1.material.specular = 0.2;

	const shape2 = new spheres.Sphere();
	shape2.transformation = transformations.scaling(0.5, 0.5, 0.5);

	const world = new worlds.World();
	world.light = light;
	world.setObject(shape1);
	world.setObject(shape2);

	// Return all the objects, for easy access.
	return {
		light,
		shape1,
		shape2,
		world,
	};
}

test('create empty world', function(t) {
	const w = new worlds.World();

	t.ok(w.light === lights.DEFAULT_LIGHT);
	t.ok(w.objects.size === 0);

	t.end();
});

test('create default world', function(t) {
	const { world } = newDefaultWorld();

	t.ok(world.light);
	t.ok(world.objects.size === 2);

	t.end();
});

test('intersect world with ray', function(t) {
	const { world } = newDefaultWorld();
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

test('shade an intersection', function(t) {
	const { world, shape1 } = newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1),
	);
	const i = new intersections.Intersection(4, shape1);
	const comps = i.computations(ray);
	const color = world.shadeHit(comps);

	t.ok(color.equal(new colors.Color(0.38066, 0.47583, 0.2855)));

	t.end();
});

test('shade an intersection from the inside', function(t) {
	const { world, shape2 } = newDefaultWorld();
	world.light = new lights.PointLight(
		new tuples.Point(0, 0.25, 0),
		colors.WHITE,
	);
	const ray = new rays.Ray(
		new tuples.Point(0, 0, 0),
		new tuples.Vector(0, 0, 1),
	);
	const inter = new intersections.Intersection(0.5, shape2);
	const comps = inter.computations(ray);
	const color = world.shadeHit(comps);

	t.ok(color.equal(new colors.Color(0.90498, 0.90498, 0.90498)));

	t.end();
});
