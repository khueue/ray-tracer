<script lang="js">
const tuple = require('/js/lib/tuple');

export default {
	components: {
	},
	data() {
		return {
			p: tuple.point(1, 2, 3),
		};
	},
	computed: {
	},
	mounted() {
	},
	methods: {
	},
};
</script>

<template lang="pug">
section
	h1 Ray Tracer!
	h2 {{ p }}
</template>

<style lang="scss" scoped>
</style>
