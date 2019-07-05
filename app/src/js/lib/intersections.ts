export class Intersection {
	readonly t: number;
	readonly obj: object;

	constructor(t: number, obj: object) {
		this.t = t;
		this.obj = obj;
	}
}

export class Intersections {
	readonly length: number;
	[xs: number]: Intersection;

	constructor(xs: Intersection[]) {
		this.length = xs.length;
		for (let i = 0; i < this.length; ++i) {
			this[i] = xs[i];
		}
	}
}
