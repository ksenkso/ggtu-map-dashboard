<template>
  <Page>
    <div class="container">
      <div class="row">
        <h1>Здание: {{building.name}}</h1>
      </div>
      <div class="row">
        <BuildingForm v-if="loaded" :building="building"></BuildingForm>
      </div>
    </div>
  </Page>
</template>

<script>
  import Page from "../Page";
  import BuildingForm from "./BuildingForm";
  import {api} from '../../utils/api';
  export default {
    name: "BuildingEdit",
    components: {Page, BuildingForm},
    data() {
      return {
        building: {
          name: '',
          type: 'study'
        },
        loaded: false
      }
    },
    async beforeRouteEnter(to, from ,next) {
      try {
        const building = await api.buildings.get(to.params.id);
        if (building) {
          next(vm => vm.setBuilding(building));
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'})
        }
      }
    },
    methods: {
      setBuilding(building) {
        this.building = building;
        this.loaded = true;
      }
    }
  }
</script>

<style scoped>

</style>
