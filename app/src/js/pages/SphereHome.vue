<script lang="ts">
import Vue from 'vue';

import * as colors from '../lib/colors';
import * as numbers from '../lib/numbers';
import * as tuples from '../lib/tuples';
import * as matrices from '../lib/matrices';
import * as spheres from '../lib/spheres';
import * as rays from '../lib/rays';
import * as materials from '../lib/materials';
import * as transformations from '../lib/transformations';
import * as lights from '../lib/lights';

export default Vue.extend({
	name: 'SphereHome',
	data() {
		return {
			id: 'sphere',
			width: 400,
			height: 400,
			canvas: null,
			progressPercent: 0,
			progressTimeMs: 0,
		};
	},
	computed: {
		progressTimeTakenSeconds() {
			return (this.progressTimeMs / 1000).toFixed(1);
		},
	},
	mounted() {
		const canvas = this.$refs[this.id];
		this.canvas = canvas;
		setTimeout(this.render, 0);
	},
	methods: {
		render() {
			const self = this;
			self.progressPercent = 0;
			self.progressTimeMs = 0;

			const ctx = this.canvas.getContext('2d');
			ctx.fillStyle = 'rgb(0, 0, 0)';
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			const rayOrigin = new tuples.Point(0, 0, -5);
			const wallZ = 10;
			const wallSize = 7;
			const half = wallSize / 2;
			const pixelSize = wallSize / this.canvas.width;

			const shape = new spheres.Sphere();
			shape.material.ambient = 0.1;
			shape.material.specular = 0.7;
			shape.material.shininess = 100;
			shape.material.color = new colors.Color(1, 0.3, 0.2);
			// shape.transformation = matrices.IDENTITY_44.scale(1, 0.5, 1).rotateZ(Math.PI / 6)

			const lightPosition = new tuples.Point(-10, 10, -10);
			const lightColor = new colors.Color(1, 1, 1);
			const light = new lights.PointLight(lightPosition, lightColor);

			const renderPixel = function(
				x: number,
				worldX: number,
				y: number,
				worldY: number,
			) {
				const position = new tuples.Point(worldX, worldY, wallZ);
				const ray = new rays.Ray(
					rayOrigin,
					position.subtract(rayOrigin).normalize(),
				);
				const xs = ray.intersects(shape);
				const hit = xs.hit();
				if (hit) {
					const point = ray.position(hit.t);
					const normal = hit.obj.normalAt(point);
					const eye = ray.direction.multiply(-1);
					const color = hit.obj.material.lighting(light, point, eye, normal);
					self.drawPixel(ctx, x, y, color);
				}
			};

			let workers = [];
			for (let y = 0; y < self.canvas.height; ++y) {
				const worldY = half - pixelSize * y;
				for (let x = 0; x < self.canvas.width; ++x) {
					const worldX = -half + pixelSize * x;
					workers.push(function() {
						renderPixel(x, worldX, y, worldY);
					});
				}
			}
			self.shuffleInPlace(workers);

			let numDone = 0;
			const totalPixels = self.canvas.width * self.canvas.height;
			const iterations = 25;
			const batchSize = workers.length / iterations;
			const before = new Date() as any;
			for (let i = 0; i < workers.length; i += batchSize) {
				const workerBatch = workers.slice(i, i + batchSize);
				setTimeout(function() {
					for (const worker of workerBatch) {
						worker();
						++numDone;
					}

					const percent = Math.round((numDone / totalPixels) * 100);
					self.progressPercent = percent;

					const after = new Date() as any;
					self.progressTimeMs = after - before;
				}, 0);
			}
		},
		shuffleInPlace<T>(a: T[]): void {
			for (let i = 0; i < a.length; ++i) {
				const randomI = numbers.randomIntInclusive(i, a.length - 1);
				[a[i], a[randomI]] = [a[randomI], a[i]];
			}
		},
		drawPixel(ctx, x, y, color) {
			if (
				0 <= x &&
				x < this.canvas.width &&
				0 <= y &&
				y < this.canvas.height
			) {
				const red = color.red * 255;
				const green = color.green * 255;
				const blue = color.blue * 255;
				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
				// y = this.height - y - 1; // To flip the y-axis.
				ctx.fillRect(x, y, 1, 1);
			} else {
				console.error(`Point (${x}, ${y}) is outside canvas`);
			}
		},
	},
});
</script>

<template lang="pug">
div.columns.is-vcentered
	div.column
		div.container.has-text-centered
			h1.title.has-text-grey-lighter Sphere
			p.subtitle.has-text-grey {{ progressPercent }}% &mdash; {{ progressTimeTakenSeconds }}s
			canvas(
				:ref="id"
				:id="id"
				:width="width"
				:height="height"
				@click="render()"
			)
</template>

<style lang="scss" scoped>
.columns {
	height: 100%;
}
</style>
