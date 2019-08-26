import * as rays from './rays';
import * as spheres from './spheres';
import * as tuples from './tuples';

export class Intersection {
	readonly t: number;
	readonly obj: spheres.Sphere;

	constructor(t: number, obj: spheres.Sphere) {
		this.t = t;
		this.obj = obj;
	}

	computations(ray: rays.Ray) {
		return new Computations(this, ray);
	}
}

export class Intersections {
	readonly length: number;
	[xs: number]: Intersection;

	constructor(...xs: Intersection[]) {
		xs.sort(function(a, b) {
			return a.t < b.t ? -1 : 1;
		});
		this.length = xs.length;
		for (let i = 0; i < this.length; ++i) {
			this[i] = xs[i];
		}
	}

	hit(): Intersection | null {
		for (let i = 0; i < this.length; ++i) {
			const x = this[i];
			if (x.t >= 0) {
				return x;
			}
		}
		return null;
	}
}

export class Computations {
	readonly t: number;
	readonly obj: spheres.Sphere;
	readonly point: tuples.Point;
	readonly eyeV: tuples.Vector;
	readonly normalV: tuples.Vector;
	readonly inside: boolean;

	constructor(intersection: Intersection, ray: rays.Ray) {
		this.t = intersection.t;
		this.obj = intersection.obj;
		this.point = ray.position(intersection.t);
		this.eyeV = ray.direction.negate();
		this.normalV = this.obj.normalAt(this.point);
		if (this.normalV.dot(this.eyeV) < 0) {
			this.inside = true;
			this.normalV = this.normalV.negate();
		} else {
			this.inside = false;
		}
	}
}
