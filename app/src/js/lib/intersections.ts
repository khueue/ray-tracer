// import * as tuples from './tuples';
// import * as spheres from './spheres';

export class Intersection {
	t: number;
	obj: object;

	constructor(t: number, obj: object) {
		this.t = t;
		this.obj = obj;
	}
}

export class Intersections {
	length: number;
	[xs: number]: Intersection;

	constructor(xs: Intersection[]) {
		this.length = xs.length;
		for (let i = 0; i < this.length; ++i) {
			this[i] = xs[i];
		}
	}
}
