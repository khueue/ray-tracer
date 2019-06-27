const test = require('tap').test;

const tuples = require('./tuples');
const transformations = require('./transformations');

test('multiplying by translation matrix', function(t) {
	const transform = transformations.translation(5, -3, 2);

	const p = new tuples.Point(-3, 4, 5);
	const movedP = new tuples.Point(2, 1, 7);

	t.ok(transform.multiply(p).equal(movedP));

	t.end();
});

test('multiplying by inverse of translation matrix', function(t) {
	const transform = transformations.translation(5, -3, 2);
	const inv = transform.inverse();

	const p = new tuples.Point(-3, 4, 5);
	const movedP = new tuples.Point(-8, 7, 3);

	t.ok(inv.multiply(p).equal(movedP));

	t.end();
});

test('translation does not affect vectors', function(t) {
	const transform = transformations.translation(5, -3, 2);

	const v = new tuples.Vector(-3, 4, 5);

	t.ok(transform.multiply(v).equal(v));

	t.end();
});
