/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "actions"] }] */
export default {

  namespaced: true,

  state: {
    theme:
    {
      '--colorBody': '#000000',
      '--colorBodyRGB': '0,0,0',
      '--colorBodyLight': '#444444',
    },

    colorSetBlack:
    {
      themeBody: '#000000',
      themeBodyRGB: '0,0,0',
      themeBodyLight: '#444444',
    },
    colorSetGray:
    {
      themeBody: '#444444',
      themeBodyRGB: '68,68,68',
      themeBodyLight: '#888888',
    },
    colorSetRed:
    {
      themeBody: '#440000',
      themeBodyRGB: '68,0,0',
      themeBodyLight: '#880000',
    },
    colorSetGreen:
    {
      themeBody: '#004400',
      themeBodyRGB: '0,68,0',
      themeBodyLight: '#008800',
    },
    colorSetBlue:
    {
      themeBody: '#000044',
      themeBodyRGB: '0,0,68',
      themeBodyLight: '#000088',
    },
  },

  mutations: {
    selectColor(state, colorSetName) {
      state.theme =
      {
        '--colorBody': state[colorSetName].themeBody,
        '--colorBodyRGB': state[colorSetName].themeBodyRGB,
        '--colorBodyLight': state[colorSetName].themeBodyLight,
      };
      localStorage.setItem('theme', JSON.stringify(state.theme));
    },
    initStoredTheme(state) {
      Object.assign(state.theme, JSON.parse(localStorage.getItem('theme')));
    },
  },

};
