import { getProducts } from './getProducts'
import { Product } from './types/product'

export async function getAllProducts() {
    let isEmpty = false
    let counter = 0
    const productsInRequest = 100

    const products: Product[] = []

    while (isEmpty === false) {
        counter++

        const newProducts = await getProducts(counter, productsInRequest)

        if (newProducts.length < productsInRequest) {
            isEmpty = true
        }

        products.push(...newProducts)
    }

    return products
}
