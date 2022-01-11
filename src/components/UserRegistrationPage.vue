<template>
  <Page>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="text-center">Регистрация</h1>
      </div>
      <div class="row justify-content-center">
        <form @submit.prevent="register" action="" class="form_centered">
          <div class="form-group">
            <label for="login">Логин</label>
            <input type="text" name="login" id="login" class="form-control" v-model="login">
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" name="password" id="password" class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <label for="password_confirm">Повторите пароль</label>
            <input type="password" name="password_confirm" id="password_confirm" class="form-control" v-model="confirm">
          </div>
          <button class="btn btn-primary btn-block">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </Page>
</template>

<script>
  import Page from "./Page";
  import {api} from '../utils/api';
  import axios from 'axios';
  export default {
    name: "UserRegistrationPage",
    components: {Page},
    data() {
      return {
        login: '',
        password: '',
        confirm: ''
      }
    },
    methods: {
      register() {
        const errors = [];
        if (!this.login) {
          errors.push('Введите логин');
        }
        if (!this.password) {
          errors.push('Введите пароль');
        }
        if (this.password !== this.confirm) {
          errors.push('Пароли не совпадают');
        }
        if (errors.length) {
          alert(errors.join('\\n'));
        } else {
          axios.post('http://localhost:3000/v1/register', {
            login: this.login,
            password: this.password
          })
            .then(res => {
              if (res.data.token) {
                api.authenticate(this.login, this.password)
                  .then(user => {
                  if (user) {
                    this.$router.push('dashboard');
                  }
                })
                  .catch(err => {
                    alert(err);
                  })
              }
            })
        }
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
