import * as lights from './lights';
import * as spheres from './spheres';

export class World {
	light: lights.PointLight | null;
	objects: Map<number, spheres.Sphere>;

	constructor() {
		this.light = null;
		this.objects = new Map();
	}

	setLight(light: lights.PointLight) {
		this.light = light;
	}

	setObject(obj: spheres.Sphere) {
		this.objects.set(obj.id, obj);
	}
}
