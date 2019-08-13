import * as intersections from './intersections';
import * as matrices from './matrices';
import * as spheres from './spheres';
import * as tuples from './tuples';
import * as worlds from './worlds';

export class Ray {
	readonly origin: tuples.Point;
	readonly direction: tuples.Vector;

	constructor(origin: tuples.Point, direction: tuples.Vector) {
		this.origin = origin;
		this.direction = direction;
	}

	position(t: number) {
		const distance = this.direction.multiply(t);
		return this.origin.add(distance);
	}

	// NOTE: Only designed for spheres now.
	intersects(s: spheres.Sphere) {
		const ray = this.transform(s.transformation.inverse());
		const sphereToRay = ray.origin.subtract(tuples.POINT_ZERO);
		const a = ray.direction.dot(ray.direction);
		const b = ray.direction.dot(sphereToRay) * 2;
		const c = sphereToRay.dot(sphereToRay) - 1;
		const discriminant = b ** 2 - 4 * a * c;

		// Check if we have any intersections.
		if (discriminant < 0) {
			return new intersections.Intersections();
		}

		const doubleA = 2 * a;
		const sqrtDiscriminant = Math.sqrt(discriminant);
		const negativeB = -b;

		const t1 = (negativeB - sqrtDiscriminant) / doubleA;
		const x1 = new intersections.Intersection(t1, s);

		const t2 = (negativeB + sqrtDiscriminant) / doubleA;
		const x2 = new intersections.Intersection(t2, s);

		return new intersections.Intersections(x1, x2);
	}

	// NOTE: Performs too many sorts. Should optimize. Rewrite Intersections?
	intersectsWorld(w: worlds.World) {
		const allXs = [];
		for (const obj of w.objects.values()) {
			const xs = this.intersects(obj);
			for (let i = 0; i < xs.length; ++i) {
				allXs.push(xs[i]);
			}
		}
		return new intersections.Intersections(...allXs);
	}

	transform(m: matrices.Matrix) {
		const origin = m.multiplyByTuple(this.origin);
		const direction = m.multiplyByTuple(this.direction);
		return new Ray(origin, direction);
	}
}
