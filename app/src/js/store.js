import Vue from 'vue';
import Vuex from 'vuex';

import pkgJson from '../../package.json';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		appVersion: pkgJson.version,
	},
	getters: {},
	mutations: {},
	actions: {},
});

export default store;
