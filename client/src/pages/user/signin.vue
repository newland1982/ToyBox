<template>
  <div class="wrapperSignin">
    <div
      class="containerSignin">
      <div class="boxSignin">
        <form @submit.prevent="submitSignin">
          <input
            v-model="usernameInput"
            class="inputUsernameSignin"
            placeholder="Username"
            spellcheck="false"
            autofocus>
          <input
            v-model="passwordInput"
            class="inputPasswordSignin"
            placeholder="Password"
            spellcheck="false">
          <div
            class="alertSignin">
            {{ showMessage ? '&ensp;&ensp;Authentication failed.' : '' }}
          </div>
          <button
            class="normalButton"
            type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { configRegexUsername, configRegexPassword, configApiUrl } from '../../../CONFIG/CONFIG';

export default {
  data() {
    return {
      usernameInput: '',
      passwordInput: '',
      validationResult: false,
      showMessage: false,
      responseMessage: '',
    };
  },
  watch: {
    usernameInput() {
      this.showMessage = false;
    },
    passwordInput() {
      this.showMessage = false;
    },
  },
  mounted() {
    this.$root.appMinHeight = '12rem';
  },
  methods: {
    async submitSignin() {
      this.validationResult = this.usernameInput.match(configRegexUsername)
                           && this.passwordInput.trim().match(configRegexPassword);
      if (!this.validationResult) {
        this.showMessage = true;
        return;
      }
      const response = await axios.post(`${configApiUrl}/user/signin`, {
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
  },
};
</script>
<style scoped>
.wrapperSignin{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerSignin{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.inputUsernameSignin{
  width: 270px;
  margin-bottom: 1rem;
}
.inputPasswordSignin{
  width: 270px;
  margin-bottom: 0.8rem;
}
.alertSignin{
  color: #FFFFFF;
  height: 1rem;
  font-size: 0.7rem;
  padding-bottom: 0.2rem;
}
.boxSignin button{
  width: 270px;
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>
