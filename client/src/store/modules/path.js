/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "actions"] }] */
export default {

  namespaced: true,

  state: {
    path: '/mypage',
  },

  mutations: {
    storePath(state, data) {
      state.path = data;
      localStorage.setItem('path', JSON.stringify(state.path));
    },
    initStoredPath(state) {
      if (JSON.parse(localStorage.getItem('path'))) {
        state.path = JSON.parse(localStorage.getItem('path'));
      }
    },
  },

};
