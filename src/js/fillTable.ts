import { Product } from './types/product'

export function fillTable(payedProducts: Product[]) {
    const tableBody = document.querySelector('.table__body')

    if (!tableBody) return

    let html = ''

    payedProducts.forEach((product) => {
        if (!product.title.includes('{')) return
        console.log(product)
        html += `
        <div class="table__row">
            <div class="table__col-small"><div class="table_text">${getName(product)}</div></div>
            <div class="table__col"><div class="table_text">${product.sku}</div></div>
        </div>
        `
    })

    tableBody.innerHTML = html

    function getName(product: Product) {
        const splittedTitle = product.title.split('{')
        return splittedTitle[1].split('}')[0].replace(',', '').trim()
    }

    function getGift(product: Product) {
        const splittedTitle = product.title.split('}')

        return splittedTitle[splittedTitle.length - 1].trim()
    }
}
