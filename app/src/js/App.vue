<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'App',
});
</script>

<template lang="pug">
section
	router-view()
</template>

<style lang="scss" scoped>
section {
	height: 100%;
	width: 100%;
}
</style>
