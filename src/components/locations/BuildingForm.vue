<template>
  <div class="action">
    <div class="form-group">
      <label for="building-name">Название</label>
      <input type="text" name="building-name" id="building-name" v-model="currentBuilding.name" class="form-control">
    </div>
    <div class="form-group">
      <label for="building-type">Тип здания</label>
      <select name="building-type" id="building-type" v-model="currentBuilding.type" class="form-control">
        <option value="study">Учебный корпус</option>
        <option value="live">Общежитие</option>
        <option value="other">Другое</option>
      </select>
    </div>
    <button class="btn btn-block btn-success mt-3" @click="saveBuilding">Сохранить</button>
  </div>
</template>

<script>
  import {api} from '../../utils/api';

  export default {
    name: "BuildingForm",
    props: {
      building: {
        type: Object,
        default() {
          return {
            id: null,
            name: '',
            type: 'study'
          }
        }
      },
      LocationId: Number,
      create: Boolean
    },
    data() {
      return {
        currentBuilding: Object.assign({}, this.building)
      }
    },
    methods: {
      async saveBuilding() {
        console.log('click');
        let savedBuilding;
        if (this.create) {
          console.log('create');
          console.log(this.currentBuilding);
          savedBuilding = await api.buildings.create(this.currentBuilding);
          console.log('created', savedBuilding);
          this.$emit('buildingUpdated', savedBuilding);
        } else {
          console.log('update');
          savedBuilding = await api.buildings.update(this.currentBuilding.id, this.currentBuilding);
          console.log('updated');
          this.$emit('buildingUpdated', savedBuilding);
        }
      }
    },
    watch: {
      building(building) {
        this.currentBuilding = Object.assign({}, building);
      }
    }
  }
</script>

<style scoped>

</style>
