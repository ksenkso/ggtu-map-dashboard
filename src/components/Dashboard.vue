<template>
  <Page>
    <div class="container">
      <div class="row">
        <h1 class="text-center">Hi there!</h1>
      </div>
    </div>

  </Page>
</template>

<script>
  import Page from "./Page";

  export default {
    name: "Dashboard",
    components: {Page},
    data() {
      return {
        msg: 'home page'
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
