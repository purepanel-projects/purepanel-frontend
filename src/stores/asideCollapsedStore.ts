import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAsideCollapsedStore = defineStore('asideCollapsed', () => {
    const asideCollapsed = ref(true)

    function reverse() {
        asideCollapsed.value = !asideCollapsed.value
    }

    return {asideCollapsed, reverse}
})