<template>
  <main>
    <div
      class="chart-rooms"
    >
      <el-row
        :gutter="20"
      >
        <el-col
          v-for="(room, index) in rooms"
          :key="index"
          class="col-room"
          :lg="8"
          :md="12"
          :sm="12"
          :xs="12"
        >
          <Room

            class="chart-rooms-item"
            :room="room"
            @click.native="goPage(room.id)"
          />
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script>
import { getRooms } from '@/js/data'
import Room from '@/components/chart/Room'

export default {
  components: {
    Room
  },
  data () {
    return {
      rooms: []
    }
  },
  async beforeCreate () {
    this.rooms = await getRooms()
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
.chart-rooms
  .col-room
    text-align center
  .chart-rooms-item
    margin 0 0px 20px 0
    text-align left

</style>
