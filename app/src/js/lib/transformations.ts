import * as matrices from './matrices';

export function translation(x: number, y: number, z: number) {
	return new matrices.Matrix([
		[1, 0, 0, x],
		[0, 1, 0, y],
		[0, 0, 1, z],
		[0, 0, 0, 1],
	]);
}

export function scaling(x: number, y: number, z: number) {
	return new matrices.Matrix([
		[x, 0, 0, 0],
		[0, y, 0, 0],
		[0, 0, z, 0],
		[0, 0, 0, 1],
	]);
}

export function rotationX(r: number) {
	const cosR = Math.cos(r);
	const sinR = Math.sin(r);
	return new matrices.Matrix([
		[1, 0, 0, 0],
		[0, cosR, -sinR, 0],
		[0, sinR, cosR, 0],
		[0, 0, 0, 1],
	]);
}

export function rotationY(r: number) {
	const cosR = Math.cos(r);
	const sinR = Math.sin(r);
	return new matrices.Matrix([
		[cosR, 0, sinR, 0],
		[0, 1, 0, 0],
		[-sinR, 0, cosR, 0],
		[0, 0, 0, 1],
	]);
}

export function rotationZ(r: number) {
	const cosR = Math.cos(r);
	const sinR = Math.sin(r);
	return new matrices.Matrix([
		[cosR, -sinR, 0, 0],
		[sinR, cosR, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
	]);
}
