<template>
    <Page>
      <div class="container">
        <div class="row">
          <h1>Локация: {{location.name}}</h1>
        </div>
        <div class="row">
          <p>{{building.name}}</p>
        </div>
        <div class="row">
          <table class="table">
            <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Действия</th>
            </tr>
            </thead>
          </table>
        </div>
      </div>
    </Page>
</template>

<script>
  import Page from "../Page";

  export default {
    name: "LocationView",
    components: {Page},
    data() {
      return {
        location: {
          id: this.$router.currentRoute.params.id,
          name: '',
          BuildingId: null
        },
        building: {
          name: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
