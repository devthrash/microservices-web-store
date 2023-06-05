import axios from "./../axios";
import type { IBasketItem } from "@/interfaces/IBasket";
import { useBasketStore } from "@/stores/basket";
import type { ICustomerAddress } from "@/interfaces/ICustomer";

export const getBasket = async (): Promise<IBasketItem[]> => {
    const store = useBasketStore()

    const response = await axios({
        method: 'get',
        url: 'basket',
        params: {
            sessionId: store.sessionId
        }
    })

    if (response.headers['basket-session-id']) {
        store.setSessionId(response.headers['basket-session-id'])
    }

    return response.data
}

export const incrementQuantity = async (productId: string, increment: number = 1): Promise<void> => {
    const store = useBasketStore()
    const response = await axios({
        method: 'post',
        url: 'basket/items',
        data: {
            productId,
            increment
        },
        params: {
            sessionId: store.sessionId
        }
    })

    if (response.headers['basket-session-id']) {
        store.setSessionId(response.headers['basket-session-id'])
    }
}

export const removeItem = async (productId: string): Promise<void> => {
    const store = useBasketStore()
    const response = await axios({
        method: 'delete',
        url: `basket/items/${productId}`,
        params: {
            sessionId: store.sessionId
        }
    })

    if (response.headers['basket-session-id']) {
        store.setSessionId(response.headers['basket-session-id'])
    }
}

export const checkout = async (deliveryAddress: ICustomerAddress): Promise<void> => {
    const store = useBasketStore()
    await axios({
        method: 'post',
        url: `basket/checkout`,
        params: {
            sessionId: store.sessionId
        },
        data: {
            deliveryAddress
        }
    })
}
