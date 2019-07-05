import * as tuples from './tuples';
import * as spheres from './spheres';

export class Ray {
	origin: tuples.Point;
	direction: tuples.Vector;

	constructor(origin: tuples.Point, direction: tuples.Vector) {
		this.origin = origin;
		this.direction = direction;
	}

	position(t: number) {
		const distance = this.direction.multiply(t);
		return this.origin.add(distance);
	}

	intersects(s: spheres.Sphere) {
		const sphereToRay = this.origin.subtract(new tuples.Point(0, 0, 0));
		const a = this.direction.dot(this.direction);
		const b = this.direction.dot(sphereToRay) * 2;
		const c = sphereToRay.dot(sphereToRay) - 1;
		const discriminant = b * b - 4 * a * c;

		// Check for intersections.
		if (discriminant < 0) {
			return [];
		}

		// Should these sub-calulations be broken out and reused?
		const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
		const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

		return [t1, t2];
	}
}
