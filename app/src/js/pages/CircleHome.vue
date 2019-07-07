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
			id: 'projectile',
			width: 400,
			height: 400,
			canvas: null,
		};
	},
	mounted() {
		const canvas = this.$refs[this.id];
		this.canvas = canvas;
		this.render();
	},
	methods: {
		render() {
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
			// shape.transformation = matrices.IDENTITY_44.scale(0.5, 1, 1);

			for (let y = 0; y < this.canvas.height; ++y) {
				const worldY = half - pixelSize * y;
				for (let x = 0; x < this.canvas.width; ++x) {
					const worldX = -half + pixelSize * x;
					const position = new tuples.Point(worldX, worldY, wallZ);
					const r = new rays.Ray(
						rayOrigin,
						position.subtract(rayOrigin).normalize()
					);
					const xs = r.intersects(shape);
					if (xs.hit()) {
						this.drawPixel(ctx, x, y, color);
					}
				}
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
section
	h1.title Circle
	canvas(
		:ref="id"
		:id="id"
		:width="width"
		:height="height"
	)
</template>

<style lang="scss" scoped>
section {
	text-align: center;
}

canvas {
	border: 1px solid grey;
}
</style>
