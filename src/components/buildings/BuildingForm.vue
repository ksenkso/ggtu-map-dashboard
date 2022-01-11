<template>
  <form @submit.prevent="submitForm" action="#" class="form col-6">
    <div class="form-group">
      <label for="name">Название</label>
      <input type="text" name="name" id="name" v-model="model.name" class="form-control">
    </div>
    <div class="form-group">
      <label for="type">Тип здания</label>
      <select name="type" id="type" v-model="model.type" class="form-control">
        <option value="study">Учебный корпус</option>
        <option value="live">Общежитие</option>
        <option value="other">Строение</option>
      </select>
    </div>
    <button class="btn btn-success">{{create ? 'Создать' : 'Сохранить'}}</button>
    <router-link class="btn btn-primary" to="/buildings">К списку</router-link>
  </form>
</template>

<script>
  import {api} from '../../utils/api';

  export default {
    name: "BuildingForm",
    props: {
      create: Boolean,
      building: {
        default: () => ({name: '', type: 'study'}),
        type: Object
      },
    },
    methods: {
      async submitForm() {
        try {
          let building, message;
          if (this.create) {
            building = await api.buildings.create(this.model);
            message = 'Здание добавлено';
          } else {
            building = await api.buildings.update(this.building.id, this.model);
            message = 'Здание изменено';
          }
          if (building) {
            alert(message);
            this.$router.push('/buildings/view/' + building.id);
          }
        } catch (e) {
          alert('Ошибка создания');
          console.log(e);
        }
      }
    },
    data() {
      return {
        model: {
          name: this.building.name,
          type: this.building.type
        }
      }
    }
  }
</script>

<style scoped>

</style>
