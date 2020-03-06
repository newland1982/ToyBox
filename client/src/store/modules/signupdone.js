/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "actions"] }] */
export default {

  namespaced: true,

  state: {
    username: '',
    password: '',
  },

  mutations: {
    setUsername(state, data) {
      state.username = data;
    },
    setPassword(state, data) {
      state.password = data;
    },
  },

};
