import axios from "./../axios";
import type { IOrder } from "@/interfaces/IOrder";

interface GetOrdersResponse {
    orders: IOrder[],
    total: number
}

export const getOrders = async (perPage: number, page: number): Promise<GetOrdersResponse> => {
    const response = await axios({
        method: 'get',
        url: 'orders',
        params: {
            perPage,
            page
        }
    })

    return response.data
}
