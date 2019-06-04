import '../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';

import Vue from 'vue';

import router from '/js/router.js';
import store from '/js/store.js';

import App from '/js/components/App.vue';

Vue.config.productionTip = false;

window.app = new Vue({
	router,
	store,
	render(h) {
		return h(App);
	},
});

window.app.$mount('#app');
