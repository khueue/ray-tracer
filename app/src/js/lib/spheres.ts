import * as tuples from './tuples';

let UNIQUE_ID = 0;

function nextId() {
	return ++UNIQUE_ID;
}

export class Sphere {
	id: number;

	constructor() {
		this.id = nextId();
	}
}
