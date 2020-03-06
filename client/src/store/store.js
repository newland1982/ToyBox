import Vue from 'vue';
import Vuex from 'vuex';
import signupdone from './modules/signupdone';
import path from './modules/path';
import theme from './modules/theme';
import username from './modules/username';
import withdrawal from './modules/withdrawal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    signupdone,
    path,
    theme,
    username,
    withdrawal,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
