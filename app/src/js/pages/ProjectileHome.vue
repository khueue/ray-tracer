<script lang="ts">
import Vue from 'vue';

import * as colors from '../lib/colors';
import * as tuples from '../lib/tuples';

export default Vue.extend({
	name: 'ProjectileHome',
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
		projectile(position, velocity) {
			return {
				position,
				velocity,
			};
		},
		environment(gravity, wind) {
			return {
				gravity,
				wind,
			};
		},
		tick(env, proj) {
			const newPos = proj.position.add(proj.velocity);
			const newVelocity = proj.velocity.add(env.gravity).add(env.wind);
			return this.projectile(newPos, newVelocity);
		},
		render() {
			const ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			const start = new tuples.Point(0, 0, 0);
			const velocity = new tuples.Vector(1, 1.8, 0)
				.normalize()
				.multiply(11.25);
			let proj = this.projectile(start, velocity);
			const gravity = new tuples.Vector(0, -0.1, 0);
			const wind = new tuples.Vector(-0.01, 0, 0);
			const env = this.environment(gravity, wind);

			while (proj.position.y >= 0) {
				this.drawPixel(
					ctx,
					proj.position.x,
					proj.position.y,
					new colors.Color(1.0, 1.0, 1.0),
				);
				proj = this.tick(env, proj);
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
				y = this.height - y - 1; // To draw from the bottom.
				ctx.fillRect(x, y, 2, 2);
			}
		},
	},
});
</script>

<template lang="pug">
section
	h1.title Projectile
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
