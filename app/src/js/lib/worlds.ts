import * as colors from './colors';
import * as intersections from './intersections';
import * as lights from './lights';
import * as rays from './rays';
import * as spheres from './spheres';

export class World {
	light: lights.PointLight;
	objects: Map<number, spheres.Sphere>;

	constructor() {
		this.light = lights.defaultLight();
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

	colorAt(ray: rays.Ray) {
		const inters = ray.intersectsWorld(this);
		const hit = inters.hit();
		if (hit) {
			const comps = hit.computations(ray);
			const color = this.shadeHit(comps);
			return color;
		} else {
			return colors.black();
		}
	}
}
