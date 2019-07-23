const EPSILON = 0.00001;

export function equal(a: number, b: number) {
	return Math.abs(a - b) < EPSILON;
}

export function randomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
