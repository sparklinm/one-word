<template>
  <div class="write">
    <div class="write-inline">
      <el-row :gutter="2">
        <el-col :span="2">
          <el-avatar
            :src="user.head"
            class="user-head"
            :size="50"
          />
        </el-col>
        <el-col
          :span="22"
          class="write-box-contianer"
        >
          <Editor
            v-model="content"
            class="write-box"
            :placeholder="placeholder"
          />

          <div>
            <el-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="hanldeSuccess"
              :auto-upload="false"
              :limit="9"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="ops">
      <el-button
        type="primary"
        @click="confirm"
      >
        发出
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Editor from '@/components/Editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      user: {
        nickName: '想不想喝奶茶',
        head: require('@/assets/head.jpg')
      },
      placeholder: '写下你的心情。',
      dialogImageUrl: '',
      dialogVisible: false,
      imgs: [],
      content: ''
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    hanldeSuccess () {
    },
    confirm () {
      const imgs = this.$refs.upload.uploadFiles.map(item => item.url)
      const word = {
        imgs,
        content: this.content,
        date: new Date().toLocaleString()
      }

      console.log(word)
    }
  }
}
</script>

<style lang="stylus">
picture-card-width = 100px
.write
  .write-inline
    border 1px solid #d3d391
    height 500px
    padding 20px
  .el-row
    height 100%
  .el-col
    height 100%
  .user-head
    vertical-align top
  .write-box
    background transparent
    border none
    resize none
    outline none
    height 60%
    width 100%
    padding 10px
    box-sizing border-box
    line-height 20px
  .el-upload--picture-card,.el-upload-list__item
    width picture-card-width
    height picture-card-width
    line-height picture-card-width
  .ops
    margin-top 20px
    text-align right
</style>
