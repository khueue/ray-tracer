import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/world',
			component() {
				return import('/js/pages/WorldHome.vue');
			},
		},
		{
			path: '/sphere',
			component() {
				return import('/js/pages/SphereHome.vue');
			},
		},
		{
			path: '/circle',
			component() {
				return import('/js/pages/CircleHome.vue');
			},
		},
		{
			path: '/clock',
			component() {
				return import('/js/pages/ClockHome.vue');
			},
		},
		{
			path: '/projectile',
			component() {
				return import('/js/pages/ProjectileHome.vue');
			},
		},
		{
			path: '*',
			component() {
				return import('/js/pages/WorldHome.vue');
			},
		},
	],
});
