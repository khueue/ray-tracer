import '@fortawesome/fontawesome-free/js/all.min';

import Vue from 'vue';

import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	render(h) {
		return h(App);
	},
});

app.$mount('#app');
