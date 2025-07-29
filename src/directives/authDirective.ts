import type {Directive} from 'vue'
import {useBtnPermissionStore} from "@/stores/btnPermissionStore.ts";

const authDirective: Directive = {
    mounted(el, binding) {
        const btnStore = useBtnPermissionStore()

        if (!btnStore || !binding.value) return

        const code = binding.value
        const hasPermission = btnStore.btnList.some(item => item.authCode === code)

        if (!hasPermission) {
            el.style.display = 'none'
        }
    }
}

export default authDirective
