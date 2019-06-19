import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/projectile',
			component: function() {
				return import('/js/pages/ProjectileHome');
			},
		},
		{
			path: '*',
			component: function() {
				return import('/js/pages/RayTracerHome');
			},
		},
	],
});

export default router;
