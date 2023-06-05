import axios from "./../axios";

import type { ICustomer, ICustomerAddress } from "@/interfaces/ICustomer";

export const getCurrentCustomer = async (): Promise<ICustomer> => {
    const response = await axios({
        method: 'get',
        url: 'customers/me'
    })

    return response.data
}

interface CustomerForm {
    firstname: string,
    lastname: string,
    phone: string|null,
    address: ICustomerAddress|null,
}

export const updateCurrentCustomer = async (data: Partial<CustomerForm>): Promise<ICustomer> => {
    const response = await axios({
        method: 'put',
        url: 'customers/me',
        data
    })

    return response.data
}
