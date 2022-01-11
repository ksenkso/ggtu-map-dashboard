<template>
  <div class="page">
    <main>
      <form action="#" class="form">
        <div class="form__field">
          <label for="name">Название локации</label>
          <input type="text" name="name" id="name" v-model="location.name">
        </div>
        <div class="form__field">
          <label for="BuildingId">Здание</label>
          <select name="BuildingId" id="BuildingId" v-model="location.BuildingId">
            <option value="b.id" :key="b.id" v-for="b in buildings">{{b.name}}</option>
          </select>
        </div>
        <div class="form__field">
          <label for="map">Карта</label>
          <input type="file" name="map" id="map" @change="onFileChange">
        </div>
        <button class="button button_block">Сохранить</button>
      </form>
    </main>
  </div>
</template>

<script>
  import {api} from '../utils/api';

  export default {
    name: "CreateLocationPage",
    data() {
      return {
        buildings: [],
        location: {
          name: '',
          BuildingId: null,
          map: null
        }
      }
    },
    async mounted() {
      this.buildings = await api.buildings.getAll() || [];
    },
    methods: {
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (files) {
          this.location.map = files[0];
        } else {
          alert('WATAFUK R U DOIN???????');
        }
      }
    }
  }
</script>

<style scoped>

</style>
