import { Product } from '../types/Product'

export async function getProductsByUid(uids: string[]): Promise<Product[]> {
    if (uids.length === 0) return []

    const body = { productsuid: uids }

    const request = await fetch('https://store.tildaapi.com/api/getproductsbyuid/', {
        method: 'POST',
        body: JSON.stringify(body),
    })

    const response = await request.json()

    return response.products
}
