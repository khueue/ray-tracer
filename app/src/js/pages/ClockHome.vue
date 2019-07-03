<script lang="js">
import Vue from 'vue';

import * as colors from '../lib/colors';
import * as tuples from '../lib/tuples';
import * as matrices from '../lib/matrices';

export default Vue.extend({
	data() {
		return {
			id: 'projectile',
			width: 900,
			height: 550,
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

			const center = new tuples.Point(this.canvas.width / 2, this.canvas.height / 2, 0);
			this.drawPixel(ctx, center.x, center.y, new colors.Color(0.6, 0.6, 0.6));

			const radius = this.canvas.height * 0.35;
			const numPoints = 12;
			const twelve = new tuples.Point(0, 1, 0);

			for (let i = 0; i < numPoints; ++i) {
				// Rotate each hour relative to twelve.
				const rotation = matrices.IDENTITY_44.rotateZ(i * (2 * Math.PI / numPoints));
				const hourRelative = rotation.multiply(twelve);
				console.log(hourRelative);

				// Size and position point around center point.
				const hourPositioned = hourRelative.multiply(radius).add(center);
				// console.log(hourPositioned);

				this.drawPixel(ctx, hourPositioned.x, hourPositioned.y, new colors.Color(1.0, 1.0, 1.0));
			}
		},
		drawPixel(ctx, x, y, color) {
			if (0 <= x && x < this.canvas.width && 0 <= y && y < this.canvas.height) {
				const red = color.red * 255;
				const green = color.green * 255;
				const blue = color.blue * 255;
				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
				y = this.height - y - 1; // To draw from the bottom.
				ctx.fillRect(x, y, 2, 2);
			} else {
				console.error(`Point (${x},${y}) is outside canvas`);
			}
		},
	},
});
</script>

<template lang="pug">
section
	h1.title Clock
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
