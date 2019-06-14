const test = require('tape');

const { canvas, writePixel, pixelAt } = require('./canvas');
const colors = require('./colors');

test('creating canvas', function(t) {
	t.plan(2 + 4);

	const c = canvas(10, 20);

	t.ok(c.width === 10);
	t.ok(c.height === 20);

	function isBlack(c) {
		return c.red === 0 && c.green === 0 && c.blue === 0;
	}

	// Suffice to check corners.
	t.ok(isBlack(c.pixels[0][0]));
	t.ok(isBlack(c.pixels[0][c.height - 1]));
	t.ok(isBlack(c.pixels[c.width - 1][0]));
	t.ok(isBlack(c.pixels[c.width - 1][c.height - 1]));
});

test('writing pixels to canvas', function(t) {
	t.plan(1);

	const c = canvas(10, 20);
	const red = colors.color(1, 0, 0);
	writePixel(c, 2, 3, red);
	t.ok(colors.equal(pixelAt(c, 2, 3), red));
});
