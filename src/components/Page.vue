<template>
  <div class="page">
    <Header></Header>
    <main class="main">
      <slot></slot>
    </main>
    <footer class="footer">
      Copyright (c) <a href="https://vk.com/dknprs" target="_blank">Арефьев Константин</a>, 2018-2019.
    </footer>
  </div>
</template>

<script>
  import Header from "./Header";

  export default {
    name: "Page",
    components: {Header}
  }
</script>

<style lang="sass">
html
  position: relative
  min-height: 100%
body
  min-height: 100%
.main
  padding-top: 24px
.footer
  text-align: center
  position: absolute
  height: 60px
  bottom: 0
  width: 100%
  line-height: 60px
</style>
