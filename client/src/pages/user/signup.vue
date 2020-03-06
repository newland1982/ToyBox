<template>
  <div class="wrapperSignup">
    <div
      class="containerSignup">
      <div class="boxSignup">
        <form @submit.prevent="submitSignup">
          <div
            class="alertSignup">
            {{ displayErrorMessage ? '&ensp;&ensp;The name is already in use.' : '' }}
          </div>
          <input
            v-model="usernameInput"
            placeholder="e.g.  user_name1,  user_123"
            spellcheck="false"
            autofocus>
          <button
            :style="{ filter: typeFilter, cursor: typeCursor, }"
            :disabled="!validationResult"
            class="normalButton"
            type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { configRegexUsername, configApiUrl } from '../../../CONFIG/CONFIG';

export default {
  data() {
    return {
      usernameInput: '',
      validationResult: false,
      responseMessage: '',
      displayErrorMessage: false,
      readyForSignup: false,
      usernameCreated: '',
      passwordCreated: '',
      typeFilter: 'blur(1px)',
      typeCursor: 'not-allowed',
    };
  },
  watch: {
    async usernameInput(value) {
      this.validationResult = value.match(configRegexUsername);
      if (!this.validationResult) {
        this.displayErrorMessage = false;
        this.readyForSignup = false;
        return;
      }
      const response = await axios.post(`${configApiUrl}/user/signup`, {
        username: value,
        triger: 'input',
      }).catch(error => error.response);
      this.responseMessage = response.data.message;
      if (this.responseMessage === 'validNewUsername') {
        this.displayErrorMessage = false;
        this.readyForSignup = true;
        return;
      }
      if (this.responseMessage === 'alreadyExists') {
        this.displayErrorMessage = true;
        this.readyForSignup = false;
      }
    },
    readyForSignup(value) {
      if (value) {
        this.typeFilter = 'blur(0px)';
        this.typeCursor = 'pointer';
      } else {
        this.typeFilter = 'blur(1px)';
        this.typeCursor = 'not-allowed';
      }
    },
  },
  mounted() {
    this.$root.appMinHeight = '12rem';
  },
  methods: {
    async submitSignup() {
      const response = await axios.post(`${configApiUrl}/user/signup`, {
        username: this.usernameInput,
        triger: 'submitButton',
      }).catch(error => error.response);
      this.responseMessage = response.data.message;
      this.usernameCreated = response.data.username;
      this.passwordCreated = response.data.password;
      this.$store.commit('username/storeUsername', this.usernameCreated);
      localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
      this.$store.commit('signupdone/setUsername', this.usernameCreated);
      this.$store.commit('signupdone/setPassword', this.passwordCreated);
      this.$router.replace({ path: '/user/signupdone' });
    },
  },
};
</script>
<style scoped>
.wrapperSignup{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerSignup{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  align-self: center;
}
.alertSignup{
  color: #FFFFFF;
  height: 0.8rem;
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
}
.containerSignup input{
  width: 270px;
  margin-bottom: 1rem;
}
.boxSignup button{
  width: 270px;
  margin-bottom: 1rem;
}
</style>
