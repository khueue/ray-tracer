import * as test from 'tape';

import * as spheres from './spheres';

test('each sphere is unique', function(t) {
	const a = new spheres.Sphere();
	const b = new spheres.Sphere();
	t.ok(a.id !== b.id);

	t.end();
});
