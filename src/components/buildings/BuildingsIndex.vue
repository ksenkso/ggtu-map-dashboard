<template>
  <Page>
    <div class="container">
      <div class="row align-items-center heading">
        <h1>Здания</h1>
        <router-link class="btn btn-primary heading__btn" to="/buildings/create">Добавить</router-link>
      </div>
      <div class="row">
        <BuildingsTable v-if="loaded" :buildings="buildings"></BuildingsTable>
      </div>
    </div>
  </Page>
</template>

<script>
  import BuildingsTable from "./BuildingsTable";
  import Page from "../Page";
  import {api} from '../../utils/api';
  export default {
    name: "BuildingsIndex",
    components: {Page, BuildingsTable},
    data() {
      return {
        buildings: [],
        loaded: false
      }
    },
    async beforeRouteEnter(to, from, next) {
      try {
        const buildings = await api.buildings.getAll();
        if (buildings) {
          next(vm => {
            vm.buildings = buildings;
            vm.loaded = true;
          });
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'});
        }
      }
    },
    async beforeRouteUpdate(to, from, next) {
      try {
        const buildings = await api.buildings.getAll();
        if (buildings) {
          this.buildings = buildings;
          this.loaded = true;
          next();
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'});
        }
      }
    }
  }
</script>

<style scoped>

</style>
