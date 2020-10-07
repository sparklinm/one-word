<template>
  <div class="write">
    <div class="write-inline">
      <a-row :gutter="3">
        <a-col :span="3">
          <a-avatar
            :src="user.head"
            :size="50"
            class="user-head"
          />
        </a-col>
        <a-col
          :span="21"
          class="write-box-contianer"
        >
          <Editor
            v-model="content"
            class="write-box"
            :auto-size="{ minRows: 5, maxRows: 20 }"
            :placeholder="placeholder"
          />

          <div class="upload-container">
            <a-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              multiple
              :limit="9"
              :before-upload="beforeUpload"
              @review="handlePictureCardPreview"
            >
              <PlusOutlined />
            </a-upload>
            <a-modal
              :visible="dialogVisible"
              :footer="null"
            >
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </a-modal>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="ops">
      <a-button
        type="primary"
        @click="confirm"
      >
        发出
      </a-button>
    </div>

    <Loading
      v-model:visible="showLoading"
      :text="loadingText"
    />
  </div>
</template>

<script>
import { blobToDataURL } from '@/js/util'
import { insertCards } from '@/api/data'
import { mapState } from 'vuex'
import Editor from '@/components/Editor'
import Loading from '@/components/Loading'

export default {
  components: {
    Editor,
    Loading
  },
  data () {
    return {
      placeholder: '写下你的心情。',
      dialogImageUrl: '',
      dialogVisible: false,
      imgs: [],
      content: '',
      fileList: [],
      showLoading: false,
      loadingText: '发布中'
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
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    confirm () {
      if (!this.content.match(/\S/)) {
        this.$notification.warning({
          message: '提示',
          description: '请先输入内容。',
          duration: 1.5
        })
        return
      }
      const imgs = []
      const promiseArr = []

      this.fileList.forEach((item) => {
        promiseArr.push(
          blobToDataURL(item).then((dataURL) => {
            imgs.push(dataURL)
          })
        )
      })


      Promise.all(promiseArr).then(() => {
        const word = {
          ...this.user,
          imgs,
          content: this.content,
          date: dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS'),
          comments: []
        }

        word.id = dayjs(word.date).valueOf()
        insertCards(word)

        this.showLoading = true
        setTimeout(() => {
          this.showLoading = false
          this.$info({
            content: '发布成功',
            onOk: () => {
              this.$router.push({
                path: '/'
              })
            }
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
