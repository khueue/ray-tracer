import * as matrices from './matrices';
import * as tuples from './tuples';

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

export function shearing(
	xy: number,
	xz: number,
	yx: number,
	yz: number,
	zx: number,
	zy: number,
) {
	return new matrices.Matrix([
		[1, xy, xz, 0],
		[yx, 1, yz, 0],
		[zx, zy, 1, 0],
		[0, 0, 0, 1],
	]);
}

export function viewTransform(
	from: tuples.Point,
	to: tuples.Point,
	up: tuples.Vector,
) {
	const forward = to.subtract(from).normalize();
	const upNormalized = up.normalize();
	const left = forward.cross(upNormalized);
	const trueUp = left.cross(forward);

	const orientation = new matrices.Matrix([
		[left.x, left.y, left.z, 0.0],
		[trueUp.x, trueUp.y, trueUp.z, 0.0],
		[-forward.x, -forward.y, -forward.z, 0.0],
		[0.0, 0.0, 0.0, 1.0],
	]);
	return orientation.multiply(translation(-from.x, -from.y, -from.z));
}
