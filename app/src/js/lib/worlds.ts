import * as intersections from './intersections';
import * as lights from './lights';
import * as spheres from './spheres';

export class World {
	light: lights.PointLight;
	objects: Map<number, spheres.Sphere>;

	constructor() {
		this.light = lights.DEFAULT_LIGHT;
		this.objects = new Map();
	}

	setObject(obj: spheres.Sphere) {
		this.objects.set(obj.id, obj);
	}

	shadeHit(comps: intersections.Computations) {
		return comps.obj.material.lighting(
			this.light,
			comps.point,
			comps.eyeV,
			comps.normalV,
		);
	}
}
