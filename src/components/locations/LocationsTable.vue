<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Карта</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(l, idx) in models" :key="l.id">
      <td>{{idx+1}}</td>
      <td>{{l.name}}</td>
      <td>
        <img :src="'http://localhost:3000/maps/' + l.map" :alt="'Карта для ' + l.name">
      </td>
      <td>
        <div class="btn-group">
          <router-link class="btn btn-secondary" :to="'/locations/view/' + l.id">View</router-link>
          <router-link class="btn btn-secondary" :to="'/locations/edit/' + l.id">Edit</router-link>
          <router-link class="btn btn-secondary" :to="'/locations/map/' + l.id">Map</router-link>
          <button @click="deleteLocation(l, idx)" class="btn btn-danger">DEL</button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {api} from '../../utils/api';
  export default {
    name: "LocationsTable",
    props: {
      locations: Array
    },
    data() {
      return {
        models: this.locations
      }
    },
    methods: {
      async deleteLocation(location, idx) {
        const shouldDelete = confirm(`Удалить локацию "${location.name}"?`);
        if (shouldDelete) {
          try {
            const deleted = await api.locations.delete(location.id);
            if (deleted) {
              this.models.splice(idx, 1);
              alert('Локация удалена');
            } else {
              alert('Ошибка удаления');
            }
          } catch (e) {
            alert('Ошибка удаления');
            console.error(e);
          }
        }
      }
    }

  }
</script>

<style scoped>

</style>
