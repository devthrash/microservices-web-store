import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IBasketItem } from "@/interfaces/IBasket";

export const useBasketStore = defineStore('basket', () => {
    const items = ref<IBasketItem[]>([])
    const sessionId = ref<string|null>(localStorage.getItem('basket_session'))

    function setItems(newItems: IBasketItem[]) {
        items.value = newItems
    }

    function setSessionId(id: string|null) {
        if (typeof id === 'string') {
            localStorage.setItem('basket_session', id)
        } else {
            localStorage.removeItem('basket_session')
        }

        sessionId.value = id
    }

    return {
        sessionId,
        items,
        setItems,
        setSessionId
    }
})
