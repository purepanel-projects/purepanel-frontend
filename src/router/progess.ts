import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router/index.ts'

// 可选配置
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    setTimeout(() => {
        NProgress.done()
    }, 10000)
})
