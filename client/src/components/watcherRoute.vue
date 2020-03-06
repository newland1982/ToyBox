<template>
  <div class="watcherRoute"/>
</template>

<script>
export default {
  watch: {
    $route(to) {
      if (to.path === '/blog/origin') {
        this.$emit('focusBlogOrigin');
        this.$emit('restoreSliderPositionBlogOrigin');
      }
    },
  },
};
</script>
<style scoped>
.watcherRoute{
  display: none;
}
</style>
