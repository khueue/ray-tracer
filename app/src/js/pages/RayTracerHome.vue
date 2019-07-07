<script lang="ts">
import Vue from 'vue';

import * as colors from '../lib/colors';
import * as tuples from '../lib/tuples';

export default Vue.extend({
	data() {
		return {
			id: 'ray-tracer',
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
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			function getRandomInt(max) {
				return Math.floor(Math.random() * Math.floor(max));
			}

			for (let x = 0; x < this.canvas.width; ++x) {
				for (let y = 0; y < this.canvas.height; ++y) {
					const c = new colors.Color(
						getRandomInt(255),
						getRandomInt(255),
						getRandomInt(255)
					);
					this.drawPixel(ctx, x, y, c);
				}
			}
		},
		drawPixel(ctx, x, y, color) {
			ctx.fillStyle = `rgb( ${color.red}, ${color.green}, ${color.blue} )`;
			y = this.height - y - 1; // To draw from the bottom.
			ctx.fillRect(x, y, 1, 1);
		},
	},
});
</script>

<template lang="pug">
section
	h1.title Ray Tracer
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
	border: 1px solid gray;
}
</style>
