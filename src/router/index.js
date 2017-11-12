import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Shop from '@/components/page/Shop'
import Hello from '@/components/page/HelloWorld'



Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'pos',
        component: Pos
    }, {
        path: '/shop',
        name: 'shop',
        component: Shop
    }, {
        path: '/goods',
        name: 'hello',
        component: Hello
    }]
})