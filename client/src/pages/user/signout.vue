<template>
  <div class="wrapperSignout">
    <div
      class="containerSignout">
      <button
        class="normalButton"
        @click="submitSignout">
        Sign out
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
    submitSignout() {
      this.$store.commit('username/storeUsername', 'anonymous');
      localStorage.setItem('jwt', JSON.stringify(''));
      this.$router.replace({ path: '/mypage' });
    },
  },
};
</script>
<style scoped>
.wrapperSignout{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerSignout{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 270px;
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
  align-items: center;
}
.containerSignout button{
  cursor: pointer;
}
</style>
