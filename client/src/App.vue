<template>
  <div
    id="app"
    :style="[theme]">
    <div
      :style="frameApp"
      class="wrapperApp">
      <globalNavMedium v-if="appWidthSize === 'medium'"/>
      <globalNavLarge v-if="appWidthSize === 'large'"/>
      <keep-alive include="BlogOrigin">
        <router-view @setViewport="setViewport"/>
      </keep-alive>
      <globalNavXSmall v-if="appWidthSize === 'xSmall'"/>
      <globalNavSmall v-if="appWidthSize === 'small'"/>
    </div>
  </div>
</template>

<script>
import 'normalize.css';
import { mapState } from 'vuex';
import axios from 'axios';
import { configApiUrl } from './../CONFIG/CONFIG';
import globalNavXSmall from './components/globalNav/xSmall.vue';
import globalNavSmall from './components/globalNav/small.vue';
import globalNavMedium from './components/globalNav/medium.vue';
import globalNavLarge from './components/globalNav/large.vue';

export default {
  name: 'App',
  components: {
    globalNavXSmall,
    globalNavSmall,
    globalNavMedium,
    globalNavLarge,
  },
  data() {
    return {
      appWidth: 0,
      appWidthSize: '',

      // widthMaxSizeXSmall: 420,
      // widthMaxSizeSmall: 740,
      // widthMaxSizeMedium: 1180,

      widthMaxSizeXSmall: 420,
      widthMaxSizeSmall: 440,
      widthMaxSizeMedium: 1180,

      appFrameExistence: false,

      views1: [
        '/mypage', '/user/signupdone',
      ],
      responsive: true,
      viewportHeight: 0,
    };
  },
  computed: {
    ...mapState('theme', ['theme']),

    frameApp() {
      return this.appFrameExistence
        ? '--frameApp: dashed'
        : '--frameApp: none';
    },
  },
  watch: {
    $route(to) {
      if (this.views1.indexOf(to.path) !== -1) {
        this.setViewport(false, 568);
      } else {
        this.setViewport(true, 568);
      }
    },
    appWidth(value) {
      if (value > 1440) {
        this.appFrameExistence = true;
      }
      if (value <= 1440) {
        this.appFrameExistence = false;
      }
      if (value <= this.widthMaxSizeXSmall) {
        this.appWidthSize = 'xSmall';
        return;
      }
      if (value <= this.widthMaxSizeSmall || this.$root.appHeight <= this.widthMaxSizeSmall) {
        this.appWidthSize = 'small';
        return;
      }
      if (value <= this.widthMaxSizeMedium) {
        this.appWidthSize = 'medium';
        return;
      }
      if (value > this.widthMaxSizeMedium) {
        this.appWidthSize = 'large';
      }
    },
    appWidthSize(value) {
      this.$root.appWidthSize = value;
    },
  },
  created() {
    this.$store.commit('username/initStoredUsername');
    this.$store.commit('theme/initStoredTheme');
    this.$store.commit('path/initStoredPath');
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem('username')));
    this.$root.zoomScale = window.devicePixelRatio;
    window.addEventListener('resize', () => {
      this.$root.zoomScale = window.devicePixelRatio;
      this.setViewport();
    });
  },
  methods: {
    async userAuthentication() {
      const response = await axios.post(`${configApiUrl}/user/authentication`, {
        username: this.usernameInput,
        password: this.passwordInput.trim(),
      }).catch(error => error.response);
      if (response.data.message === 'userSigninError'
          || response.data.message === 'nonexistentUser') {
        this.showMessage = true;
        return;
      }
      if (response.data.message === 'authSuccessful') {
        this.$store.commit('username/storeUsername', response.data.username);
        localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
        this.$router.replace({ path: `${this.$store.state.path.path}` });
      }
    },
    setViewport(responsive, viewportHeight) {
      if (responsive !== undefined) {
        this.responsive = responsive;
        this.viewportHeight = viewportHeight;
      }
      this.appWidth = window.innerWidth;
      this.$root.appHeight = window.innerHeight;
      if (this.$root.appHeight > this.appWidth) {
        if ((this.$root.appHeight / this.appWidth) > (568 / 320)) {
          document.querySelector("meta[name='viewport']")
            .setAttribute('content', 'width=320, maximum-scale=1.77, shrink-to-fit=no');
        } else {
          document.querySelector("meta[name='viewport']")
            .setAttribute('content', 'width=320, height=568, maximum-scale=1.77, shrink-to-fit=no');
        }
      } else if (this.$root.appHeight <= this.appWidth) {
        if (this.responsive === false) {
          document.querySelector("meta[name='viewport']")
            .setAttribute('content', `width=568, height=${this.viewportHeight}, maximum-scale=1.77, shrink-to-fit=no`);
        } else if (this.responsive === true) {
          if ((this.$root.appHeight / this.appWidth) > (320 / 568)) {
            document.querySelector("meta[name='viewport']")
              .setAttribute('content', 'width=568,  maximum-scale=1.77, shrink-to-fit=no');
          } else {
            document.querySelector("meta[name='viewport']")
              .setAttribute('content', 'width=568, height=320, maximum-scale=1.17, shrink-to-fit=no');
          }
        }
      }
    },
  },
};
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  outline: none;
  font-family: arial;
  box-sizing: border-box;
}
html, body{
  overflow-x: hidden;
  font-size: 16px;
  /* scrollbar-width: thin;
  scrollbar-color: #DCDCDC #FFFFFF; */
}
#app{
  background-color: var(--colorBody);
  overflow-x: hidden;
  overflow-y: hidden;
}
.wrapperApp{
  max-width: 1440px;
  max-height: 100vh;
  margin: auto;
  border-left: var(--frameApp) 1px #FFFFFF;
  border-right: var(--frameApp) 1px #FFFFFF;
}
::-webkit-scrollbar{
  width: 1.5px;
}
::-webkit-scrollbar-track{
  background: #FFFFFF;
}
::-webkit-scrollbar-thumb{
  background: #DCDCDC;
}
.previewDiv{
  color: var(--colorBody);
}
.inputTextarea{
  color: var(--colorBody);
}
a {
  color: var(--colorBodyLight);
  text-decoration:none;
}
input{
  color: var(--colorBody);
  height: 34px;
  font-size: 1.05rem;
  border: 1px;
  border-radius: 32px;
  padding: 0 1rem;
}
input::placeholder {
  color: var(--colorBodyLight);
  font-size: 0.9rem;
  text-align: center;
}
button[class~="normalButton"]{
  background: linear-gradient(to bottom, var(--colorBody), var(--colorBodyLight));
  color: #FFFFFF;
  height: 36px;
  font-size: 1.05rem;
  border : 2px solid;
  border-radius: 36px;
  padding: 0.3rem;
}
button[class~="secondButton"]{
  background: var(--colorBody);
  color: #FFFFFF;
  height: 36px;
  font-size: 1.05rem;
  border : 2px solid;
  border-radius: 36px;
  padding: 0.3rem;
}
div[class^="title"]{
  display: flex;
  height: 36px;
  font-size: 1.05rem;
  font-weight: bold;
  border: 2px solid;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  cursor: default;
}
div[class^="message"]{
  color: #FFFFFF;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  cursor: default;
}
</style>
