<template>
  <div>
    <div class="form-group">
      <label for="cabinet-number">Номер</label>
      <input type="number" name="place-name" id="cabinet-number" @input="updateName" v-model="model.props.number" class="form-control">
    </div>
    <div class="form-group">
      <label for="place-name">Название</label>
      <input type="text" name="place-name" id="place-name" v-model="model.name" class="form-control">
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="hasProjector" name="hasProjector"
             v-model="model.props.hasProjector">
      <label class="custom-control-label" for="hasProjector">Есть проектор</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="isComputerClass" name="isComputerClass"
             v-model="model.props.isComputerClass">
      <label class="custom-control-label" for="isComputerClass">Компьютерный класс</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="isBig" name="isBig" v-model="model.props.isBig">
      <label class="custom-control-label" for="isBig">Потоковая аудитория</label>
    </div>
    <button class="btn btn-block btn-success mt-3" @click="savePlace">Сохранить</button>
  </div>
</template>

<script>
  export default {
    name: "CabinetForm",
    props: {
      initialModel: Object,
      default: () => ({
        number: null,
        name: '',
        props: {
          hasProjector: false,
          isComputerClass: false,
          isBig: false
        }
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
      updateName() {
        this.model.name = this.model.props.number;
      },
      getInitialModel(model) {
        if (model.props) {
          model.props.isBig = !!+model.props.isBig;
          model.props.isComputerClass = !!+model.props.isComputerClass;
          model.props.hasProjector = !!+model.props.hasProjector;
        }
        return model;
      }
    },
    watch: {
      initialModel(newValue) {
        if (newValue.props) {
          newValue.props.isBig = !!+newValue.props.isBig;
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
