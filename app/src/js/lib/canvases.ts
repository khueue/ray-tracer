import * as colors from './colors';

const COLOR_BLACK = new colors.Color(0, 0, 0);

export class Canvas {
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		for (let x = 0; x < width; ++x) {
			this[x] = [];
			for (let y = 0; y < height; ++y) {
				this[x][y] = COLOR_BLACK;
			}
		}
	}
}
