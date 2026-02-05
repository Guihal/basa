import { Product } from './types/product'

export async function getProducts(slice: number = 1, count: number = 100): Promise<Product[]> {
    try {
        const request = await fetch(
            `https://store.tildaapi.com/api/getproductslist/?storepartuid=357749660412&recid=1442128661&getparts=true&c=${Date.now()}&getoptions=true&slice=${slice}&size=${count}`
        )

        const response = await request.json()

        return response.products
    } catch (error) {
        console.log(error)
        return []
    }
}
