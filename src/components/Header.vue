<template>
  <header class="header">
    <div class="container">
      <div class="row justify-content-between">
        <div class="header__logo logo align-self-center">
          <router-link :to="$router.currentRoute.meta.requiresAuth ? '/dashboard' : '/'">Logo</router-link>
        </div>
        <div v-if="user" class="d-flex align-self-center align-items-baseline">
          <div class="login">{{user.login}}</div>
          <button @click="logout" class="btn btn-link">Выход</button>
        </div>
        <div v-if="!user" class="d-flex align-self-center align-items-baseline header__links">
          <router-link class="header__link" to="/login">Вход</router-link>
          <router-link class="header__link" v-if="showLinkToRegister" to="/register">Регистрация</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import {api} from '../utils/api';
  export default {
    name: "Header",
    data() {
      return {
        user: api.userInfo.user
      }
    },
    computed: {
      showLinkToRegister() {
        return this.$router.currentRoute.name !== 'register';
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('user');
        this.$router.push('login');
      }
    },
  }
</script>

<style scoped lang="sass">
.header
  background-color: #2874b4
  color: #fff
  &__link
    color: #fff
    margin-right: 10px
    &:last-child
      margin-right: 0
  .row
    height: 48px
  .btn, a
    color: #fff
</style>
