import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
new Vue({
  data: {
    appWidthSize: '',
    appHeight: 0,
    zoomScale: 1,

    // suspendedStatePostImageBlogOrigin: false,
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
