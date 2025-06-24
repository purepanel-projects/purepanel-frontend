import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/pages/layout/Layout.vue'
import LoginPage from "@/pages/login/LoginPage.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/pages/home/Home.vue')
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('@/pages/system/user/UserList.vue')
                }
            ]
        },
    ],
})

//配置 NProgress
NProgress.configure({showSpinner: false})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    setTimeout(() => {
        NProgress.done()
    }, 300)
})

export default router
