<template>
  <div>
    <div class="custom-control custom-radio">
      <input type="radio" class="custom-control-input" id="sex_male" name="sex" value="0"
             v-model="model.props.sex">
      <label class="custom-control-label" for="sex_male">Мужской</label>
    </div>
    <div class="custom-control custom-radio">
      <input type="radio" class="custom-control-input" id="sex_female" name="sex" value="1"
             v-model="model.props.sex">
      <label class="custom-control-label" for="sex_female">Женский</label>
    </div>
    <button class="btn btn-block btn-success mt-3" @click="savePlace">Сохранить</button>
  </div>
</template>

<script>
  export default {
    name: "WCForm",
    props: {
      initialModel: Object,
      default: () => ({
        number: null,
        name: '',
        props: {
          sex: 0
        }
      }),
    },
    data() {
      return {
        model: this.getInitialModel(this.initialModel)
      }
    },
    methods: {
      savePlace() {
        this.model.name = `Туалет ${this.model.props.sex === 0 ? 'мужской' : 'женский'}`;
        this.$emit('model-saved', this.model);
      },
      getInitialModel(model) {
        if (model.props) {
          model.props.sex = +model.props.sex;
        }
        return model;
      }
    },
    watch: {
      initialModel(newValue) {
        if (newValue.props) {
          newValue.props.sex = +newValue.props.sex;
        }
        this.model = newValue;
      }
    }
  }
</script>

<style scoped>

</style>
