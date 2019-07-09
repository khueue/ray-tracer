import * as colors from './colors';
import * as numbers from './numbers';
import * as tuples from './tuples';
import * as lights from './lights';

export class Material {
	color: colors.Color;
	ambient: number; // 0-1
	diffuse: number; // 0-1
	specular: number; // 0-1
	shininess: number; // 10-200

	constructor() {
		this.color = colors.WHITE;
		this.ambient = 0.1;
		this.diffuse = 0.9;
		this.specular = 0.9;
		this.shininess = 200.0;
	}

	equal(b: Material) {
		return (
			this.color.equal(b.color) &&
			numbers.equal(this.ambient, b.ambient) &&
			numbers.equal(this.diffuse, b.diffuse) &&
			numbers.equal(this.specular, b.specular) &&
			numbers.equal(this.shininess, b.shininess)
		);
	}

	lighting(
		light: lights.PointLight,
		point: tuples.Point,
		eyeV: tuples.Vector,
		normalV: tuples.Vector
	) {
		const effectiveColor = this.color.multiply(light.intensity);
		const lightV = light.position.subtract(point).normalize();
		const lightDotNormal = lightV.dot(normalV);

		const ambient = effectiveColor.multiply(
			new colors.Color(this.ambient, this.ambient, this.ambient)
		);
		let diffuse: colors.Color;
		let specular: colors.Color;

		if (lightDotNormal < 0) {
			diffuse = colors.BLACK;
			specular = colors.BLACK;
		} else {
			diffuse = effectiveColor
				.multiply(new colors.Color(this.diffuse, this.diffuse, this.diffuse))
				.multiply(
					new colors.Color(lightDotNormal, lightDotNormal, lightDotNormal)
				);
			const reflectV = lightV.multiply(-1).reflect(normalV);
			const reflectDotEye = reflectV.dot(eyeV);
			if (reflectDotEye <= 0) {
				specular = colors.BLACK;
			} else {
				const factor = reflectDotEye ** this.shininess;
				specular = light.intensity
					.multiply(
						new colors.Color(this.specular, this.specular, this.specular)
					)
					.multiply(new colors.Color(factor, factor, factor));
			}
		}
		return ambient.add(diffuse).add(specular);
	}
}
