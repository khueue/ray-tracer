import * as tuples from './tuples';
import * as spheres from './spheres';
import * as intersections from './intersections';

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

	intersects(s: object) {
		const sphereToRay = this.origin.subtract(new tuples.Point(0, 0, 0));
		const a = this.direction.dot(this.direction);
		const b = this.direction.dot(sphereToRay) * 2;
		const c = sphereToRay.dot(sphereToRay) - 1;
		const discriminant = b * b - 4 * a * c;

		// Check if we have any intersections.
		if (discriminant < 0) {
			return new intersections.Intersections([]);
		}

		// Should these sub-calulations be broken out and reused?
		const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
		const x1 = new intersections.Intersection(t1, s);

		const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
		const x2 = new intersections.Intersection(t2, s);

		return new intersections.Intersections([x1, x2]);
	}
}
