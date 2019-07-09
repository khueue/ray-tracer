import * as colors from './colors';
import * as tuples from './tuples';

export class PointLight {
	readonly position: tuples.Point;
	readonly intensity: colors.Color;

	constructor(position: tuples.Point, intensity: colors.Color) {
		this.position = position;
		this.intensity = intensity;
	}
}
