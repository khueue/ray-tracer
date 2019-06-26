const test = require('tap').test;

const colors = require('./colors');

const { Canvas, writePixel, pixelAt } = require('./canvas');

test('creating canvas', function(t) {
	const c = Canvas(10, 20);

	t.ok(c.width === 10);
	t.ok(c.height === 20);

	function isBlack(c) {
		return c.red === 0.0 && c.green === 0.0 && c.blue === 0.0;
	}

	// Suffice to check corners.
	t.ok(isBlack(c.pixels[0][0]));
	t.ok(isBlack(c.pixels[0][c.height - 1]));
	t.ok(isBlack(c.pixels[c.width - 1][0]));
	t.ok(isBlack(c.pixels[c.width - 1][c.height - 1]));

	t.end();
});

test('writing pixel to canvas', function(t) {
	const c = Canvas(10, 20);
	const red = new colors.Color(1.0, 0.0, 0.0);
	writePixel(c, 2, 3, red);
	t.ok(pixelAt(c, 2, 3).equal(red));

	t.end();
});
