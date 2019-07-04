import * as tuples from './tuples';

export class Ray {
	origin: tuples.Point;
	direction: tuples.Vector;

	constructor(origin: tuples.Point, direction: tuples.Vector) {
		this.origin = origin;
		this.direction = direction;
	}

	position(t: number) {
		const distance = this.direction.multiply(t);
		const position = this.origin.add(distance);
		return position;
	}
}
