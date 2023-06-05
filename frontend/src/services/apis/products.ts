import axios from "./../axios";
import type { IProduct, IProductPage, IProductSearchPage } from "@/interfaces/IProduct";
import type { IFavorite } from "@/interfaces/IFavorite";

export const getProductCategories = async (): Promise<string[]> => {
    const response = await axios({
        method: 'get',
        url: 'products/categories'
    })

    return response.data
}

export const getProductsInCategory = async (category: string, page: number = 1, perPage: number = 20): Promise<IProductPage> => {
    const response = await axios({
        method: 'get',
        url: `products/category/${category}`,
        params: {
            perPage,
            page
        }
    })

    return response.data
}

export const getProducts = async (page: number = 1, perPage: number = 20): Promise<IProductPage> => {
    const response = await axios({
        method: 'get',
        url: `products`,
        params: {
            perPage,
            page
        }
    })

    return response.data
}

export const getProduct = async (productId: string): Promise<IProduct> => {
    const response = await axios({
        method: 'get',
        url: `products/${encodeURIComponent(productId)}`
    })

    return response.data
}

interface SearchFilters {
    category: string
    brand: string
    minPrice: number,
    maxPrice: number,
}

export const searchProducts = async (text: string, page: number = 1, perPage: number = 20, filters: Partial<SearchFilters>): Promise<IProductSearchPage> => {
    const response = await axios({
        method: 'get',
        url: `products/search?text=${encodeURIComponent(text)}`,
        params: {
            page,
            perPage,
            ...filters
        }
    })

    return response.data
}

export const addToFavorites = async (productId: string): Promise<void> => {
    await axios({
        method: 'put',
        url: `products/favorites/${productId}`
    })
}

export const removeFavorite = async (productId: string): Promise<void> => {
    await axios({
        method: 'delete',
        url: `products/favorites/${productId}`
    })
}

export const getFavorites = async (): Promise<IFavorite[]> => {
    const response = await axios({
        method: 'get',
        url: 'products/favorites'
    })

    return response.data
}
