import * as colors from './colors';

export class Canvas {
	readonly width: number;
	readonly height: number;
	[m: number]: colors.Color[];

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		for (let x = 0; x < width; ++x) {
			this[x] = [];
			for (let y = 0; y < height; ++y) {
				this[x][y] = colors.BLACK;
			}
		}
	}
}
