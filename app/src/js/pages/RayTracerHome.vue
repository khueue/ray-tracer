<script lang="js">
const colors = require('/js/lib/colors');

export default {
	data() {
		return {
			id: 'ray-tracer',
			width: 640,
			height: 480,
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
			const context = this.canvas.getContext('2d');
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			function getRandomInt(max) {
				return Math.floor(Math.random() * Math.floor(max));
			}

			for (let x = 0; x < this.canvas.width; ++x) {
				for (let y = 0; y < this.canvas.height; ++y) {
					const c = colors.color(
						getRandomInt(255),
						getRandomInt(255),
						getRandomInt(255),
					);
					this.writePixel(context, x, y, c);
				}
			}
		},
		writePixel(context, x, y, color) {
			context.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
			context.fillRect(x, y, 1, 1);
		},
	},
};
</script>

<template lang="pug">
section
	h1.title Ray Tracer!
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
	border: 1px solid black;
}
</style>
