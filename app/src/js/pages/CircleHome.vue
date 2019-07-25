<script lang="ts">
import Vue from 'vue';

import * as colors from '../lib/colors';
import * as tuples from '../lib/tuples';
import * as matrices from '../lib/matrices';
import * as spheres from '../lib/spheres';
import * as rays from '../lib/rays';
import * as transformations from '../lib/transformations';

export default Vue.extend({
	data() {
		return {
			id: 'circle',
			width: 400,
			height: 400,
			canvas: null,
			progressPercent: 0,
			progressTimeMs: 0,
		};
	},
	computed: {
		progressTimeTakenSeconds() {
			return (Math.round(this.progressTimeMs / 100) * 100) / 1000;
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
			ctx.fillStyle = `rgb(0, 0, 0)`;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			const rayOrigin = new tuples.Point(0, 0, -5);
			const wallZ = 10;
			const wallSize = 7;
			const half = wallSize / 2;
			const pixelSize = wallSize / this.canvas.width;
			const color = new colors.Color(1, 0.6, 0.4);
			const shape = new spheres.Sphere();

			// Try transformations:
			// shape.transformation = matrices.IDENTITY_44.scale(1, 0.4, 1);

			const renderRow = function(y: number) {
				const worldY = half - pixelSize * y;
				for (let x = 0; x < self.canvas.width; ++x) {
					const worldX = -half + pixelSize * x;
					const position = new tuples.Point(worldX, worldY, wallZ);
					const r = new rays.Ray(
						rayOrigin,
						position.subtract(rayOrigin).normalize(),
					);
					const xs = r.intersects(shape);
					if (xs.hit()) {
						self.drawPixel(ctx, x, y, color);
					}
				}
			};

			const before = new Date() as any;
			for (let y = 0; y < self.canvas.height; ++y) {
				setTimeout(function() {
					renderRow(y);

					const percent = Math.round(((y + 1) / self.canvas.height) * 100);
					self.progressPercent = percent;

					const after = new Date() as any;
					self.progressTimeMs = after - before;
				}, 0);
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
				// y = this.height - y - 1; // To draw from the bottom.
				ctx.fillRect(x, y, 1, 1);
			} else {
				console.error(`Point (${x},${y}) is outside canvas`);
			}
		},
	},
});
</script>

<template lang="pug">
div.columns.is-vcentered
	div.column
		div.container.has-text-centered
			h1.title Circle
			p.subtitle {{ progressPercent }} % | {{ progressTimeTakenSeconds }} s
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

canvas {
	border: 1px solid black;
}
</style>
