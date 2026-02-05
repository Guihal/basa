import { getAllProducts } from './getAllProducts'
import { Product } from './types/product'

export async function countProducts() {
    const products = await getAllProducts()
    const payedProducts: Product[] = []

    let counterPayedProducts = 0
    let counter = 0

    products.forEach((product) => {
        product.editions.forEach((ed) => {
            let isAdded = false
            if (Number(ed.quantity) === 0) {
                if (!isAdded) {
                    payedProducts.push(product)
                    isAdded = true
                }

                counterPayedProducts++
            }
            counter++
        })
    })

    return { payed: counterPayedProducts, all: counter, payedProducts }
}
