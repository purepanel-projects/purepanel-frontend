import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {SysPermission} from "@/type/PermissionRes.ts";

export const useBtnPermissionStore = defineStore('btnPermission', () => {
    const btnList = ref<SysPermission[]>([])

    function update(newBtnList: SysPermission[]) {
        btnList.value = newBtnList
    }

    return {btnList, update}
})