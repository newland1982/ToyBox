<template>
  <div class="wrapperPageNouser">
    <div
      class="containerPageNouser">
      <div
        :style="fontSize"
        class="messagePageNouser">
        The name has been deleted.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    fontSize() {
      if (this.$root.appWidthSize === 'xSmall') {
        return '--fontSize: 1.3rem';
      }
      if (this.$root.appWidthSize === 'small') {
        return '--fontSize: 1.6rem';
      }
      if (this.$root.appWidthSize === 'small') {
        return '--fontSize: 1.8rem';
      }
      return '--fontSize: 2rem';
    },
  },
};
</script>

<style scoped>
.wrapperPageNouser{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerPageNouser{
  display: grid;
  grid-template-rows: 4rem;
  grid-template-columns: 550px;
  grid-template-areas:
  "area1";
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.messagePageNouser{
  grid-area: area1;
  font-size: var(--fontSize);
}
</style>
