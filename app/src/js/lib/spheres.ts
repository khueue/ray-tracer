let UNIQUE_ID = 0;

function nextId() {
	return ++UNIQUE_ID;
}

export class Sphere {
	readonly id: number;

	constructor() {
		this.id = nextId();
	}
}
