import * as numbers from './numbers';

export class Tuple {
	readonly x: number;
	readonly y: number;
	readonly z: number;
	w: number; // NOTE: See Sphere.normalAt().

	constructor(x: number, y: number, z: number, w: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	equal(b: Tuple) {
		return (
			numbers.equal(this.x, b.x) &&
			numbers.equal(this.y, b.y) &&
			numbers.equal(this.z, b.z) &&
			numbers.equal(this.w, b.w)
		);
	}

	add(b: Tuple) {
		return new Tuple(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
	}

	subtract(b: Tuple) {
		return new Tuple(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
	}

	multiply(scalar: number) {
		return new Tuple(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar,
			this.w * scalar,
		);
	}

	divide(scalar: number) {
		return new Tuple(
			this.x / scalar,
			this.y / scalar,
			this.z / scalar,
			this.w / scalar,
		);
	}

	negate() {
		return new Tuple(-this.x, -this.y, -this.z, -this.w);
	}

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
	}

	normalize() {
		const mag = this.magnitude();
		return new Tuple(this.x / mag, this.y / mag, this.z / mag, this.w / mag);
	}

	dot(b: Tuple) {
		return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
	}

	cross(b: Tuple) {
		return new Vector(
			this.y * b.z - this.z * b.y,
			this.z * b.x - this.x * b.z,
			this.x * b.y - this.y * b.x,
		);
	}

	reflect(normal: Vector): Vector {
		return this.subtract(normal.multiply(2).multiply(this.dot(normal)));
	}
}

export class Point extends Tuple {
	constructor(x: number, y: number, z: number) {
		super(x, y, z, 1);
	}
}

export class Vector extends Tuple {
	constructor(x: number, y: number, z: number) {
		super(x, y, z, 0);
	}
}

export function isTuple(a: unknown): a is Tuple {
	return a instanceof Tuple;
}

export function isPoint(a: unknown): a is Point {
	return a instanceof Tuple && numbers.equal(a.w, 1);
}

export function isVector(a: unknown): a is Vector {
	return a instanceof Tuple && numbers.equal(a.w, 0);
}

export const POINT_ZERO = new Point(0, 0, 0);
