import type { IBasketItem } from "@/interfaces/IBasket";
import type { ICustomerAddress } from "@/interfaces/ICustomer";

export interface IOrder {
    orderNo: string,
    createdDate: string,
    items: IBasketItem[],
    deliveryAddress: ICustomerAddress
}
