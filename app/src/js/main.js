import '../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';

import Vue from 'vue';

import router from '/js/router';
import store from '/js/store';

import App from '/js/App.vue';

Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	render(h) {
		return h(App);
	},
});

app.$mount('#app');
