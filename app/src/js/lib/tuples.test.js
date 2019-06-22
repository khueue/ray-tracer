const test = require('tap').test;

const {
	Tuple,
	Point,
	Vector,
	equal,
	isPoint,
	isVector,
	add,
	sub,
	mult,
	div,
	negate,
	magnitude,
	normalize,
	dot,
	cross,
} = require('./tuples');

const numbers = require('./numbers');

test('tuple with w=1.0 is a point', function(t) {
	const a = Tuple(4.3, -4.2, 3.1, 1.0);
	t.ok(numbers.equal(a.x, 4.3));
	t.ok(numbers.equal(a.y, -4.2));
	t.ok(numbers.equal(a.z, 3.1));
	t.ok(numbers.equal(a.w, 1.0));
	t.ok(isPoint(a));
	t.ok(!isVector(a));

	t.end();
});

test('tuple with w=0.0 is a vector', function(t) {
	const a = Tuple(4.3, -4.2, 3.1, 0.0);
	t.ok(numbers.equal(a.x, 4.3));
	t.ok(numbers.equal(a.y, -4.2));
	t.ok(numbers.equal(a.z, 3.1));
	t.ok(numbers.equal(a.w, 0.0));
	t.ok(!isPoint(a));
	t.ok(isVector(a));

	t.end();
});

test('point() creates a point', function(t) {
	const a = Point(4, -4, 3);
	const b = Tuple(4, -4, 3, 1);
	t.ok(equal(a, b));

	t.end();
});

test('Vector() creates a vector', function(t) {
	const a = Vector(4, -4, 3);
	const b = Tuple(4, -4, 3, 0);
	t.ok(equal(a, b));

	t.end();
});

test('adding two tuples', function(t) {
	const a = Tuple(3, -2, 5, 1);
	const b = Tuple(-2, 3, 1, 0);
	const result = add(a, b);
	t.ok(equal(result, { x: 1, y: 1, z: 6, w: 1 }));

	t.end();
});

test('subtracting two points', function(t) {
	const a = Point(3, 2, 1);
	const b = Point(5, 6, 7);
	const result = sub(a, b);
	t.ok(equal(result, Vector(-2, -4, -6)));

	t.end();
});

test('subtracting vector from point', function(t) {
	const a = Point(3, 2, 1);
	const b = Vector(5, 6, 7);
	const result = sub(a, b);
	t.ok(equal(result, Point(-2, -4, -6)));

	t.end();
});

test('subtracting two vectors', function(t) {
	const a = Vector(3, 2, 1);
	const b = Vector(5, 6, 7);
	const result = sub(a, b);
	t.ok(equal(result, Vector(-2, -4, -6)));

	t.end();
});

test('subtracting a vector from the zero vector', function(t) {
	const zero = Vector(0, 0, 0);
	const v = Vector(1, -2, 3);
	const result = sub(zero, v);
	t.ok(equal(result, Vector(-1, 2, -3)));

	t.end();
});

test('multiplying a tuple by a scalar', function(t) {
	const a = Tuple(1, -2, 3, -4);
	const s = 3.5;
	const result = mult(a, s);
	t.ok(equal(result, Tuple(3.5, -7, 10.5, -14)));

	t.end();
});

test('multiplying a tuple by a fraction', function(t) {
	const a = Tuple(1, -2, 3, -4);
	const s = 0.5;
	const result = mult(a, s);
	t.ok(equal(result, Tuple(0.5, -1, 1.5, -2)));

	t.end();
});

test('dividing a tuple by a scalar', function(t) {
	const a = Tuple(1, -2, 3, -4);
	const s = 2;
	const result = div(a, s);
	t.ok(equal(result, Tuple(0.5, -1, 1.5, -2)));

	t.end();
});

test('negating a tuple', function(t) {
	const a = Tuple(1, -2, 3, -4);
	const result = negate(a);
	t.ok(equal(result, Tuple(-1, 2, -3, 4)));

	t.end();
});

test('computing magnitude of Vector(1, 0, 0)', function(t) {
	const v = Vector(1, 0, 0);
	t.ok(numbers.equal(magnitude(v), 1));

	t.end();
});

test('computing magnitude of Vector(0, 1, 0)', function(t) {
	const v = Vector(0, 1, 0);
	t.ok(numbers.equal(magnitude(v), 1));

	t.end();
});

test('computing magnitude of Vector(0, 0, 1)', function(t) {
	const v = Vector(0, 0, 1);
	t.ok(numbers.equal(magnitude(v), 1));

	t.end();
});

test('computing magnitude of Vector(1, 2, 3)', function(t) {
	const v = Vector(1, 2, 3);
	t.ok(numbers.equal(magnitude(v), Math.sqrt(14)));

	t.end();
});

test('computing magnitude of Vector(-1, -2, -3)', function(t) {
	const v = Vector(-1, -2, -3);
	t.ok(numbers.equal(magnitude(v), Math.sqrt(14)));

	t.end();
});

test('normalizing Vector(4, 0, 0) gives (1, 0, 0)', function(t) {
	const v = Vector(4, 0, 0);
	t.ok(equal(normalize(v), Vector(1, 0, 0)));

	t.end();
});

test('normalizing Vector(1, 2, 3)', function(t) {
	const v = Vector(1, 2, 3);
	t.ok(
		equal(normalize(v), Vector(0.26726, 0.53452, 0.80178))
	);

	t.end();
});

test('magnitude of normalized vector', function(t) {
	const v = Vector(1, 2, 3);
	const norm = normalize(v);
	t.ok(numbers.equal(magnitude(norm), 1));

	t.end();
});

test('dot product of two tuples', function(t) {
	const a = Vector(1, 2, 3);
	const b = Vector(2, 3, 4);
	t.ok(numbers.equal(dot(a, b), 20));

	t.end();
});

test('cross product of two vectors', function(t) {
	const a = Vector(1, 2, 3);
	const b = Vector(2, 3, 4);
	t.ok(equal(cross(a, b), Vector(-1, 2, -1)));
	t.ok(equal(cross(b, a), Vector(1, -2, 1)));

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
		const newPos = add(proj.position, proj.velocity);
		const newVelocity = add(
			add(proj.velocity, env.gravity),
			env.wind
		);
		return projectile(newPos, newVelocity);
	}

	const env = environment(
		Vector(0, -0.1, 0),
		Vector(-0.01, 0, 0)
	);
	let proj = projectile(
		Point(0, 1, 0),
		normalize(Vector(1, 1, 0))
	);

	console.log('x, y:', proj.position.x, proj.position.y);
	let numTicks = 0;
	while (proj.position.y >= 0) {
		proj = tick(env, proj);
		++numTicks;
		console.log('x, y:', proj.position.x, proj.position.y);
	}

	t.ok(numTicks == 17, 'should hit the ground');

	t.end();
});
