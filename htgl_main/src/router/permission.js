import router from './index'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach((to, from ,next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            console.log("跳转到首页", store.getters.token);
            next('/')
        }else {
            next()
        }
    }else {
        if (whiteList.includes(to.path)) {
            next()
        }else {
            console.log("没有token，跳转到login页");
            next('/login')
        }
    }
})