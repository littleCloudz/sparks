import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
Vue.use(VueRouter)


export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/401',
            component: () => import('@/views/errorPage/401')
        },
        {
            path: '/login/:id',
            component: () => import('@/views/login/index'),
            beforeEnter(to, from, next) {
                console.log(to.params)
                console.log(from)
                next()
            }
        }
    ]
})
