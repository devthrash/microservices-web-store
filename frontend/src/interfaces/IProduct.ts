export interface IProductImage {
    url: string
}

export interface IProductSpec {
    name: string,
    value: any
}

export interface IProduct {
    _id: string,
    title: string,
    description: string,
    images: IProductImage[],
    category: string,
    specs: IProductSpec[]
    price: number,
    brand: {
        name: string
    }
}

export interface IProductPage {
    products: IProduct[],
    total: number
}

export interface Category {
    _id: string,
    count: number
}

export interface Brand {
    _id: string,
    count: number
}

export interface PriceBucket {
    _id: number|string,
    maxPrice: number,
    count: number
}

interface SpecFacet {
    _id: string,
    values: { value: any, count: number }[]
}

export interface IProductSearchPage {
    products: IProduct[],
    total: number,
    // minPrice: number|null,
    // maxPrice: number|null,
    categories: Category[],
    brand: Brand[],
    prices: PriceBucket[],
    specs: SpecFacet[]
}
