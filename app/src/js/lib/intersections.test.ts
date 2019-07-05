import { test } from 'tap';

import * as numbers from './numbers';
import * as spheres from './spheres';
import * as intersections from './intersections';

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
	const xs = new intersections.Intersections([i1, i2]);

	t.ok(xs.length === 2);

	t.ok(numbers.equal(xs[0].t, 1));
	t.ok(xs[0].obj === s);

	t.ok(numbers.equal(xs[1].t, 2));
	t.ok(xs[1].obj === s);

	t.end();
});

test('collection can be empty', function(t) {
	const xs = new intersections.Intersections([]);

	t.ok(xs.length === 0);

	t.end();
});
