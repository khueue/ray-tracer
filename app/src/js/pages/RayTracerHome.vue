<script lang="js">
const tuples = require('/js/lib/tuples');

export default {
	components: {
	},
	data() {
		return {
			p: tuples.point(1, 2, 3),
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
