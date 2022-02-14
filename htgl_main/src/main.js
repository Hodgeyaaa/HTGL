import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/icons/index.js'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/router/permission.js'
import * as ELIcon from '@element-plus/icons-vue'
import i18n from '@/i18n'
import filters from './utils/filters'

const app = createApp(App)
SvgIcon(app)
// 全局属性$filters
filters(app)
app.use(store).use(router).use(i18n).mount('#app')

for (const iconName in ELIcon) {
    app.component(iconName, ELIcon[iconName])
}
// console.log("name:", ELIcon);