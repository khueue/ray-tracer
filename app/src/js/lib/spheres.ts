import * as matrices from './matrices';
import * as tuples from './tuples';

let UNIQUE_ID = 0;

function nextId() {
	return ++UNIQUE_ID;
}

export class Sphere {
	readonly id: number;
	transformation: matrices.Matrix;

	constructor() {
		this.id = nextId();
		this.transformation = matrices.IDENTITY_44;
	}

	normalAt(p: tuples.Point) {
		return p.subtract(tuples.POINT_ZERO).normalize();
	}
}
