import * as matrices from './matrices';

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
}
