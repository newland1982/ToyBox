/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "actions"] }] */
export default {

  namespaced: true,

  state: {
    username: 'anonymous',
  },

  mutations: {
    storeUsername(state, data) {
      state.username = data;
      localStorage.setItem('username', JSON.stringify(state.username));
    },
    initStoredUsername(state) {
      if (localStorage.username) {
        state.username = JSON.parse(localStorage.getItem('username'));
      }
    },
  },

};
