import { Product } from '../types/Product'

export async function getProductsByCatUid(uid: string, count: number = 1000): Promise<Product[]> {
    try {
        const request = await fetch(`https://store.tildaapi.com/api/getproductslist/?storepartuid=${uid}&getparts=true&getoptions=true&slice=1&size=${count}`)

        const response = await request.json()

        return response.products
    } catch (error) {
        console.log(error)
        return []
    }
}
