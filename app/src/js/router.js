import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/sphere',
			component: function() {
				return import('/js/pages/SphereHome');
			},
		},
		{
			path: '/circle',
			component: function() {
				return import('/js/pages/CircleHome');
			},
		},
		{
			path: '/clock',
			component: function() {
				return import('/js/pages/ClockHome');
			},
		},
		{
			path: '/projectile',
			component: function() {
				return import('/js/pages/ProjectileHome');
			},
		},
		{
			path: '*',
			component: function() {
				return import('/js/pages/SphereHome');
			},
		},
	],
});

export default router;
