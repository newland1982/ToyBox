<template>
  <div
    class="wrapperSignupdone">
    <div
      :style="marginContainerSignupdone"
      class="containerSignupdone">
      <div class="boxNoticeSignupdone">
        <div
          class="titleNoticeSignupdone">
          &#x26A0; WARNING
        </div>
        <div
          class="contentNoticeSignupdone">
          <p>&#x26A0;&nbsp;Never forget your password. <br>It can not be reissued.
          </p>
        </div>
      </div>
      <div class="boxUsernameSignupdone">
        <div
          class="titleUsernameSignupdone">
          Name
        </div>
        <div
          class="contentUsernameSignupdone">
          <p>
            {{ usernameCreated }}
          </p>
        </div>
      </div>
      <div class="boxPasswordSignupdone">
        <div
          class="titlePasswordSignupdone">
          Password
        </div>
        <div
          class="contentPasswordSignupdone">
          <p>
            {{ passwordCreated }}
          </p>
        </div>
      </div>
      <div
        class="boxButtonSignupdone">
        <button
          class="normalButton"
          @click="backToPreviousPage">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      usernameCreated: this.$store.state.signupdone.username,
      passwordCreated: this.$store.state.signupdone.password,
      displayPassword: false,
    };
  },
  computed: {
    marginContainerSignupdone() {
      if (this.$root.appHeight >= 568) {
        return '--marginContainerSignupdone: 0rem';
      }
      return '--marginContainerSignupdone: -12rem';
    },
  },
  mounted() {
    this.$root.appMinHeight = '36rem';
  },
  methods: {
    backToPreviousPage() {
      this.$router.push({ path: `${this.$store.state.path.path}` });
    },
  },
};
</script>
<style scoped>
.wrapperSignupdone{
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100%;
}
.containerSignupdone{
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 270px;
  grid-template-areas:
      "area1"
      "area2"
      "area3"
      "area4";
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
  align-items: center;
  /* margin-top: calc(-0rem + var(--marginContainerSignupdone)); */
}
.boxNoticeSignupdone{
  grid-area: area1;
}
.titleNoticeSignupdone{
  color: #FFFFFF;
}
.contentNoticeSignupdone{
  text-align: center;
}
.contentNoticeSignupdone p{
  color: #FFFFFF;
  display: inline-block;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  margin: 2rem 0;
}

.boxUsernameSignupdone{
  grid-area: area2;
}
.titleUsernameSignupdone{
  color: #FFD700;
}
.contentUsernameSignupdone{
  text-align: center;
}
.contentUsernameSignupdone p{
  color: #FFD700;
  display: inline-block;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 1rem;
  text-align: left;
  margin: 2rem 0;
}

.boxPasswordSignupdone{
  grid-area: area3;
}
.titlePasswordSignupdone{
  color: #C0C0C0;
}
.contentPasswordSignupdone {
  text-align: center;
}
.contentPasswordSignupdone p{
  color: #C0C0C0;
  display: inline-block;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 1rem;
  text-align: left;
  margin: 2rem 0;
}

.boxButtonSignupdone {
  grid-area: area4;
}
.boxButtonSignupdone button{
  width: 270px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
