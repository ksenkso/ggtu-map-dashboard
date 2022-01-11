<template>
  <Page>
    <h4 class="text-center">Вход</h4>
    <div class="container">
      <div class="row justify-content-center">
        <form class="form_centered">
          <div class="form-group">
            <label for="login">Логин</label>
            <input id="login" type="text" v-model="login" required autofocus class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required class="form-control">
          </div>
          <button type="submit" @click.prevent="handleSubmit" class="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  </Page>
</template>

<script>
  import {api} from '../utils/api';
  import Page from "./Page";

  export default {
    components: {Page},
    data() {
      return {
        login: "",
        password: ""
      }
    },
    methods: {
      async handleSubmit() {
        if (this.password.length > 0) {
          try {
            const user = await api.authenticate(this.login, this.password);
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl)
            } else {
              this.$router.push('dashboard')
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  }
</script>

<style scoped lang="sass">
.form
  max-width: 800px
  width: 100%
</style>
