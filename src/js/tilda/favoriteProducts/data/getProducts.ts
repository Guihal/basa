import { getLinkedProductsUid } from './getLinkedProductsUid'
import { getProductCategoryUid } from './getProductCategoryUid'
import { getProductsByCatUid } from './getProductsByCatUid'
import { getProductsByUid } from './getProductsByUid'

export async function getProducts(count: number) {
    const [productUids, categoryUids] = await Promise.all([getLinkedProductsUid(), getProductCategoryUid()])
    const [productsByUids, unsortedProductsByCategory] = await Promise.all([
        getProductsByUid(productUids),
        getProductsByCatUid(categoryUids.uidCat, count + productUids.length + 1),
    ])

    const sortedProductsByCategory = unsortedProductsByCategory.filter((product) => {
        for (const uid of productUids) {
            const uidNumber = Number(uid)
            if (uidNumber === product.uid || categoryUids.uid === product.uid) return false

            return true
        }
    })

    const products = [...productsByUids, ...sortedProductsByCategory]

    products.splice(count, products.length - count)

    return products
}
