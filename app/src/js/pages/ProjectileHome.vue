<script lang="js">
const colors = require('/js/lib/colors');
const tuples = require('/js/lib/tuples');

export default {
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
			const newPos = tuples.add(proj.position, proj.velocity);
			const newVelocity = tuples.add(
				tuples.add(proj.velocity, env.gravity),
				env.wind
			);
			return this.projectile(newPos, newVelocity);
		},
		render() {
			const ctx = this.canvas.getContext('2d');
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			const start = tuples.Point(0, 0, 0);
			const velocity = tuples.mult(
				tuples.normalize(tuples.Vector(1, 1.8, 0)),
				11.25
			);
			let proj = this.projectile(start, velocity);
			const gravity = tuples.Vector(0, -0.1, 0);
			const wind = tuples.Vector(-0.01, 0, 0);
			const env = this.environment(gravity, wind);

			while (proj.position.y >= 0) {
				this.writePixel(ctx, proj.position.x, proj.position.y, colors.Color(0.0, 0.0, 0.0));
				proj = this.tick(env, proj);
			}
		},
		writePixel(ctx, x, y, color) {
			ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
			y = this.height - y - 1; // To draw from the bottom.
			ctx.fillRect(x, y, 1, 1);
		},
	},
};
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
