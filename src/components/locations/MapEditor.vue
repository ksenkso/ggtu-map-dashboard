<template>
  <Page>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Локация: {{location.name}}</h1>
          <h4>{{location.Building ? location.Building.name : 'Корневая локация'}}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <div class="container-fluid mb-2">
            <button @click="switchMode" class="btn btn-secondary">{{mode === 'objects' ? 'Маршруты' : 'Объекты'}}</button>
          </div>
          <div class="map-container" ref="mapContainer"></div>
        </div>
        <div v-if="mode === 'objects'" class="col-3 map-editor__actions">
          <div class="map-editor__action map-editor__action_underlined pb-3 mb-3">
            <input @change="onFileChange" type="file" name="mapFile" id="mapFile"
                   class="btn btn-primary btn-block ggtu-file-input" lang="ru">
          </div>
          <div v-if="showForm('place')">
            <PlaceForm :create="shouldCreateModel" :place="currentTarget"
                       @placeUpdated="onModelUpdated"></PlaceForm>
            <UnlinkedPlacesList @placeAssigned="onPlaceAssigned"></UnlinkedPlacesList>
          </div>
          <div v-if="showForm('building')">
            <BuildingForm :create="shouldCreateModel" :building="currentTarget"
                          @buildingUpdated="onModelUpdated"></BuildingForm>
          </div>
          <div v-if="showForm('transition-view')">
            <TransitionViewForm :create="shouldCreateModel" :view="currentTarget" :building-id="location.BuildingId || getBuildingId()"
                                @transitionUpdated="onModelUpdated"></TransitionViewForm>
          </div>
          <button class="btn btn-block btn-danger mt-3" @click="deleteObject" v-if="currentTarget.id !== null">Удалить
          </button>
        </div>
        <div v-if="mode === 'paths'" class="col-3 map-editor__actions">
          <button @click="savePaths" class="btn btn-block btn-secondary">Сохранить пути</button>
          <button @click="findPath" class="btn btn-block btn-secondary">Найти путь</button>
        </div>
      </div>
    </div>
    <div v-if="modelSaved" class="message">
      Place saved
    </div>
  </Page>
</template>

<script>
import Page from '../Page';
import { Graph, Scene, Selection, WayPath } from 'ggtu-map';
import { api } from '../../utils/api';
import PlaceForm from './PlaceForm';
import UnlinkedPlacesList from './UnlinkedPlacesList';
import TransitionViewForm from './TransitionViewForm';
import BuildingForm from './BuildingForm';

