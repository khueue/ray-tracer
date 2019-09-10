import * as test from 'tape';

import * as colors from './colors';
import * as intersections from './intersections';
import * as lights from './lights';
import * as numbers from './numbers';
import * as rays from './rays';
import * as tuples from './tuples';
import * as utils from './utils';
import * as worlds from './worlds';

test('create empty world', function(t) {
	const world = new worlds.World();

	t.ok(world.light);
	t.ok(world.objects.size === 0);

	t.end();
});

test('create default world', function(t) {
	const { world } = utils.newDefaultWorld();

	t.ok(world.light);
	t.ok(world.objects.size === 2);

	t.end();
});

test('intersect world with ray', function(t) {
	const { world } = utils.newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1),
	);

	const inters = ray.intersectsWorld(world);
	t.ok(inters.length === 4);
	t.ok(numbers.equal(inters[0].t, 4));
	t.ok(numbers.equal(inters[1].t, 4.5));
	t.ok(numbers.equal(inters[2].t, 5.5));
	t.ok(numbers.equal(inters[3].t, 6));

	t.end();
});

test('shade an intersection', function(t) {
	const { world, shape1 } = utils.newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1),
	);
	const inter = new intersections.Intersection(4, shape1);
	const comps = inter.computations(ray);
	const color = world.shadeHit(comps);

	t.ok(color.equal(new colors.Color(0.38066, 0.47583, 0.2855)));

	t.end();
});

test('shade an intersection from the inside', function(t) {
	const { world, shape2 } = utils.newDefaultWorld();
	world.light = new lights.PointLight(
		new tuples.Point(0, 0.25, 0),
		colors.white(),
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

test('color when ray misses', function(t) {
	const { world } = utils.newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 1, 0),
	);
	const color = world.colorAt(ray);

	t.ok(color.equal(colors.black()));

	t.end();
});

test('color when ray hits', function(t) {
	const { world } = utils.newDefaultWorld();
	const ray = new rays.Ray(
		new tuples.Point(0, 0, -5),
		new tuples.Vector(0, 0, 1),
	);
	const color = world.colorAt(ray);

	t.ok(color.equal(new colors.Color(0.38066, 0.47583, 0.2855)));

	t.end();
});

test('color with intersection behind ray', function(t) {
	const { world, shape1: outer, shape2: inner } = utils.newDefaultWorld();
	outer.material.ambient = 1;
	inner.material.ambient = 1;
	const ray = new rays.Ray(
		new tuples.Point(0, 0, 0.75),
		new tuples.Vector(0, 0, -1),
	);
	const color = world.colorAt(ray);

	t.ok(color.equal(inner.material.color));

	t.end();
});
