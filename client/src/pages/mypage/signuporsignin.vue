
<template>
  <div
    class="wrapperMypage">
    <div
      class="containerMypage">
      <div class="boxProcedureMypage">
        <ul>
          <li
            class="signupProcedureMypage"
            @click="JumpToSignup">
            Sign up
          </li>
          <li
            class="signinProcedureMypage"
            @click="JumpToSignin">
            Sign in
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    JumpToSignup() {
      this.$router.push({ path: '/user/signup' });
    },
    JumpToSignin() {
      this.$router.push({ path: '/user/signin' });
    },
  },
};
</script>

<style scoped>
.wrapperMypage{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh;
}
.containerMypage{
  align-self: center;
}

.boxProcedureMypage{
  margin-bottom: 1rem;
  text-align: center;
}
.boxProcedureMypage ul{
  display: inline-block;
  list-style-type: none;
}
.signupProcedureMypage{
  color: #FFFFFF;
  font-size: 1.5rem;
  text-align: initial;
  margin-bottom: 1rem;
  cursor: pointer;
}
.signinProcedureMypage{
  color: #FFFFFF;
  font-size: 1.5rem;
  text-align: initial;
  cursor: pointer;
}
</style>
