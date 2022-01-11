<template>
  <Page>
    <div class="container">
      <div class="row justify-content-between">
        <h1>Здание: {{building.name}}</h1>
        <router-link to="/buildings">К списку</router-link>
      </div>
      <div class="row">
        <p>{{building.type | buildingType}}</p>
      </div>
      <div class="row">
        <LocationsTable v-if="locationsLoaded" :locations="locations"></LocationsTable>
        <div v-show="locationsLoaded && !locations.length" class="alert alert-info">В этом здании нет локаций</div>
      </div>
    </div>
  </Page>
</template>

<script>
  import Page from "../Page";
  import {api} from '../../utils/api';
  import LocationsTable from "../locations/LocationsTable";

  export default {
    name: "BuildingView",
    components: {Page, LocationsTable},
    methods: {
      setBuilding(building) {
        this.building = building;
      }
    },
    data() {
      return {
        building: {
          id: null,
          name: '',
          type: 'other',
          createdAt: '',
          updatedAt: ''
        },
        locations: [],
        locationsLoaded: false
      }
    },
    async beforeRouteEnter(to, from, next) {
      try {
        const building = await api.buildings.get(to.params.id);
        if (building) {
          next(vm => vm.setBuilding(building));
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'});
        }
      }
    },
    async beforeRouteUpdate(to, from, next) {
      try {
        const building = await api.buildings.get(to.params.id);
        if (building) {
          this.building = building;
          next();
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          next({name: '404'});
        }
      }
    },
    mounted() {
      this.$nextTick(async () => {
        try {
          const locations = await api.buildings.getLocations(this.building.id);
          if (locations) {
            this.locationsLoaded = true;
            this.locations = locations;
          }
        } catch (e) {
          alert('Ошибка загрузки локаций');
          console.error(e);
        }
      })
    }
  }
</script>

<style scoped>

</style>
