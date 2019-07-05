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
			if (this[i].t >= 0) {
				return this[i];
			}
		}
		return null;
	}
}
