export interface ICustomerAddress {
    county: string,
    locality: string,
    address: string,
    contactName: string,
    phone: string,
}

export interface ICustomer {
    firstname: string,
    lastname: string,
    email: string,
    phone: string|null,
    // addresses: ICustomerAddress[],
    address?: ICustomerAddress|null
}
