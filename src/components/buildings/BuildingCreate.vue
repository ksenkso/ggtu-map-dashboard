<template>
    <Page>
      <div class="container">
        <div class="row">
          <h1>Добавление нового здания</h1>
        </div>
        <div class="row">
          <BuildingForm create></BuildingForm>
        </div>
      </div>
    </Page>
</template>

<script>
  import BuildingForm from "./BuildingForm";
  import Page from "../Page";

  export default {
    name: "BuildingCreate",
    components: {Page, BuildingForm}
  }
</script>

<style scoped>

</style>
