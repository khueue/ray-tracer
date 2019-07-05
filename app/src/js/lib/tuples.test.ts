import { test } from 'tap';

import * as numbers from './numbers';
import * as tuples from './tuples';

test('tuple with w=1 is a point', function(t) {
	const a = new tuples.Tuple(4.3, -4.2, 3.1, 1);
	t.ok(numbers.equal(a.x, 4.3));
	t.ok(numbers.equal(a.y, -4.2));
	t.ok(numbers.equal(a.z, 3.1));
	t.ok(numbers.equal(a.w, 1));
	t.ok(tuples.isPoint(a));
	t.ok(!tuples.isVector(a));

	t.end();
});

test('tuple with w=0 is a vector', function(t) {
	const a = new tuples.Tuple(4.3, -4.2, 3.1, 0);
	t.ok(numbers.equal(a.x, 4.3));
	t.ok(numbers.equal(a.y, -4.2));
	t.ok(numbers.equal(a.z, 3.1));
	t.ok(numbers.equal(a.w, 0));
	t.ok(!tuples.isPoint(a));
	t.ok(tuples.isVector(a));

	t.end();
});

test('Point() creates a point', function(t) {
	const a = new tuples.Point(4, -4, 3);
	const b = new tuples.Tuple(4, -4, 3, 1);
	t.ok(a.equal(b));
	t.ok(tuples.isTuple(a));
	t.ok(tuples.isPoint(a));

	t.end();
});

test('Vector() creates a vector', function(t) {
	const a = new tuples.Vector(4, -4, 3);
	const b = new tuples.Tuple(4, -4, 3, 0);
	t.ok(a.equal(b));
	t.ok(tuples.isTuple(a));
	t.ok(tuples.isVector(a));

	t.end();
});

test('adding two tuples', function(t) {
	const a = new tuples.Tuple(3, -2, 5, 1);
	const b = new tuples.Tuple(-2, 3, 1, 0);
	const result = a.add(b);
	t.ok(result.equal(new tuples.Point(1, 1, 6)));

	t.end();
});

test('subtracting two points', function(t) {
	const a = new tuples.Point(3, 2, 1);
	const b = new tuples.Point(5, 6, 7);
	const result = a.subtract(b);
	t.ok(result.equal(new tuples.Vector(-2, -4, -6)));

	t.end();
});

test('subtracting vector from point', function(t) {
	const a = new tuples.Point(3, 2, 1);
	const b = new tuples.Vector(5, 6, 7);
	const result = a.subtract(b);
	t.ok(result.equal(new tuples.Point(-2, -4, -6)));

	t.end();
});

test('subtracting two vectors', function(t) {
	const a = new tuples.Vector(3, 2, 1);
	const b = new tuples.Vector(5, 6, 7);
	const result = a.subtract(b);
	t.ok(result.equal(new tuples.Vector(-2, -4, -6)));

	t.end();
});

test('subtracting a vector from the zero vector', function(t) {
	const zero = new tuples.Vector(0, 0, 0);
	const v = new tuples.Vector(1, -2, 3);
	const result = zero.subtract(v);
	t.ok(result.equal(new tuples.Vector(-1, 2, -3)));

	t.end();
});

test('multiplying a tuple by a scalar', function(t) {
	const a = new tuples.Tuple(1, -2, 3, -4);
	const s = 3.5;
	const result = a.multiply(s);
	t.ok(result.equal(new tuples.Tuple(3.5, -7, 10.5, -14)));

	t.end();
});

test('multiplying a tuple by a fraction', function(t) {
	const a = new tuples.Tuple(1, -2, 3, -4);
	const s = 0.5;
	const result = a.multiply(s);
	t.ok(result.equal(new tuples.Tuple(0.5, -1, 1.5, -2)));

	t.end();
});

test('dividing a tuple by a scalar', function(t) {
	const a = new tuples.Tuple(1, -2, 3, -4);
	const s = 2;
	const result = a.divide(s);
	t.ok(result.equal(new tuples.Tuple(0.5, -1, 1.5, -2)));

	t.end();
});

test('negating a tuple', function(t) {
	const a = new tuples.Tuple(1, -2, 3, -4);
	const result = a.negate();
	t.ok(result.equal(new tuples.Tuple(-1, 2, -3, 4)));

	t.end();
});

test('computing magnitude of Vector(1, 0, 0)', function(t) {
	const v = new tuples.Vector(1, 0, 0);
	t.ok(numbers.equal(v.magnitude(), 1));

	t.end();
});

test('computing magnitude of Vector(0, 1, 0)', function(t) {
	const v = new tuples.Vector(0, 1, 0);
	t.ok(numbers.equal(v.magnitude(), 1));

	t.end();
});

test('computing magnitude of Vector(0, 0, 1)', function(t) {
	const v = new tuples.Vector(0, 0, 1);
	t.ok(numbers.equal(v.magnitude(), 1));

	t.end();
});

test('computing magnitude of Vector(1, 2, 3)', function(t) {
	const v = new tuples.Vector(1, 2, 3);
	t.ok(numbers.equal(v.magnitude(), Math.sqrt(14)));

	t.end();
});

test('computing magnitude of Vector(-1, -2, -3)', function(t) {
	const v = new tuples.Vector(-1, -2, -3);
	t.ok(numbers.equal(v.magnitude(), Math.sqrt(14)));

	t.end();
});

test('normalizing Vector(4, 0, 0) gives (1, 0, 0)', function(t) {
	const v = new tuples.Vector(4, 0, 0);
	t.ok(v.normalize().equal(new tuples.Vector(1, 0, 0)));

	t.end();
});

test('normalizing Vector(1, 2, 3)', function(t) {
	const v = new tuples.Vector(1, 2, 3);
	t.ok(v.normalize().equal(new tuples.Vector(0.26726, 0.53452, 0.80178)));

	t.end();
});

test('magnitude of normalized vector', function(t) {
	const v = new tuples.Vector(1, 2, 3);
	const norm = v.normalize();
	t.ok(numbers.equal(norm.magnitude(), 1));

	t.end();
});

test('dot product of two tuples', function(t) {
	const a = new tuples.Vector(1, 2, 3);
	const b = new tuples.Vector(2, 3, 4);
	t.ok(numbers.equal(a.dot(b), 20));

	t.end();
});

test('cross product of two vectors', function(t) {
	const a = new tuples.Vector(1, 2, 3);
	const b = new tuples.Vector(2, 3, 4);
	t.ok(a.cross(b).equal(new tuples.Vector(-1, 2, -1)));
	t.ok(b.cross(a).equal(new tuples.Vector(1, -2, 1)));

	t.end();
});

test('fire projectile', function(t) {
	function projectile(position, velocity) {
		return {
			position,
			velocity,
		};
	}

	function environment(gravity, wind) {
		return {
			gravity,
			wind,
		};
	}

	function tick(env, proj) {
		const newPos = proj.position.add(proj.velocity);
		const newVelocity = proj.velocity.add(env.gravity).add(env.wind);
		return projectile(newPos, newVelocity);
	}

	const env = environment(
		new tuples.Vector(0, -0.1, 0),
		new tuples.Vector(-0.01, 0, 0)
	);
	let proj = projectile(
		new tuples.Point(0, 1, 0),
		new tuples.Vector(1, 1, 0).normalize()
	);

	// console.error('x, y:', proj.position.x, proj.position.y);
	let numTicks = 0;
	while (proj.position.y >= 0) {
		proj = tick(env, proj);
		++numTicks;
		// console.error('x, y:', proj.position.x, proj.position.y);
	}

	t.ok(numTicks == 17, 'should hit the ground');

	t.end();
});
