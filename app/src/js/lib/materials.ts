import * as colors from './colors';

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
}
