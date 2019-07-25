import * as test from 'tape';

import * as intersections from './intersections';
import * as numbers from './numbers';
import * as spheres from './spheres';

test('intersection has t and object', function(t) {
	const s = new spheres.Sphere();
	const i = new intersections.Intersection(3.5, s);

	t.ok(numbers.equal(i.t, 3.5));
	t.ok(i.obj === s);

	t.end();
});

test('collecting intersections', function(t) {
	const s = new spheres.Sphere();
	const i1 = new intersections.Intersection(1, s);
	const i2 = new intersections.Intersection(2, s);
	const xs = new intersections.Intersections(i1, i2);

	t.ok(xs.length === 2);

	t.ok(numbers.equal(xs[0].t, 1));
	t.ok(xs[0].obj === s);

	t.ok(numbers.equal(xs[1].t, 2));
	t.ok(xs[1].obj === s);

	t.end();
});

test('collection can be empty', function(t) {
	const xs = new intersections.Intersections();

	t.ok(xs.length === 0);

	t.end();
});

test('collection maintains hit order', function(t) {
	const s = new spheres.Sphere();
	const i1 = new intersections.Intersection(3, s);
	const i2 = new intersections.Intersection(2, s);
	const i3 = new intersections.Intersection(1, s);
	const xs = new intersections.Intersections(i1, i2, i3);

	t.ok(xs.length === 3);

	t.ok(numbers.equal(xs[0].t, 1));
	t.ok(xs[0].obj === s);

	t.ok(numbers.equal(xs[1].t, 2));
	t.ok(xs[1].obj === s);

	t.ok(numbers.equal(xs[2].t, 3));
	t.ok(xs[2].obj === s);

	t.end();
});

test('hit skips negative intersections', function(t) {
	const s = new spheres.Sphere();
	const i1 = new intersections.Intersection(-2, s);
	const i2 = new intersections.Intersection(2, s);
	const i3 = new intersections.Intersection(-1, s);
	const xs = new intersections.Intersections(i1, i2, i3);

	t.ok(xs.length === 3);

	t.ok(xs.hit() === i2);

	t.end();
});

test('hit with only negatives means no hit', function(t) {
	const s = new spheres.Sphere();
	const i1 = new intersections.Intersection(-2, s);
	const i2 = new intersections.Intersection(-5, s);
	const i3 = new intersections.Intersection(-1, s);
	const xs = new intersections.Intersections(i1, i2, i3);

	t.ok(xs.length === 3);

	t.ok(!xs.hit());

	t.end();
});

test('no intersections means no hit', function(t) {
	const xs = new intersections.Intersections();

	t.ok(!xs.hit());

	t.end();
});
