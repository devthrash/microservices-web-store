import { useBasketStore } from "@/stores/basket";
import * as basket from '@/services/apis/basket';
import { computed } from "vue";
import type { ICustomerAddress } from "@/interfaces/ICustomer";

export function useBasket() {
    const store = useBasketStore()

    async function incrementProduct(productId: string, increment: number = 1) {
        await basket.incrementQuantity(productId, increment)
        await fetchItems()
    }

    async function removeProduct(productId: string) {
        await basket.removeItem(productId)
        await fetchItems()
    }

    async function fetchItems() {
        const newItems = await basket.getBasket()
        store.setItems(newItems)
    }

    async function checkout(deliveryAddress: ICustomerAddress) {
        await basket.checkout(deliveryAddress)

        store.setItems([])
        store.setSessionId(null)
    }

    return {
        items: computed(() => store.items),
        incrementProduct,
        removeProduct,
        fetchItems,
        checkout
    }
}
