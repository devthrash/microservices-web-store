import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface Toast {
    uuid: string,
    message: string
}

export const useToastsStore = defineStore('toasts', () => {
    const toasts = ref<Toast[]>([])

    function pushToast(message: string) {
        toasts.value.push({
            uuid: uuidv4(),
            message
        })

        console.log(toasts.value)
    }

    function removeToast(uuid: string) {
        toasts.value.splice(toasts.value.findIndex((i) => i.uuid === uuid), 1)
    }

    return {
        toasts,
        pushToast,
        removeToast
    }
})
