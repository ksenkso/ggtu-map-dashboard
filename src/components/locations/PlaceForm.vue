<template>
  <div class="action">
    <div class="form-group">
      <label for="place-type">Тип места</label>
      <select @change="onTypeChange" name="place-type" id="place-type" v-model="currentPlace.type" class="form-control">
        <option value="cabinet">Кабинет</option>
        <option value="wc">Туалет</option>
        <option value="gym">Спортзал</option>
        <option value="other">Другое</option>
      </select>
    </div>
    <div v-if="currentPlace.type === 'cabinet'">
      <CabinetForm :initial-model="currentPlace" @model-saved="savePlace"></CabinetForm>
    </div>
    <div v-if="currentPlace.type === 'gym'">
      <GymForm :initial-model="currentPlace" @model-saved="savePlace"></GymForm>
    </div>
    <div v-if="currentPlace.type === 'wc'">
      <WCForm :initial-model="currentPlace" @model-saved="savePlace"></WCForm>
    </div>
  </div>
</template>

<script>
  import {api} from '../../utils/api';
  import CabinetForm from "../places/CabinetForm";
  import WCForm from "../places/WCForm";
  import GymForm from "../places/GymForm";

  export default {
    name: "PlaceForm",
    components: {CabinetForm, WCForm, GymForm},
    props: {
      place: {
        type: Object,
        default() {
          return {
            id: null,
            name: '',
            type: 'cabinet',
            Props: []
          }
        }
      },
      LocationId: Number,
      create: Boolean
    },
    data() {
      return {
        currentPlace: Object.assign({}, this.place),
        props: this.getPlaceProps(this.place.Props, this.place.type)
      }
    },
    methods: {
      onTypeChange() {
        this.props = [];
      },
      async savePlace(model) {
        let savedPlace;
        const data = Object.assign({}, model);
        if (this.create) {
          /*if (this.currentPlace.type === 'wc') {
            // 0 is male, 1 is female
            this.currentPlace.props.sex = !!+this.currentPlace.props.sex;
          }*/
          // this.currentPlace.Props = this.prepareProps(this.props);
          // console.log(data);
          savedPlace = await api.places.create(data);
          this.$emit('placeUpdated', savedPlace);
        } else {
          savedPlace = await api.places.update(data.id, data);
          this.$emit('placeUpdated', savedPlace);
        }
      },
      getPlaceProps(Props = [], type) {
        const props = {};
        if (Props.length) {
          Props.forEach(prop => {
            // Only WC's have non-boolean props, we should not convert them
            if (type === 'wc') {
              props[prop.name] = prop.value;
            } else {
              // Otherwise, convert property value to a boolean type, where even a string, containing zero is false.
              props[prop.name] = !!+prop.value;
            }
          });
        }
        return props;
      },
      prepareProps(Props) {
        return Object.keys(Props).map(key => ({name: key, value: Props[key]}));
      }
    },
    watch: {
      place(place) {
        console.log(place);
        this.currentPlace = Object.assign({}, place);
        this.props = this.getPlaceProps(place.Props, place.type);
      }
    }
  }
</script>

<style scoped>

</style>
