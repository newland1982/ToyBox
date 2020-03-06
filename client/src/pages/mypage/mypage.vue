
<template>
  <div
    class="wrapperMypage">
    <div
      class="containerMypage">
      <div class="boxUsernameMypage">
        <div
          class="contentUsernameMypage">
          <p>
            {{ username }}
          </p>
        </div>
      </div>
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
          <li
            class="signoutProcedureMypage"
            @click="JumpToSignout">
            Sign out
          </li>
          <li
            class="passwordchangeProcedureMypage"
            @click="JumpToPasswordchange">
            Change Password
          </li>
          <li
            class="withdrawalProcedureMypage"
            @click="JumpToWithdrawal">
            Withdrawal
          </li>
        </ul>
      </div>
      <div class="boxThemeOptionsMypage">
        <div class="contentThemeOptionsMypage">
          <themeOptions/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeOptions from '../../components/themeOptions.vue';

export default {
  components: {
    themeOptions,
  },
  data() {
    return {
      username: this.$store.state.username.username,
    };
  },
  mounted() {
    this.$root.appMinHeight = '36rem';
  },
  methods: {
    JumpToSignup() {
      this.$store.commit('path/storePath', this.$route.path);
      this.$router.push({ path: '/user/signup' });
    },
    JumpToSignin() {
      this.$store.commit('path/storePath', this.$route.path);
      this.$router.push({ path: '/user/signin' });
    },
    JumpToSignout() {
      this.$store.commit('path/storePath', this.$route.path);
      this.$router.push({ path: '/user/signout' });
    },
    JumpToPasswordchange() {
      this.$store.commit('path/storePath', this.$route.path);
      this.$router.push({ path: '/user/passwordchange' });
    },
    JumpToWithdrawal() {
      this.$store.commit('path/storePath', this.$route.path);
      this.$router.push({ path: '/user/Withdrawal1' });
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
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 250px;
  grid-template-areas:
      "area1"
      "area2"
      "area3";
  justify-content: center;
  align-content:center;
  justify-self: center;
  align-self: center;
}
.boxUsernameMypage{
  grid-area: area1;
}
.contentUsernameMypage{
  text-align: center;
}
.contentUsernameMypage p{
  color: #FFD700;
  display: inline-block;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 2rem;
}

.boxProcedureMypage{
  grid-area: area2;
  margin-bottom: 2rem;
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
  margin-bottom: 1rem;
  cursor: pointer;
}
.signoutProcedureMypage{
  color: #FFFFFF;
  font-size: 1.5rem;
  text-align: initial;
  margin-bottom: 1rem;
  cursor: pointer;
}
.passwordchangeProcedureMypage{
  color: #FFFFFF;
  font-size: 1.5rem;
  text-align: initial;
  margin-bottom: 1rem;
  cursor: pointer;
}
.withdrawalProcedureMypage{
  color: #FFFFFF;
  font-size: 1.5rem;
  text-align: initial;
  margin-bottom: 1rem;
  cursor: pointer;
}

.boxThemeOptionsMypage{
  grid-area: area3;
}
.contentThemeOptionsMypage{
  margin-bottom: 2rem;
}
</style>
