<template>
    <Page>
      <div class="container">
        <div class="row">
          <h1>Добавление локации</h1>
        </div>
        <div class="row">
          <LocationForm create></LocationForm>
        </div>
      </div>
    </Page>
</template>

<script>
  import LocationForm from "./LocationForm";
  import Page from "../Page";

  export default {
    name: "LocationCreate",
    components: {Page, LocationForm},
  }
</script>

<style scoped>

</style>
