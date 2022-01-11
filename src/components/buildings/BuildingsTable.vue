<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(b, idx) in models"
        :key="b.id"
    >
      <td>{{idx+1}}</td>
      <td>{{b.name}}</td>
      <td>{{b.type | buildingType}}</td>
      <td>
        <router-link class="btn btn-success" :to="'/buildings/view/' + b.id">View</router-link>
        <router-link class="btn btn-warning" :to="'/buildings/edit/' + b.id">Edit</router-link>
        <button @click="deleteBuilding(b, idx)" class="btn btn-danger">DEL</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {api} from '../../utils/api';
  export default {
    name: "BuildingsTable",
    props: {
      buildings: Array
    },
    methods: {
      async deleteBuilding(building, idx) {
        const shouldDelete = confirm(`Удалить здание "${building.name}"`);
        if (shouldDelete) {
          try {
            const deleted = await api.buildings.delete(building.id);
            if (deleted) {
              this.models.splice(idx, 1);
              alert('Удалено.');
            }
          } catch (e) {
            alert('Ошибка удаления');
            console.error(e);
          }
        }
      }
    },
    data() {
      return {
        models: this.buildings
      }
    }
  }
</script>

<style scoped>

</style>
