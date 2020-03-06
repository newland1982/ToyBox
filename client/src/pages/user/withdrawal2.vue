<template>
  <div class="wrapperWithdrawal2">
    <div class="containerWithdrawal2">
      <div class="boxWithdrawal2">
        <div
          class="messageWithdrawal2">
          Are you sure?
        </div>
        <button
          class="cancelWithdrawal2 normalButton"
          @click="cancelWithdrawal2">
          Cancel
        </button>
        <button
          class="submitWithdrawal2 normalButton"
          @click="submitWithdrawal2">
          Okey
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { configApiUrl } from '../../../CONFIG/CONFIG';

export default {
  methods: {
    cancelWithdrawal2() {
      this.$router.replace({ path: '/mypage' });
    },
    async submitWithdrawal2() {
      this.$store
        .commit('withdrawal/selectedUsername', this.$store.state.username.username);
      const response = await axios.delete(
        `${configApiUrl}/user/withdrawal`,
        {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}` },
          data: { selectedUsername: this.$store.state.withdrawal.selectedUsername },
        },
      )
        .catch(error => error.response);
      if (response.data.message !== 'userHasBeenDeletedByAdmin'
          && response.data.message !== 'userHasBeenDeletedByGeneralUser') {
        this.$store.commit('path/storePath', this.$route.path);
        this.$router.replace({ path: '/user/signin' });
        return;
      }
      if (response.data.message === 'userHasBeenDeletedByAdmin') {
        this.$router.push({ path: '/mypage' });
      }
      if (response.data.message === 'userHasBeenDeletedByGeneralUser') {
        this.$store.commit('username/storeUsername', 'anonymous');
        localStorage.setItem('jwt', JSON.stringify(''));
        this.$router.replace({ path: '/mypage' });
      }
    },
  },
};
</script>
<style scoped>
.wrapperWithdrawal2{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}

.containerWithdrawal2{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.messageWithdrawal2{
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.cancelWithdrawal2{
  width: 270px;
  margin-bottom: 1rem;
  cursor: pointer;
}
.submitWithdrawal2{
  width: 270px;
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>