/**
   * @type Scene
   */
  let scene;
  const graph = new WayPath({selection: new Selection()});
  const editableGraph = new WayPath();
  window.graph = graph;
  window.editableGraph = editableGraph;

  const TRANSITION_VIEW_STUB = (container = null, LocationId = null) => ({
    id: null,
    TransitionId: null,
    container,
    LocationId
  });

  const PLACE_STUB = (container = null, LocationId = null) => ({
    id: null,
    name: '',
    type: 'cabinet',
    props: {},
    container,
    LocationId
  });

  const BUILDING_STUB = (container = null) => ({
    id: null,
    name: '',
    container,
    type: 'study'
  });
  export default {
    name: "MapEditor",
    components: {TransitionViewForm, BuildingForm, Page, PlaceForm, UnlinkedPlacesList},
    data() {
      return {
        location: {
          id: null,
          name: '',
          BuildingId: null,
          map: null,
          Building: {
            id: null,
            name: ''
          }
        },
        currentTarget: PLACE_STUB(),
        showCurrentTarget: false,
        showCreateButtons: false,
        shouldCreateModel: true,
        modelSaved: false,
        type: null,
        mode: 'objects',
        twoPointsSelected: false
      }
    },
    mounted() {
      /**
       *
       * @type {HTMLElement}
       */
      scene = this.getSceneInstance()
      window.scene = scene
      scene.on('mapChanged', this.initScene.bind(this));
      scene.setLocation(this.location)
    },
    methods: {
      getSceneInstance() {
        if (!scene) {
          return new Scene(this.$refs.mapContainer)
        }
        return scene
      },
      getBuildingId() {
        const container = this.getCurrentContainer();
        const target = scene.mapContainer.querySelector('#'+container.dataset.target);
        const id = target.dataset.id;
        return id ? +id : null;
      },
      async findPath() {
        const from = /**@type IWayPoint*/scene.selection.elements[0];
        const to = /**@type IWayPoint*/scene.selection.elements[1];
        const path = await api.search.findPath(from.mapObjectId, to.mapObjectId);
        const graph = new Graph();
        scene.selection.reset();
        graph.appendTo(scene);
        graph.showPath(path.vertices);
      },
      areTwoPointsSelected() {
        return scene && scene.selection.elements.length === 2;
      },
      initScene() {
        scene.on('click', this.onSceneClick.bind(this));
        if (this.mode === 'objects') {
          editableGraph.hide();
        }
        editableGraph.appendTo(scene);
        // clickTargets.forEach(target => target.addEventListener('click', this.onSceneClick.bind(this)));
        this.showCurrentTarget = false;
      },
      /**
       *
       * @param {IMapMouseEvent} e
       */
      onSceneClick(e) {
        console.log(e);
        const {mapObject, objectType: type} = e;
        if (this.mode === 'objects') {
          const {mapElement} = e;
          if (type) {
            this.type = type;
          }
          if (mapElement) {
            const current = this.$refs['mapContainer'].querySelector('.target_selected');
            if (current) {
              current.classList.remove('target_selected');
            }
            mapElement.classList.add('target_selected');
            if (mapObject) {
              this.currentTarget = Object.assign({}, mapObject);
              this.shouldCreateModel = null;
            } else {
              const containerId = mapElement.id;
              if (this.type) {
                this.currentTarget = this.getTargetStub(this.type);
              } else {
                this.currentTarget = PLACE_STUB(containerId, this.location.id);
              }
              this.shouldCreateModel = true;
            }
          }
          this.showCurrentTarget = true;
        } else {
        //  Start drawing paths here
          const pointOptions = {position: e.mapCoords};
          if (mapObject && mapObject.MapObject) {
            pointOptions.mapObjectId = mapObject.MapObject.id;
          }
          const point = editableGraph.addPoint(pointOptions);
          console.log(point);
        }
      },
      onModelUpdated(savedModel) {
        console.log(savedModel);
        this.currentTarget = savedModel;
        const container = this.$refs.mapContainer.querySelector('.target_selected');
        if (container.dataset.type !== 'transition-view') {
          if (container.dataset.id) {
            container.querySelector('text').textContent = savedModel.name;
          } else {
            Scene.setLabelFor(savedModel, container);
          }
        }
        scene.objectManager.updateLocation(this.location.id)
          .then(() => console.log('location updated'));

        container.dataset.id = savedModel.id;
        /*scene.refresh()
          .then(() => {
            this.showModelUpdated();
          })*/
      },
      onPlaceAssigned(place) {
        this.endpoint
          .update(place.id, {container: this.getContainerId()})
          .then(updated => {
            this.currentTarget = updated;
          })
          .catch(err => {
            alert('Ошибка присваивания места');
            console.log(err);
          })
      },
      getEndpoint(type) {
        switch (type) {
          case 'place':
            return api.places;
          case 'building':
            return api.buildings;
          case 'transition-view':
            return api.transitions.views;
          default:
            return api.places;
        }
      },
      getTargetStub(type) {
        switch (type) {
          case 'place':
            return PLACE_STUB(this.getContainerId(), this.location.id);
          case 'building':
            return BUILDING_STUB(this.getContainerId());
          case 'transition-view':
            return TRANSITION_VIEW_STUB(this.getContainerId(), this.location.id);
          default:
            return PLACE_STUB();
        }
      },
      async deleteObject() {
        const shouldDelete = confirm(`Удалить объект "${this.currentTarget.name}"?`);
        if (shouldDelete) {
          const id = this.currentTarget.id;
          const endpoint = this.getEndpoint(this.type);
          try {
            const deleted = await endpoint.delete(id);
            if (deleted) {
              this.currentTarget = this.getTargetStub(this.type);
              const container = this.$refs.mapContainer.querySelector('.target_selected');
              delete container.dataset.id;
              container.querySelector('g.label').remove();
              alert('Объект удалён');

            }
          } catch (e) {
            alert('Ошибка удаления');
          }
        }
      },
      showForm(type) {
        return this.showCurrentTarget && this.type === type;
      },
      async onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files || [];
        if (files.length) {
          const file = files[0];
          let shouldUpload = true;
          if (this.location.map) {
            shouldUpload = confirm('Загрузить новую карту? Старая карта будет удалена с сохранением мест.');
          }
          if (shouldUpload) {
            try {
              await api.locations.uploadMap(this.location.id, file)
              scene.refresh()
                .then(() => {
                  this.location.map = scene.getLocation().map
                })
            } catch (e) {
              alert('Ошибка загрузки карты');
              console.error(e);
            }
          }
        }
      },
      updateLocation(location) {
        this.location = location;
        scene = this.getSceneInstance()
        try {
          scene.setLocation(location)
            .then(() => {
              api.locations.getPathGraph(location.id)
                .then(paths => {
                  graph.restore(paths.map(path => Object.assign({}, path)));
                  editableGraph.restore(paths)
                });
            })
        } catch (e) {
          alert(e.message);
        }
      },
      showModelUpdated() {
        this.modelSaved = true;
        setTimeout(() => {
          console.log(this)
        }, 30000);
      },
      switchMode() {
        this.mode = this.mode === 'objects' ? 'paths' : 'objects';
        if (this.mode === 'objects') {
          editableGraph.hide();
        } else {
          editableGraph.show();
        }
        this.$refs.mapContainer.dataset.mode = this.mode;
      },
      savePaths() {
        const diff = WayPath.diff(graph, editableGraph);
        console.log(diff);
        api.locations
          .updatePaths(this.location.id, diff)
          .then(res => {
            console.log(res);
          })
      },
      getCurrentContainer() {
        return this.$refs.mapContainer.querySelector('.target_selected');
      },
      getContainerId() {
        return this.getCurrentContainer().id;
      }
    },
    async beforeRouteEnter(to, from, next) {
      if (to.params.id) {
        try {
          const location = await api.locations.get(to.params.id, {with: 'Building'});
          if (location) {
            console.log(location);
            next(vm => vm.updateLocation(location));
          }
        } catch (e) {
          if (e.response && e.response.status === 404) {
            next({name: '404'});
          }
          console.error(e);
        }

      }
    },
    async beforeRouteUpdate(to, from, next) {
      if (to.params.id) {
        try {
          const location = await api.locations.get(to.params.id, {with: 'Building'});
          if (location) {
            this.location = location;
            next();
          }
        } catch (e) {
          if (e.response && e.response.status === 404) {
            next({name: '404'});
          }
        }
      }
    },
    computed: {
      isRootLocation() {
        return this.location.BuildingId === null;
      },
    },
    provide: {
      getScene: () => scene
    }
  }
</script>

<style lang="sass">
.map-container
  width: 690px
  height: 440px
</style>
