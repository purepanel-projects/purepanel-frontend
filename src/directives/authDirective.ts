import type {Directive} from 'vue'
import {usePageElementPermissionStore} from "@/stores/pageElementPermissionStore.ts";

const authDirective: Directive = {
    mounted(el, binding) {
        const pageElementPermissionStore = usePageElementPermissionStore()

        if (!pageElementPermissionStore || !binding.value) return

        const code = binding.value
        const hasPermission = pageElementPermissionStore.pageElementPermissionList.some(item => item.authCode === code)

        if (!hasPermission) {
            el.style.display = 'none'
        }
    }
}

export default authDirective
