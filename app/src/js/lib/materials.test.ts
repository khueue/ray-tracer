import * as test from 'tape';

import * as colors from './colors';
import * as lights from './lights';
import * as materials from './materials';
import * as numbers from './numbers';
import * as tuples from './tuples';

test('default material', function(t) {
	const m = new materials.Material();

	t.ok(m.color.equal(colors.white()));
	t.ok(numbers.equal(m.ambient, 0.1));
	t.ok(numbers.equal(m.diffuse, 0.9));
	t.ok(numbers.equal(m.specular, 0.9));
	t.ok(numbers.equal(m.shininess, 200.0));

	t.end();
});

test('materials can be compared', function(t) {
	const a = new materials.Material();
	const b = new materials.Material();
	const c = new materials.Material();
	c.ambient = 0.5;

	t.ok(a.equal(b));
	t.ok(!a.equal(c));

	t.end();
});

test('lighting with eye between light and surface', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, 0, -1);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 0, -10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(1.9, 1.9, 1.9)));

	t.end();
});

test('lighting with eye between light and surface, eye offset 45 degrees', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 0, -10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(1.0, 1.0, 1.0)));

	t.end();
});

test('lighting with eye opposite surface, light offset 45 degrees', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, 0, -1);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 10, -10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(0.7364, 0.7364, 0.7364)));

	t.end();
});

test('lighting with eye in path of reflection vector', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, -Math.SQRT2 / 2, -Math.SQRT2 / 2);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 10, -10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(1.6364, 1.6364, 1.6364)));

	t.end();
});

test('lighting with light behind surface', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, 0, -1);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 0, 10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(0.1, 0.1, 0.1)));

	t.end();
});

test('lighting with light reflecting away from eye', function(t) {
	const m = new materials.Material();
	const position = tuples.POINT_ZERO;

	const eyeV = new tuples.Vector(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
	const normalV = new tuples.Vector(0, 0, -1);
	const light = new lights.PointLight(
		new tuples.Point(0, 10, -10),
		colors.white(),
	);
	const result = m.lighting(light, position, eyeV, normalV);

	t.ok(result.equal(new colors.Color(0.7364, 0.7364, 0.7364)));

	t.end();
});
