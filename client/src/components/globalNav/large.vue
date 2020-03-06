<template>
  <nav
    :style="theme"
    class="containerLarge">
    <div/>
    <div class="menuLarge">
      <router-link to="/mypage">
        <img src="../../assets/globalNavIcon/mypage.svg">
      </router-link>
    </div>
    <div class="menuLarge">
      <router-link to="/blog/origin"><img src="../../assets/globalNavIcon/blog.svg"></router-link>
    </div>
    <div class="menuLarge">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/paper.svg"></router-link>
    </div>
    <div class="menuLarge">
      <router-link to="/mypage"><img src="../../assets/globalNavIcon/video.svg"></router-link>
    </div>
    <div class="menuLarge">
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
.containerLarge{
  display: grid;
  grid-template-rows: 2.2rem;
  grid-template-columns: 24fr 1fr 1fr 1fr 1fr 1fr 1rem;
  width: 100%;
  max-width: 1438px;
  line-height: 2.5;
  background-color: var(--colorBody);
  position: fixed;
  top: 0;
  background: rgba(var(--colorBodyRGB), 0.7);
}
.menuLarge{
  margin: 0 auto;
}
.menuLarge img{
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
}
</style>
