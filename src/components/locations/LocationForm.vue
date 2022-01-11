<template>
  <form @submit.prevent="submitForm" action="#" class="form col-6">
    <div class="form-group">
      <label for="floor">Этаж</label>
      <input class="form-control" type="number" name="floor" id="floor" v-model="model.floor">
    </div>
    <div class="form-group">
      <label for="BuildingId">Здание</label>
      <select name="BuildingId" id="BuildingId" v-model="model.BuildingId" class="form-control">
        <option v-for="b in buildings" :key="b.id" :value="b.id">{{b.name}}</option>
      </select>
    </div>
    <button class="btn btn-success">{{create ? 'Создать' : 'Сохранить'}}</button>
    <router-link class="btn btn-primary" to="/buildings">К списку</router-link>
  </form>
</template>

<script>
  import {api} from '../../utils/api';
  export default {
    name: "LocationForm",
    props: {
      location: {
        default: () => ({name: '', BuildingId: null, floor: 1}),
        type: Object
      },
      building: {
        default: () => ({name: '', id: null})
      },
      create: Boolean
    },
    data() {
      return {
        buildings: [],
        model: {
          id: this.location.id,
          name: this.location.name,
          BuildingId: this.location.BuildingId,
          floor: this.location.floor
        }
      }
    },
    methods: {
      prepareLocation() {
        return Object.assign({}, this.model, {name: `Этаж ${this.model.floor}`});
      },
      async submitForm() {
        try {
          let location, message;
          const data = this.prepareLocation();
          if (this.create) {
            location = await api.locations.create(data);
            message = 'Локация создана';
          } else {
            location = await api.locations.update(this.model.id, data);
            message = 'Локация обновлена';
          }
          if (location) {
            alert(message);
            this.$router.push('/locations/map/' + location.id);
          }
        } catch (e) {
          alert(`Ошибка ${this.create ? 'создания' : 'обновления'}`);
          console.error(e);
        }
      }
    },
    async mounted() {
      try {
        const buildings = await api.buildings.getAll();
        if (buildings) {
          this.buildings = buildings;
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          console.error(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
