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
            :autosize="{ minRows: 5, maxRows: 20 }"
            :placeholder="placeholder"
          />

          <div class="upload-container">
            <el-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="hanldeSuccess"
              :auto-upload="false"
              multiple
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
import { blobToDataURL } from '@/js/util'
import { mapState } from 'vuex'
import Editor from '@/components/Editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
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
    hanldeSuccess () {},
    confirm () {
      if (!this.content.match(/\S/)) {
        this.$notify({
          title: '提示',
          message: '请先输入内容。',
          type: 'warning',
          duration: 1500
        })
        return
      }
      const imgs = []
      const promiseArr = []

      this.$refs.upload.uploadFiles.forEach((item) => {
        promiseArr.push(
          blobToDataURL(item.raw).then((dataURL) => {
            imgs.push(dataURL)
          })
        )
      })

      Promise.all(promiseArr).then(() => {
        const word = {
          ...this.user,
          imgs,
          content: this.content,
          date: dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS')
        }

        word.id = dayjs(word.date).valueOf()

        let cards = localStorage.getItem('cards')

        if (cards) {
          cards = JSON.parse(cards)
        } else {
          cards = []
        }
        cards.push(word)
        localStorage.setItem('cards', JSON.stringify(cards))

        const loadingIns = this.$loading({
          lock: true,
          text: '发布中'
        })

        setTimeout(() => {
          loadingIns.close()
          this.$alert('发布成功').then(() => {
            this.$router.push({
              path: '/'
            })
          })
        }, 3000)
      })
    }
  }
}
</script>

<style lang="stylus">
picture-card-width = 100px
.write
  .write-inline
    border 1px solid #d3d391
    min-height 500px
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
    box-sizing border-box
    line-height 20px
  .upload-container
    padding-left 15px
  .el-upload--picture-card,.el-upload-list__item
    width picture-card-width
    height picture-card-width
    line-height picture-card-width
  .ops
    margin-top 20px
    text-align right
</style>
