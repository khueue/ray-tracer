import * as colors from './colors';
import * as lights from './lights';
import * as materials from './materials';
import * as spheres from './spheres';
import * as transformations from './transformations';
import * as tuples from './tuples';
import * as worlds from './worlds';

export function newDefaultWorld() {
	const light = new lights.PointLight(
		new tuples.Point(-10, 10, -10),
		colors.white(),
	);

	const shape1 = new spheres.Sphere();
	shape1.material = new materials.Material();
	shape1.material.color = new colors.Color(0.8, 1.0, 0.6);
	shape1.material.diffuse = 0.7;
	shape1.material.specular = 0.2;

	const shape2 = new spheres.Sphere();
	shape2.transformation = transformations.scaling(0.5, 0.5, 0.5);

	const world = new worlds.World();
	world.light = light;
	world.setObject(shape1);
	world.setObject(shape2);

	// Return all the objects, for easy access.
	return {
		light,
		shape1,
		shape2,
		world,
	};
}
