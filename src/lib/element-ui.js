import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {
  Loading,
  MessageBox,
  Message,
  Backtop,
  Icon,
  Image,
  Input,
  Row,
  Col,
  Avatar,
  Upload,
  Dialog,
  Button,
  Badge,
  Select,
  Option,
  Menu,
  MenuItem,
  Tabs,
  TabPane
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Image)
Vue.use(Backtop)
Vue.use(Avatar)
Vue.use(Icon)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
