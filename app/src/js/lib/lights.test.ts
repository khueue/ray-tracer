import * as test from 'tape';

import * as colors from './colors';
import * as lights from './lights';
import * as tuples from './tuples';

test('point light has position and intensity', function(t) {
	const position = tuples.POINT_ZERO;
	const intensity = colors.WHITE;
	const light = new lights.PointLight(position, intensity);

	t.ok(light.position.equal(position));
	t.ok(light.intensity.equal(intensity));

	t.end();
});
