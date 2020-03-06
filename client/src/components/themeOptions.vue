<template>
  <div class="containerThemeOptions">
    <button
      class="circleBlack"
      @click="selectColor('colorSetBlack')"/>
    <button
      class="circleGray"
      @click="selectColor('colorSetGray')"/>
    <button
      class="circleRed"
      @click="selectColor('colorSetRed')"/>
    <button
      class="circleGreen"
      @click="selectColor('colorSetGreen')"/>
    <button
      class="circleBlue"
      @click="selectColor('colorSetBlue')"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations('theme', ['selectColor']),
  },
};
</script>
<style scoped>
div{
}
.containerThemeOptions{
  display: grid;
  grid-template-rows: 1.2rem;
  grid-template-columns: 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem;
  grid-template-areas:
      "area1 area2 area3 area4 area5";
  justify-content: center;
  justify-items: center;
}
.circleBlack{
  background: linear-gradient(to bottom, #000000, #444444);
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid #FFFFFF;
  cursor: pointer;
}
.circleGray{
  background: linear-gradient(to bottom, #444444, #888888);
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid #FFFFFF;
  cursor: pointer;
}
.circleRed{
  background: linear-gradient(to bottom, #440000, #880000);
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid #FFFFFF;
  cursor: pointer;
}
.circleGreen{
  background: linear-gradient(to bottom, #004400, #008800);
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid #FFFFFF;
  cursor: pointer;
}
.circleBlue{
  background: linear-gradient(to bottom, #000044, #000088);
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid #FFFFFF;
  cursor: pointer;
}
</style>
