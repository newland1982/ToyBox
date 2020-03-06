import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/failure/error',
      name: 'failureError',
      component: () =>
      import(/* webpackChunkName: "failureError" */ './pages/failure/error.vue'),
    },
    {
      path: '/failure/nouser',
      name: 'failureNouser',
      component: () =>
      import(/* webpackChunkName: "failureNouser" */ './pages/failure/nouser.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () =>
      import(/* webpackChunkName: "mypage" */ './pages/mypage/mypage.vue'),
    },
    {
      path: '/mypage/signuporsignin',
      name: 'mypageSigninorsignup',
      component: () =>
      import(/* webpackChunkName: "mypageSigninorsignup" */ './pages/mypage/signuporsignin.vue'),
    },
    {
      path: '/user/passwordchange',
      name: 'userPasswordchange',
      component: () =>
      import(/* webpackChunkName: "userPasswordchange" */ './pages/user/passwordchange.vue'),
    },
    {
      path: '/user/signin',
      name: 'userSignin',
      component: () =>
      import(/* webpackChunkName: "userSignin" */ './pages/user/signin.vue'),
    },
    {
      path: '/user/signout',
      name: 'userSignout',
      component: () =>
      import(/* webpackChunkName: "userSignout" */ './pages/user/signout.vue'),
    },
    {
      path: '/user/signup',
      name: 'userSignup',
      component: () =>
      import(/* webpackChunkName: "userSignup" */ './pages/user/signup.vue'),
    },
    {
      path: '/user/signupdone',
      name: 'userSignupdone',
      component: () =>
      import(/* webpackChunkName: "userSignupdone" */ './pages/user/signupdone.vue'),
    },
    {
      path: '/user/withdrawal1',
      name: 'userWithdrawal1',
      component: () =>
      import(/* webpackChunkName: "userWithdrawal1" */ './pages/user/withdrawal1.vue'),
    },
    {
      path: '/user/withdrawal2',
      name: 'userWithdrawal2',
      component: () =>
      import(/* webpackChunkName: "userWithdrawal2" */ './pages/user/withdrawal2.vue'),
    },
    {
      path: '/blog/origin',
      name: 'blogOrigin',
      component: () =>
      import(/* webpackChunkName: "blogOrigin" */ './pages/blog/origin.vue'),
    },
    {
      path: '*',
      name: 'notFound',
      component: () =>
      import(/* webpackChunkName: "notFound" */ './pages/failure/notFound.vue'),
    },
  ],
});
