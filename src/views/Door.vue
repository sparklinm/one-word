<template>
  <main>
    <div class="chart-rooms">
      <Room
        v-for="(room, index) in rooms"
        :key="index"
        :room="room"
        @click.native="goPage(room.id)"
      />
    </div>
  </main>
</template>

<script>
import Room from '@/components/chart/Room'

export default {
  components: {
    Room
  },
  data () {
    return {
      rooms: [
        {
          id: 0,
          name: '测试房间',
          background: require('@/assets/head.jpg'),
          total: 100,
          num: 50,
          status: 'actived',
          members: [
            {
              id: 0,
              nickName: '想不想喝奶茶',
              head: require('@/assets/head.jpg')
            }
          ]
        }
      ]
    }
  },
  methods: {
    goPage (id) {
      this.$router
        .push({
          path: `/chart-room/${id}`
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang='stylus'>


</style>
