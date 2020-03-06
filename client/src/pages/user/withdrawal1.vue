<template>
  <div class="wrapperWithdrawal1">
    <div class="containerWithdrawal1">
      <button
        class="submitWithdrawal1 normalButton"
        @click="submitWithdrawal1">
        Withdraw
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$root.appMinHeight = '12rem';
  },
  methods: {
    submitWithdrawal1() {
      this.$router.replace({ path: '/user/withdrawal2' });
    },
  },
};
</script>
<style scoped>
.wrapperWithdrawal1{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerWithdrawal1{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.submitWithdrawal1{
  cursor: pointer;
}
</style>
