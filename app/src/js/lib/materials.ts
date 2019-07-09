import * as colors from './colors';
import * as numbers from './numbers';

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
}
