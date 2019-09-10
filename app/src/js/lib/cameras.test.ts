import * as test from 'tape';

import * as cameras from './cameras';
import * as colors from './colors';
import * as matrices from './matrices';
import * as numbers from './numbers';
import * as transformations from './transformations';
import * as tuples from './tuples';
import * as utils from './utils';

test('construct a camera', function(t) {
	const hSize = 160;
	const vSize = 120;
	const fieldOfView = Math.PI / 2;

	const c = new cameras.Camera(hSize, vSize, fieldOfView);
	t.ok(c.hSize === 160);
	t.ok(c.vSize === 120);
	t.ok(numbers.equal(c.fieldOfView, Math.PI / 2));
	t.ok(c.transform.equal(matrices.IDENTITY_44));

	t.end();
});

test('pixel size for horizontal canvas', function(t) {
	const c = new cameras.Camera(200, 125, Math.PI / 2);
	t.ok(numbers.equal(c.pixelSize, 0.01));

	t.end();
});

test('pixel size for vertical canvas', function(t) {
	const c = new cameras.Camera(125, 200, Math.PI / 2);
	t.ok(numbers.equal(c.pixelSize, 0.01));

	t.end();
});

test('construct ray through center of canvas', function(t) {
	const c = new cameras.Camera(201, 101, Math.PI / 2);
	const ray = c.rayForPixel(100, 50);
	t.ok(ray.origin.equal(new tuples.Point(0, 0, 0)));
	t.ok(ray.direction.equal(new tuples.Vector(0, 0, -1)));

	t.end();
});

test('construct ray through corner of canvas', function(t) {
	const c = new cameras.Camera(201, 101, Math.PI / 2);
	const ray = c.rayForPixel(0, 0);
	t.ok(ray.origin.equal(new tuples.Point(0, 0, 0)));
	t.ok(ray.direction.equal(new tuples.Vector(0.66519, 0.33259, -0.66851)));

	t.end();
});

test('construct ray when camera is transformed', function(t) {
	const c = new cameras.Camera(201, 101, Math.PI / 2);
	c.transform = transformations.rotationY(Math.PI / 4).multiply(transformations.translation(0, -2, 5));
	const ray = c.rayForPixel(100, 50);
	t.ok(ray.origin.equal(new tuples.Point(0, 2, -5)));
	t.ok(ray.direction.equal(new tuples.Vector(Math.SQRT2 / 2, 0, -Math.SQRT2 / 2)));

	t.end();
});

test('render world with camera', function(t) {
	const { world } = utils.newDefaultWorld();
	const camera = new cameras.Camera(11, 11, Math.PI / 2);
	const from = new tuples.Point(0, 0, -5);
	const to = new tuples.Point(0, 0, 0);
	const up = new tuples.Vector(0, 1, 0);
	camera.transform = transformations.viewTransform(from, to, up);
	const image = camera.render(world);

	t.ok(image[5][5].equal(new colors.Color(0.38066, 0.47583, 0.2855)));

	t.end();
});
