import * as canvases from './canvases';
import * as matrices from './matrices';
import * as rays from './rays';
import * as tuples from './tuples';
import * as worlds from './worlds';

export class Camera {
	readonly hSize: number;
	readonly vSize: number;
	readonly fieldOfView: number;
	transform: matrices.Matrix;

	readonly halfWidth: number;
	readonly halfHeight: number;
	readonly pixelSize: number;

	constructor(hSize: number, vSize: number, fieldOfView: number) {
		this.hSize = hSize;
		this.vSize = vSize;
		this.fieldOfView = fieldOfView;
		this.transform = matrices.IDENTITY_44;

		const halfView = Math.tan(this.fieldOfView / 2);
		const aspect = this.hSize / this.vSize;
		if (aspect >= 1) {
			this.halfWidth = halfView;
			this.halfHeight = halfView / aspect;
		} else {
			this.halfWidth = halfView * aspect;
			this.halfHeight = halfView;
		}
		this.pixelSize = (this.halfWidth * 2) / this.hSize;
	}

	rayForPixel(x: number, y: number) {
		const xOffset = (x + 0.5) * this.pixelSize;
		const yOffset = (y + 0.5) * this.pixelSize;
		const worldX = this.halfWidth - xOffset;
		const worldY = this.halfHeight - yOffset;

		const invTrans = this.transform.inverse();
		const pixel = invTrans.multiply(new tuples.Point(worldX, worldY, -1));
		const origin = invTrans.multiply(new tuples.Point(0, 0, 0));
		const direction = pixel.subtract(origin).normalize();

		return new rays.Ray(origin, direction);
	}

	render(world: worlds.World) {
		const image = new canvases.Canvas(this.hSize, this.vSize);

		for (let y = 0; y < this.vSize; ++y) {
			for (let x = 0; x < this.hSize; ++x) {
				const ray = this.rayForPixel(x, y);
				const color = world.colorAt(ray);
				image[x][y] = color;
			}
		}

		return image;
	}

	getRenderWorkers(world: worlds.World) {
		const workers = [];

		const self = this;
		for (let y = 0; y < this.vSize; ++y) {
			for (let x = 0; x < this.hSize; ++x) {
				const worker = function() {
					const ray = self.rayForPixel(x, y);
					const color = world.colorAt(ray);
					return { x, y, color };
				};
				workers.push(worker);
			}
		}

		return workers;
	}
}
