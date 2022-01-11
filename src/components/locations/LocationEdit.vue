<template>
    <Page>
      <div class="container">
        <div class="row">
          <h1>Локация: {{location.BuildingId ? location.name : 'Корневая локация'}}</h1>
        </div>
        <div class="row">
          <LocationForm v-if="loaded" :location="location" :building="building"></LocationForm>
        </div>
      </div>
    </Page>
</template>

<script>
  import LocationForm from "./LocationForm";
  import Page from "../Page";
  import {api} from '../../utils/api';
  export default {
    name: "LocationEdit",
    components: {Page, LocationForm},
    data() {
      return {
        location: {
          name: '',
          BuildingId: null
        },
        building: {name: '', id: null},
        loaded: false
      }
    },
    methods: {
      async updateBuildingInfo() {
        try {
          const building = await api.buildings.get(this.location.BuildingId);
          if (building) {
            this.building = building;
            this.loaded = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    async beforeRouteEnter(to, from ,next) {
      try {
        const location = await api.locations.get(to.params.id);
        if (location) {
          next(vm => {
            vm.location = location;
            vm.updateBuildingInfo();
          });
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'})
        }
      }
    },
    async beforeRouteUpdate(to, from ,next) {
      try {
        const location = await api.locations.get(to.params.id);
        if (location) {
          this.location = location;
          await this.updateBuildingInfo();
          this.loaded = true;
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'})
        }
      }
    }

  }
</script>

<style scoped>

</style>
