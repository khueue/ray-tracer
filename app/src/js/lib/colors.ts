import * as numbers from './numbers';

export class Color {
	readonly red: number;
	readonly green: number;
	readonly blue: number;

	constructor(red: number, green: number, blue: number) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	equal(b: Color) {
		return (
			numbers.equal(this.red, b.red) &&
			numbers.equal(this.green, b.green) &&
			numbers.equal(this.blue, b.blue)
		);
	}

	add(b: Color) {
		return new Color(
			this.red + b.red,
			this.green + b.green,
			this.blue + b.blue,
		);
	}

	subtract(b: Color) {
		return new Color(
			this.red - b.red,
			this.green - b.green,
			this.blue - b.blue,
		);
	}

	multiply(b: Color) {
		return new Color(
			this.red * b.red,
			this.green * b.green,
			this.blue * b.blue,
		);
	}

	// NOTE: Not obvious from book that this functionality is needed
	// (multiplying color components by a constant).
	scale(x: number) {
		return new Color(this.red * x, this.green * x, this.blue * x);
	}
}

export function black() {
	return new Color(0, 0, 0);
}

export function white() {
	return new Color(1, 1, 1);
}
