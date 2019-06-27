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

test('scaling applied to point', function(t) {
	const transform = transformations.scaling(2, 3, 4);

	const p = new tuples.Point(-4, 6, 8);
	const scaledP = new tuples.Point(-8, 18, 32);

	t.ok(transform.multiply(p).equal(scaledP));

	t.end();
});

test('scaling applied to vector', function(t) {
	const transform = transformations.scaling(2, 3, 4);

	const v = new tuples.Vector(-4, 6, 8);
	const scaledV = new tuples.Vector(-8, 18, 32);

	t.ok(transform.multiply(v).equal(scaledV));

	t.end();
});

test('multiply by inverse of scaling matrix', function(t) {
	const transform = transformations.scaling(2, 3, 4);
	const inv = transform.inverse();

	const v = new tuples.Vector(-4, 6, 8);

	t.ok(inv.multiply(v).equal(new tuples.Vector(-2, 2, 2)));

	t.end();
});

test('reflection is scaling by negative value', function(t) {
	const transform = transformations.scaling(-1, 1, 1);

	const p = new tuples.Point(2, 3, 4);

	t.ok(transform.multiply(p).equal(new tuples.Point(-2, 3, 4)));

	t.end();
});
