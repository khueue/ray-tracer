import * as materials from './materials';
import * as matrices from './matrices';
import * as tuples from './tuples';

let UNIQUE_ID = 0;

function nextId() {
	return ++UNIQUE_ID;
}

export class Sphere {
	readonly id: number;
	transformation: matrices.Matrix;
	material: materials.Material;

	constructor() {
		this.id = nextId();
		this.transformation = matrices.IDENTITY_44;
		this.material = new materials.Material();
	}

	normalAt(worldPoint: tuples.Point) {
		const invTrans = this.transformation.inverse();

		const objectPoint = invTrans.multiplyByTuple(worldPoint);
		const objectNormal = objectPoint.subtract(tuples.POINT_ZERO);

		const worldNormal = invTrans.transpose().multiplyByTuple(objectNormal);
		worldNormal.w = 0;
		return worldNormal.normalize();
	}
}
