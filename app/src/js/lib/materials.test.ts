import * as test from 'tape';

import * as materials from './materials';
import * as colors from './colors';
import * as numbers from './numbers';

test('default material', function(t) {
	const m = new materials.Material();

	t.ok(m.color.equal(colors.WHITE));
	t.ok(numbers.equal(m.ambient, 0.1));
	t.ok(numbers.equal(m.diffuse, 0.9));
	t.ok(numbers.equal(m.specular, 0.9));
	t.ok(numbers.equal(m.shininess, 200.0));

	t.end();
});
