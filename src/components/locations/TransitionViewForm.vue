<template>
  <div class="action">
    <button @click="selectExistingTransition" v-if="transitions.length" class="btn btn-block btn-primary">Выбрать существующий</button>
    <div v-if="shouldSelectExisiting && transitions.length" class="form-group">
      <label for="view-transition">Выбрать существующий переход</label>
      <select class="form-control" name="view-transition" id="view-transition" v-model="model.TransitionId">
        <option v-for="t in transitions" :value="t.id" :key="t.id">{{t.name}}</option>
      </select>
    </div>
    <button v-if="shouldSelectExisiting" class="btn btn-block btn-success mt-3" @click="saveView">Сохранить</button>
    <button
      v-if="shouldCreateTransition || shouldEditTransition"
      @click="toggleForm('reset')"
      class="btn btn-block btn-warning">Закрыть
    </button>
    <button
      v-if="model.TransitionId && !shouldEditTransition"
      @click="toggleForm('edit')"
      class="btn btn-block btn-primary">Изменить переход
    </button>
    <TransitionForm
      :key="'edit'"
      v-if="shouldEditTransition && model.TransitionId"
      :transition-id="model.TransitionId"
      @modelSaved="onTransitionSaved">
    </TransitionForm>
    <button
      v-if="!shouldCreateTransition"
      @click="toggleForm('create')"
      class="btn btn-block btn-primary">Создать переход</button>
    <TransitionForm
      :key="'create'"
      v-if="shouldCreateTransition"
      @modelSaved="onTransitionSaved"
      :building-id="buildingId"
      create>
    </TransitionForm>
  </div>
</template>

<script>
  import {Scene} from 'ggtu-map';
  import {api} from '../../utils/api';
  import TransitionForm from './TransitionForm';

  export default {
    name: "TransitionViewForm",
    components: {TransitionForm},
    inject: ['getScene'],
    props: {
      view: {
        type: Object,
        default() {
          return {
            id: null,
            LocationId: null,
            TransitionId: null
          }
        }
      },
      buildingId: {
        type: Number,
        default: null
      },
      create: Boolean
    },
    data() {
      return {
        model: Object.assign({}, this.view),
        transitions: [],
        shouldCreateTransition: false,
        shouldEditTransition: false,
        shouldSelectExisiting: false,
      }
    },
    methods: {
      selectExistingTransition() {
        this.shouldSelectExisiting = true;
      },
      async saveView() {
        console.log('click');
        let savedTransition;
        const element = this.getScene().findObjectOnMap(this.model);
        const coords = Scene.getElementCoords(element);
        const data = Object.assign({}, this.model, {coords});
        if (this.create) {
          console.log('create');
          console.log(data);
          savedTransition = await api.transitions.views.create(data);
          console.log('created', savedTransition);
          this.$emit('transitionUpdated', savedTransition);
        } else {
          console.log('update');
          savedTransition = await api.transitions.views.update(this.model.id, data);
          console.log('updated');
          this.$emit('transitionUpdated', savedTransition);
        }
        // this.toggleForm('update');
      },
      onTransitionSaved(transition) {
        if (this.shouldCreateTransition) {
          this.transitions.push(transition);
          this.model.TransitionId = transition.id;
          this.shouldCreateTransition = false;
          this.saveView()
        } else if (this.shouldEditTransition) {
          const index = this.transitions.findIndex(t => t.id === transition.id);
          this.$set(this.transitions, index, transition);
          this.model.TransitionId = transition.id;
          this.shouldEditTransition = false;
        }
      },
      toggleForm(mode) {
        switch (mode) {
          case 'create': {
            this.shouldCreateTransition = true;
            this.shouldEditTransition = false;
            break;
          }
          case 'edit': {
            this.shouldCreateTransition = false;
            this.shouldEditTransition = true;
            break;
          }
          case 'reset': {
            this.shouldCreateTransition = false;
            this.shouldEditTransition = false;
          }
        }
      }
    },
    watch: {
      view(view) {
        console.log(view);
        this.model = Object.assign({}, view);
      },
      buildingId: {
        handler() {
          this.shouldCreateTransition = false;
          api.buildings.getTransitions(this.buildingId)
            .then(transitions => {
              this.transitions = transitions;
            });
        },
        immediate: true
      }
    },
  }
</script>

<style scoped>

</style>
