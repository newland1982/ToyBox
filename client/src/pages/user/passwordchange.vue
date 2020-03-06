<template>
  <div class="wrapperPasswordchange">
    <div
      class="containerPasswordchange">
      <button
        class="normalButton"
        @click="submitPasswordchange">
        Change password
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { configApiUrl } from '../../../CONFIG/CONFIG';

export default {
  mounted() {
    this.$root.appMinHeight = '12rem';
  },
  methods: {
    async submitPasswordchange() {
      const response = await axios.patch(
        `${configApiUrl}/user/passwordchange`,
        {},
        { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}` } },
      )
        .catch(error => error.response);
      if (response.data.message !== 'passwordHasBeenChanged') {
        this.$store.commit('path/storePath', this.$route.path);
        this.$router.replace({ path: '/user/signin' });
        return;
      }
      if (response.data.message === 'passwordHasBeenChanged') {
        this.$store.commit('username/storeUsername', response.data.username);
        localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
        this.$store.commit('signupdone/setUsername', response.data.username);
        this.$store.commit('signupdone/setPassword', response.data.password);
        this.$router.replace({ path: '/user/signupdone' });
      }
    },
  },
};
</script>
<style scoped>
.wrapperPasswordchange{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerPasswordchange{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
  align-items: center;
}
.containerPasswordchange button{
  cursor: pointer;
}
</style>
