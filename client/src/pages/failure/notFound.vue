<template>
  <div class="wrapperPageNotFound">
    <div
      class="containerPageNotFound">
      <div
        class="messagePageNotFound">
        Page not found
      </div>
    </div>
  </div>
</template>


<style scoped>
.wrapperPageNotFound{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerPageNotFound{
  display: grid;
  grid-template-rows: 4rem;
  grid-template-columns: 250px;
  grid-template-areas:
  "area1";
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.messagePageNotFound{
  grid-area: area1;
  font-size: 2rem;
}
</style>
