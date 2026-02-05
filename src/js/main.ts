import { countProducts } from './countProducts'
import { fillTable } from './fillTable'
import { setProgress } from './setProgress'
import { setZoom } from './tilda/setZoom'

async function main() {
    const { payed, all, payedProducts } = await countProducts()

    setProgress(payed, all)
    fillTable(payedProducts)
}

main()
setZoom()
