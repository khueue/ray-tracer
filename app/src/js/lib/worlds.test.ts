import * as test from 'tape';

import * as colors from './colors';
import * as lights from './lights';
import * as materials from './materials';
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

test('creating an empty world', function(t) {
	const w = new worlds.World();

	t.ok(!w.light);
	t.ok(w.objects.size === 0);

	t.end();
});

test('creating a default world', function(t) {
	const w = newDefaultWorld();

	t.ok(w.light);
	t.ok(w.objects.size === 2);

	t.end();
});
