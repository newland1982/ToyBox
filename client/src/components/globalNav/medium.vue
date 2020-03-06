<template>
  <nav
    :style="theme"
    class="containerMedium">
    <div/>
    <div class="menuMedium">
      <router-link to="/mypage">
        <img src="../../assets/globalNavIcon/mypage.svg">
      </router-link>
    </div>
    <div class="menuMedium">
      <router-link to="/blog/origin"><img src="../../assets/globalNavIcon/blog.svg"></router-link>
    </div>
    <div class="menuMedium">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/paper.svg"></router-link>
    </div>
    <div class="menuMedium">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/video.svg"></router-link>
    </div>
    <div class="menuMedium">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/live.svg"></router-link>
    </div>
    <div/>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('theme', ['theme']),
  },
};
</script>

<style scoped>
.containerMedium{
  display: grid;
  grid-template-rows: 2.2rem;
  grid-template-columns: 24fr 2.8rem 2.8rem 2.8rem 2.8rem 2.8rem 1rem;
  width: 100%;
  line-height: 2.5;
  background-color: var(--colorBody);
  position: fixed;
  top: 0;
  background: rgba(var(--colorBodyRGB), 0.7);
}
.menuMedium{
  margin: 0 auto;
}
.menuMedium img{
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
}
</style>
