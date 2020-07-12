<template>
  <main class="main">
    <card-detail />
    <Comments />
  </main>
</template>

<script>
import CardDetail from '@/components/card/CardDetail'
import Comments from '@/components/Comments'

export default {
  components: {
    CardDetail,
    Comments
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">

</style>
