<script lang="ts">
import Vue from 'vue';

import * as cameras from '../lib/cameras';
import * as colors from '../lib/colors';
import * as numbers from '../lib/numbers';
import * as tuples from '../lib/tuples';
import * as matrices from '../lib/matrices';
import * as spheres from '../lib/spheres';
import * as rays from '../lib/rays';
import * as materials from '../lib/materials';
import * as transformations from '../lib/transformations';
import * as lights from '../lib/lights';
import * as worlds from '../lib/worlds';

export default Vue.extend({
	name: 'SphereHome',
	data() {
		return {
			id: 'world',
			width: 400,
			height: 300,
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

			const world = new worlds.World();
			world.light = new lights.PointLight(
				new tuples.Point(-10, 10, -10),
				colors.white(),
			);

			const camera = new cameras.Camera(self.width, self.height, Math.PI / 3);
			camera.transform = transformations.viewTransform(
				new tuples.Point(0, 1.5, -5),
				new tuples.Point(0, 1, 0),
				new tuples.Vector(0, 1, 0),
			);

			const floor = new spheres.Sphere();
			floor.transformation = transformations.scaling(10, 0.01, 10);
			floor.material.color = new colors.Color(1, 0.9, 0.9);
			floor.material.specular = 0;
			world.setObject(floor);

			const leftWall = new spheres.Sphere();
			leftWall.transformation = leftWall.transformation
				.scale(10, 0.01, 10)
				.rotateX(Math.PI / 2)
				.rotateY(-Math.PI / 4)
				.translate(0, 0, 5);
			leftWall.material = floor.material;
			world.setObject(leftWall);

			const rightWall = new spheres.Sphere();
			rightWall.transformation = rightWall.transformation
				.scale(10, 0.01, 10)
				.rotateX(Math.PI / 2)
				.rotateY(Math.PI / 4)
				.translate(0, 0, 5);
			rightWall.material = floor.material;
			world.setObject(rightWall);

			const middle = new spheres.Sphere();
			middle.transformation = middle.transformation.translate(-0.5, 1, 0.5);
			middle.material.color = new colors.Color(0.1, 1, 0.5);
			middle.material.diffuse = 0.7;
			middle.material.specular = 0.3;
			world.setObject(middle);

			const right = new spheres.Sphere();
			right.transformation = right.transformation
				.scale(0.5, 0.5, 0.5)
				.translate(1.5, 0.5, -0.5);
			right.material.color = new colors.Color(0.5, 1, 0.1);
			right.material.diffuse = 0.7;
			right.material.specular = 0.3;
			world.setObject(right);

			const left = new spheres.Sphere();
			left.transformation = left.transformation
				.scale(0.33, 0.33, 0.33)
				.translate(-1.5, 0.33, -0.75);
			left.material.color = new colors.Color(1, 0.8, 0.1);
			left.material.diffuse = 0.7;
			left.material.specular = 0.3;
			world.setObject(left);

			const image = camera.render(world);

			for (let x = 0; x < image.width; ++x) {
				for (let y = 0; y < image.height; ++y) {
					this.drawPixel(ctx, x, y, image[x][y]);
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
			h1.title.has-text-grey-lighter World
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
