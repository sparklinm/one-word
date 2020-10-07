import app from '@/app'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
app.use(Antd)
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined'
import UpOutlined from '@ant-design/icons-vue/UpOutlined'
import DownOutlined from '@ant-design/icons-vue/DownOutlined'
import RightOutlined from '@ant-design/icons-vue/RightOutlined'
import MessageOutlined from '@ant-design/icons-vue/MessageOutlined'
import MenuUnfoldOutlined from '@ant-design/icons-vue/MenuUnfoldOutlined'

app.component('LoadingOutlined', LoadingOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('UpOutlined', UpOutlined)
app.component('DownOutlined', DownOutlined)
app.component('RightOutlined', RightOutlined)
app.component('MessageOutlined', MessageOutlined)
app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)




// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/base.css'
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// import {
//   Loading,
//   MessageBox,
//   Message,
//   Backtop,
//   Icon,
//   Image,
//   Input,
//   Row,
//   Col,
//   Avatar,
//   Upload,
//   Dialog,
//   Button,
//   Badge,
//   Select,
//   Option,
//   Menu,
//   MenuItem,
//   Tabs,
//   TabPane,
//   Notification
// } from 'element-ui'

// app.use(Dialog)
// app.use(Menu)
// app.use(MenuItem)
// app.use(Input)
// app.use(Select)
// app.use(Option)
// app.use(Button)
// app.use(Tabs)
// app.use(TabPane)
// app.use(Row)
// app.use(Col)
// app.use(Upload)
// app.use(Badge)
// app.use(Image)
// app.use(Backtop)
// app.use(Avatar)
// app.use(Icon)
// app.component(CollapseTransition.name, CollapseTransition)

// app.use(Loading.directive)

// app.config.globalProperties.$loading = Loading.service
// app.config.globalProperties.$msgbox = MessageBox
// app.config.globalProperties.$alert = MessageBox.alert
// app.config.globalProperties.$confirm = MessageBox.confirm
// app.config.globalProperties.$prompt = MessageBox.prompt
// app.config.globalProperties.$message = Message
// app.config.globalProperties.$notify = Notification
