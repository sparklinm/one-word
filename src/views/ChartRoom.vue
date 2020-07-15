<template>
  <div>
    <chat :room="room" />
  </div>
</template>

<script>
import { getRooms } from '@/js/data'
import { mapState } from 'vuex'
import chat from '@/components/chart/chat'

export default {
  components: {
    chat
  },
  props: {
    id: {
      type: [String, Number],
      default: -1
    }
  },
  data () {
    return {
      room: {}
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  async created () {
    const rooms = await getRooms()
    const id = parseInt(this.id)
    const room = rooms.find(room => room.id === id)

    if (room) {
      this.room = room
    }
  },
  methods: {}
}
</script>

<style lang='stylus'>


</style>
