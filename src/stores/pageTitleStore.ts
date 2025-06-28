import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageTitleStore = defineStore('pageTitle', () => {
    const pageTitle = ref<string | undefined>('')

    function update(newPageTitle?: string) {
        pageTitle.value = newPageTitle
    }

    return { pageTitle, update }
})