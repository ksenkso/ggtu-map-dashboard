<template>
  <div class="page">
    <header>
      <h1>All locations:</h1>
    </header>
    <main>
      <LocationsList v-for="b in buildings" :building="b" :key="b.id"></LocationsList>
    </main>
  </div>
</template>

<script>
  import LocationsList from "./LocationsList";
  import {api} from '../utils/api';

  export default {
    name: "LocationsView",
    components: {LocationsList},
    data() {
      return {
        buildings: []
      }
    },
    methods: {
      async getBuildings() {
        const buildings = await api.buildings.getAll();
        if (buildings && buildings.length) {
          this.buildings = buildings;
        }
      }
    },
    async mounted() {
      await this.getBuildings();
    }
  }
</script>

<style scoped>

</style>
