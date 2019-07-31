import Vue from 'vue';
import Vuex from 'vuex';

import * as pkgJson from '../../package.json';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		appVersion: pkgJson.version,
	},
	getters: {},
	mutations: {},
	actions: {},
});
