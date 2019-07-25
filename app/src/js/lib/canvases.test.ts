import * as test from 'tape';

import * as canvases from './canvases';
import * as colors from './colors';

test('creating canvas', function(t) {
	const c = new canvases.Canvas(10, 20);

	t.ok(c.width === 10);
	t.ok(c.height === 20);

	function isBlack(x: colors.Color) {
		return x.red === 0 && x.green === 0 && x.blue === 0;
	}

	// Suffice to check corners.
	t.ok(isBlack(c[0][0]));
	t.ok(isBlack(c[0][c.height - 1]));
	t.ok(isBlack(c[c.width - 1][0]));
	t.ok(isBlack(c[c.width - 1][c.height - 1]));

	t.end();
});

test('writing pixel to canvas', function(t) {
	const c = new canvases.Canvas(10, 20);
	const red = new colors.Color(1, 0, 0);
	c[2][3] = red;
	t.ok(c[2][3].equal(red));

	t.end();
});
