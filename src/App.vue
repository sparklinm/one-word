<template>
  <div id="app">
    <Nav />
    <div class="container">
      <Banner />
      <router-view class="main" />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'
import Banner from '@/components/Banner'

export default {
  components: {
    Nav,
    Banner
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">
.container
  padding-left 220px

</style>

<style>
.aa {
  color: #696969;
  background: transparent;
}
</style>
