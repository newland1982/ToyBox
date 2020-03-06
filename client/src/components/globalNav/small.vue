<template>
  <nav
    :style="theme"
    class="containerSmall">
    <div/>
    <div class="menuSmall">
      <router-link to="/mypage">
        <img src="../../assets/globalNavIcon/mypage.svg">
      </router-link>
    </div>
    <div class="menuSmall">
      <router-link to="/blog/origin"><img src="../../assets/globalNavIcon/blog.svg"></router-link>
    </div>
    <div class="menuSmall">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/paper.svg"></router-link>
    </div>
    <div class="menuSmall">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/video.svg"></router-link>
    </div>
    <div class="menuSmall">
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
.containerSmall{
  display: grid;
  grid-template-rows: 2.4rem;
  grid-template-columns: 1fr 4.5rem 4.5rem 4.5rem 4.5rem 4.5rem 1fr;
  width: 100%;
  line-height: 2.5;
  background-color: var(--colorBody);
  position: fixed;
  bottom: 0;
  background: rgba(var(--colorBodyRGB), 0.7);
}
.menuSmall{
  text-align: center;
}
.menuSmall img{
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
}
</style>
