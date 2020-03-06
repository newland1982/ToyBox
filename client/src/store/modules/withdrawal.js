/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "actions"] }] */
export default {

  namespaced: true,

  state: {
    selectedUsername: '',
  },

  mutations: {
    selectedUsername(state, data) {
      state.selectedUsername = data;
    },
  },

};
