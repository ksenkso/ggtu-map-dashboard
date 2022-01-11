<template>
  <div>
    <div class="form-group">
      <label for="place-name">Название</label>
      <input type="text" name="place-name" id="place-name" v-model="model.name" class="form-control">
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="hasTrainers" name="hasTrainers"
             v-model="model.props.hasTrainers">
      <label class="custom-control-label" for="hasTrainers">Есть тренажёры</label>
    </div>
    <button class="btn btn-block btn-success mt-3" @click="savePlace">Сохранить</button>
  </div>
</template>

<script>
  export default {
    name: "GymForm",
    props: {
      initialModel: Object,
      default: () => ({
        number: null,
        name: 'Спортзал',
        props: {
          hasTrainers: false
        },
        type: 'gym'
      })
    },
    data() {
      return {
        model: this.getInitialModel(this.initialModel)
      }
    },
    methods: {
      savePlace() {
        this.$emit('model-saved', this.model);
      },
      getInitialModel(model) {
        if (model.props) {
          model.props.hasTrainers = !!+model.props.hasTrainers;
        }
        if (!model.name) {
          model.name = 'Спортзал';
        }
        return model;
      }
    },
    watch: {
      initialModel(newValue) {
        if (newValue.props) {
          newValue.props.hasTrainers = !!+newValue.props.hasTrainers;
          newValue.props.isComputerClass = !!+newValue.props.isComputerClass;
          newValue.props.hasProjector = !!+newValue.props.hasProjector;
        }
        this.model = newValue;
      }
    }
  }
</script>

<style scoped>

</style>
