import {ref} from 'vue'
import {defineStore} from 'pinia'

export const usePageTitleStore = defineStore('pageTitle', () => {
    const pageTitle = ref('')

    function update(newPageTitle: string) {
        pageTitle.value = newPageTitle
    }

    return {pageTitle, update}
})