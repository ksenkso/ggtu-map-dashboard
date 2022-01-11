<template>
  <div class="mt-2 mb-2">
    <div class="text-center font-weight-bold" v-if="create">Новый переход</div>
    <div class="text-center font-weight-bold" v-if="!create">Изменить переход</div>
    <div class="form-group">
      <label for="transition-name">Название</label>
      <input class="form-control" type="text" name="transition-name" id="transition-name" v-model="model.name">
    </div>
    <div class="form-group">
      <p class="mb-1">Тип перехода</p>
      <div class="custom-control custom-radio">
        <input class="custom-control-input" type="radio" name="view-type" id="view-type-stairs" value="stairs"
               v-model="model.type">
        <label class="custom-control-label" for="view-type-stairs">Лестница</label>
      </div>
      <div class="custom-control custom-radio">
        <input class="custom-control-input" type="radio" name="view-type" id="view-type-door" value="door"
               v-model="model.type">
        <label class="custom-control-label" for="view-type-door">Дверь</label>
      </div>
      <div class="custom-control custom-radio">
        <input class="custom-control-input" type="radio" name="view-type" id="view-type-exit" value="exit"
               v-model="model.type">
        <label class="custom-control-label" for="view-type-exit">Выход</label>
      </div>
    </div>
    <button @click="saveModel" class="btn btn-block btn-primary">Сохранить переход</button>
  </div>
</template>

<script>
  import {api} from '../../utils/api';
  export default {
    name: "TransitionForm",
    props: {
      TransitionId: Number,
      BuildingId: Number,
      create: Boolean
    },
    data() {
      return {
        model: {
          id: null,
          BuildingId: this.BuildingId,
          name: null,
          type: 'stairs'
        }
      }
    },
    methods: {
      saveModel() {
        this.model.BuildingId = this.BuildingId;
        api.buildings.getFloor(this.model.BuildingId, 1)
          .then(location => {
            this.model.LocationId = location.id;
          });
        if (this.create) {
          api.transitions.create(this.model)
            .then(created => {
              this.model = created;
              this.$emit('modelSaved', created);
            });
        } else {
          api.transitions.update(this.model.id, this.model)
            .then(updated => {
              this.model = updated;
              this.$emit('modelSaved', updated);
            });
        }
      }
    },
    mounted() {
      if (this.create) {
        api.locations.get(this.$route.params.id)
          .then(location => this.model.BuildingId = location.BuildingId);
      } else {
        api.transitions.get(this.TransitionId)
          .then(transition => this.model = transition);
      }
    },
    watch: {
      TransitionId: function(newId) {
        if (newId) {
          api.transitions.get(newId)
            .then(transition => this.model = transition);
        }
      }
    }
  }
</script>

<style scoped>

</style>
