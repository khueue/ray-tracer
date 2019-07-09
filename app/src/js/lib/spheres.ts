import * as matrices from './matrices';
import * as tuples from './tuples';
import * as materials from './materials';

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
		const inverseTransformation = this.transformation.inverse();

		const objectPoint = inverseTransformation.multiplyByTuple(worldPoint);
		const objectNormal = objectPoint.subtract(tuples.POINT_ZERO);

		const worldNormal = inverseTransformation
			.transpose()
			.multiplyByTuple(objectNormal);
		worldNormal.w = 0;
		return worldNormal.normalize();
	}
}
