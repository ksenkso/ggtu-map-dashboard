<template>
  <div class="locations">
    <h3 class="building__name">{{building.name}}</h3>
    <ul>
      <li v-for="location in locations" :key="location.id" class="location__item">
        <span class="location__name">{{location.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {api} from '../utils/api';
  export default {
    name: "LocationsList",
    props: {
      building: Object
    },
    data() {
      return {
        locations: [],
      }
    },
    async mounted() {
      let locations = await api.buildings.getLocations(this.building.id);
      if (!locations) {
        locations = [];
      }
      this.locations = locations;
    }
  }
</script>

<style scoped>

</style>
