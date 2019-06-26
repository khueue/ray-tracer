const numbers = require('./numbers');

function Tuple(x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

function Point(x, y, z) {
	return new Tuple(x, y, z, 1.0);
}

function Vector(x, y, z) {
	return new Tuple(x, y, z, 0.0);
}

Tuple.prototype.equal = function(b) {
	return (
		numbers.equal(this.x, b.x) &&
		numbers.equal(this.y, b.y) &&
		numbers.equal(this.z, b.z) &&
		numbers.equal(this.w, b.w)
	);
};

Tuple.prototype.add = function(b) {
	return new Tuple(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
};

Tuple.prototype.subtract = function(b) {
	return new Tuple(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
};

Tuple.prototype.multiply = function(scalar) {
	return new Tuple(
		this.x * scalar,
		this.y * scalar,
		this.z * scalar,
		this.w * scalar
	);
};

Tuple.prototype.divide = function(scalar) {
	return new Tuple(
		this.x / scalar,
		this.y / scalar,
		this.z / scalar,
		this.w / scalar
	);
};

Tuple.prototype.negate = function() {
	return new Tuple(-this.x, -this.y, -this.z, -this.w);
};

Tuple.prototype.magnitude = function() {
	return Math.sqrt(
		this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	);
};

Tuple.prototype.normalize = function() {
	const mag = this.magnitude();
	return new Tuple(this.x / mag, this.y / mag, this.z / mag, this.w / mag);
};

Tuple.prototype.dot = function(b) {
	return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
};

Tuple.prototype.cross = function(b) {
	return new Vector(
		this.y * b.z - this.z * b.y,
		this.z * b.x - this.x * b.z,
		this.x * b.y - this.y * b.x
	);
};

function isTuple(a) {
	// NOTE: Extremely basic check.
	return typeof a.w !== 'undefined';
}

function isPoint(a) {
	return isTuple(a) && numbers.equal(a.w, 1.0);
}

function isVector(a) {
	return isTuple(a) && numbers.equal(a.w, 0.0);
}

module.exports = {
	Tuple,
	Point,
	Vector,
	isTuple,
	isPoint,
	isVector,
};
