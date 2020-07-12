<template>
  <div id="app">
    <Banner />
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
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

<style>

</style>
