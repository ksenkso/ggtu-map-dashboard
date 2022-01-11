<template>
    <Page>
      <div class="container">
        <div class="row heading align-items-center">
          <h1>Локации</h1>
          <router-link class="btn btn-primary heading__btn" to="/locations/create">Добавить</router-link>
        </div>
        <div class="row">
          <LocationsTable v-if="loaded" :locations="locations"></LocationsTable>
        </div>
      </div>
    </Page>
</template>

<script>
  import LocationsTable from "./LocationsTable";
  import Page from "../Page";
  import {api} from '../../utils/api';

  export default {
    name: "LocationsIndex",
    components: {Page, LocationsTable},
    data() {
      return {
        locations: [],
        loaded: false
      }
    },
    async beforeRouteEnter(to, from, next) {
      try {
        const locations = await api.locations.getAll();
        if (locations) {
          console.log('test');
          next(vm => {
            vm.locations = locations;
            vm.loaded = true;
          });
        } else {
          console.log('empty');
        }
      } catch (e) {
        console.error(e);

        if (e.response && e.response.status === 404) {
          next({name: '404'});
        }
      }
    },
    async beforeRouteUpdate(to, from, next) {
      try {
        const locations = await api.locations.getAll();
        if (locations) {
          this.locations = locations;
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
