import { elementReady } from '../../../utils/elementReady'

export type ProductUids = {
    uidCat: string
    uid: number
}

export async function getProductCategoryUid() {
    const product = (await elementReady('.t-store__product-snippet')) as HTMLElement

    if (product.dataset.productPartUid !== undefined) {
        return getUids()
    }

    const waiting = (): Promise<ProductUids> => {
        return new Promise((resolve) => {
            function callback() {
                setTimeout(() => {
                    if (product.dataset.productPartUid !== undefined) {
                        resolve(getUids())
                    } else {
                        callback()
                    }
                }, 5)
            }

            callback()
        })
    }

    function getUids(): ProductUids {
        const uids = {
            uidCat: product.dataset.productPartUid.split(',')[0],
            uid: Number(product.dataset.productUid),
        }

        return uids
    }

    return waiting()
}
