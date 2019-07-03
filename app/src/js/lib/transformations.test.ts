import { test } from 'tap';

import * as tuples from './tuples';
import * as matrices from './matrices';
import * as transformations from './transformations';

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

test('rotating point around x axis', function(t) {
	const p = new tuples.Point(0, 1, 0);
	let rotatedP: tuples.Point;

	const halfQuarter = transformations.rotationX(Math.PI / 4);
	rotatedP = new tuples.Point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
	t.ok(halfQuarter.multiply(p).equal(rotatedP));

	const fullQuarter = transformations.rotationX(Math.PI / 2);
	rotatedP = new tuples.Point(0, 0, 1);
	t.ok(fullQuarter.multiply(p).equal(rotatedP));

	t.end();
});

test('inverse rotation of x axis is opposite direction', function(t) {
	const p = new tuples.Point(0, 1, 0);

	const halfQuarter = transformations.rotationX(Math.PI / 4);
	const inv = halfQuarter.inverse();
	const rotatedP = new tuples.Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);

	t.ok(inv.multiply(p).equal(rotatedP));

	t.end();
});

test('rotating point around y axis', function(t) {
	const p = new tuples.Point(0, 0, 1);
	let rotatedP: tuples.Point;

	const halfQuarter = transformations.rotationY(Math.PI / 4);
	rotatedP = new tuples.Point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
	t.ok(halfQuarter.multiply(p).equal(rotatedP));

	const fullQuarter = transformations.rotationY(Math.PI / 2);
	rotatedP = new tuples.Point(1, 0, 0);
	t.ok(fullQuarter.multiply(p).equal(rotatedP));

	t.end();
});

test('rotating point around z axis', function(t) {
	const p = new tuples.Point(0, 1, 0);
	let rotatedP: tuples.Point;

	const halfQuarter = transformations.rotationZ(Math.PI / 4);
	rotatedP = new tuples.Point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
	t.ok(halfQuarter.multiply(p).equal(rotatedP));

	const fullQuarter = transformations.rotationZ(Math.PI / 2);
	rotatedP = new tuples.Point(-1, 0, 0);
	t.ok(fullQuarter.multiply(p).equal(rotatedP));

	t.end();
});

test('shearing moves x in proportion to y', function(t) {
	const shearing = transformations.shearing(1, 0, 0, 0, 0, 0);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(5, 3, 4)));

	t.end();
});

test('shearing moves x in proportion to z', function(t) {
	const shearing = transformations.shearing(0, 1, 0, 0, 0, 0);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(6, 3, 4)));

	t.end();
});

test('shearing moves y in proportion to x', function(t) {
	const shearing = transformations.shearing(0, 0, 1, 0, 0, 0);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(2, 5, 4)));

	t.end();
});

test('shearing moves y in proportion to z', function(t) {
	const shearing = transformations.shearing(0, 0, 0, 1, 0, 0);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(2, 7, 4)));

	t.end();
});

test('shearing moves z in proportion to x', function(t) {
	const shearing = transformations.shearing(0, 0, 0, 0, 1, 0);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(2, 3, 6)));

	t.end();
});

test('shearing moves z in proportion to y', function(t) {
	const shearing = transformations.shearing(0, 0, 0, 0, 0, 1);
	const p = new tuples.Point(2, 3, 4);

	t.ok(shearing.multiply(p).equal(new tuples.Point(2, 3, 7)));

	t.end();
});

test('individual transformations are applied in sequence', function(t) {
	const p = new tuples.Point(1, 0, 1);

	// Desired order.
	const a = transformations.rotationX(Math.PI / 2);
	const b = transformations.scaling(5, 5, 5);
	const c = transformations.translation(10, 5, 7);

	// Rotate.
	const p2 = a.multiply(p);
	t.ok(p2.equal(new tuples.Point(1, -1, 0)));

	// Scale.
	const p3 = b.multiply(p2);
	t.ok(p3.equal(new tuples.Point(5, -5, 0)));

	// Transform.
	const p4 = c.multiply(p3);
	t.ok(p4.equal(new tuples.Point(15, 0, 7)));

	t.end();
});

test('chained transformations must be applied in order', function(t) {
	const p = new tuples.Point(1, 0, 1);

	// Desired order.
	const a = transformations.rotationX(Math.PI / 2);
	const b = transformations.scaling(5, 5, 5);
	const c = transformations.translation(10, 5, 7);

	// Combined multiplication must be in reverse order.
	const combined = c.multiply(b).multiply(a);
	t.ok(combined.multiply(p).equal(new tuples.Point(15, 0, 7)));

	// Not commutative.
	const wrong = a.multiply(b).multiply(c);
	t.ok(!wrong.multiply(p).equal(new tuples.Point(15, 0, 7)));

	t.end();
});

test('chained transformations using matrix methods', function(t) {
	const p = new tuples.Point(1, 0, 1);

	const combined = matrices.IDENTITY_44.rotateX(Math.PI / 2)
		.scale(5, 5, 5)
		.translate(10, 5, 7);
	t.ok(combined.multiply(p).equal(new tuples.Point(15, 0, 7)));

	t.end();
});
