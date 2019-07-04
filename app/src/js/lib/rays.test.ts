import { test } from 'tap';

import * as tuples from './tuples';
import * as rays from './rays';

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
