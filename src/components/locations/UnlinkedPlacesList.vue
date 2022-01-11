<template>
  <div class="row">
    <div v-if="places.length" class="col">
      <div class="form-group">
        <label for="unlinkedPlace">Существующие места</label>
        <select name="unlinkedPlace" id="unlinkedPlace" v-model="selectedPlace" class="form-control">
          <option v-for="place in places" :value="place.id" :key="place.id">{{place.name}}</option>
        </select>
      </div>
      <button @click="onButtonClick" class="btn btn-block btn-success">Присвоить</button>
    </div>
  </div>
</template>

<script>
  import {api} from '../../utils/api';
  export default {
    name: "UnlinkedPlacesList",
    data() {
      return {
        places: [],
        selectedPlace: null
      }
    },
    methods: {
      onButtonClick() {
        const index = this.places.findIndex(place => place.id === this.selectedPlace);
        const [place] = this.places.splice(index, 1);
        this.$emit('placeAssigned', place);
      }
    },
    async mounted() {

      this.places = await api.locations.getPlaces(+this.$router.currentRoute.params.id, {where: {container: null}});
      if (this.places.length) {
        this.selectedPlace = this.places[0].id;
      }
    }
  }
</script>

<style scoped>

</style>
