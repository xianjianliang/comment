import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', redirect: '/home' },
        { path: '/home', component: resolve => require(['../components/Home.vue'], resolve) }
    ]
})