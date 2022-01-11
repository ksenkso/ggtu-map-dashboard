<template>
  <Page>
    <div class="container">
      <div class="mb-2">
        <router-link class="btn btn-secondary" to="/buildings">Здания</router-link>
        <router-link class="btn btn-secondary" to="/locations">Локации</router-link>
      </div>
      <div class="row mt-4">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Токен</th>
            <th>Выдан</th>
            <th>Время жизни</th>
          </tr>
          </thead>
          <tbody>
          <tr
              :key="token.text"
              v-for="(token, i) in tokens">
            <td>{{i}}</td>
            <td @click="copyToken(token.text)" class="token-row">{{token.text}}</td>
            <td>{{token.iat*1000 | date}}</td>
            <td>{{token.exp*1000 | date}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <input ref="clipboard" type="hidden" name="clipboard" id="clipboard">
  </Page>
</template>

<script>
  import {api} from '../utils/api';

  import Page from "./Page";

  export default {
    components: {Page},
    data() {
      return {
        tokens: []
      }
    },
    methods: {
      async copyToken(token) {
        let copied;
        if (navigator.clipboard) {
          const result = await navigator.permissions.query({
            name: 'clipboard-write'
          });
          const status = result.state || result.status;
          if (status === 'granted') {
            try {
              await navigator.clipboard.writeText(token);
              copied = true;
            } catch (e) {
              copied = false;
            }
          } else {
            console.log(status);
            alert('Токен: ' + token);
          }
        } else {
          this.$refs.clipboard.value = token;
          this.$refs.clipboard.select();
          copied = document.execCommand('copy', false, token);
          this.$refs.clipboard.value = '';
        }

        if (!copied) {
          alert('Токен: ' + token);
        } else {
          alert('Токен скопирован');
        }
      }
    },
    created() {
      api.userInfo.getTokenInfo()
        .then(tokenInfo => {
          this.tokens = [tokenInfo];
        })
    },
    filters: {
      date(value) {
        const dateOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
        return (new Date(value)).toLocaleString('ru-Ru', dateOptions)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.token-row
  max-width: 150px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
</style>
