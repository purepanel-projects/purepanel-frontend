import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/pages/layout/Layout.vue'
import LoginPage from "@/pages/login/LoginPage.vue";
import UserList from "@/pages/system/user/UserList.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/layout',
            name: 'layout',
            component: Layout,
            children: [
                {
                    path: '/user',
                    name: 'user',
                    component: UserList
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue'),
        // },
    ],
})

//配置 NProgress
NProgress.configure({showSpinner: false})
router.beforeEach((to, from, next) => {
    console.log('NProgress')
    NProgress.start()
    next()
})
router.afterEach(() => {
    console.log('NProgress')
    setTimeout(() => {
        NProgress.done()
    }, 100)
})

export default router
