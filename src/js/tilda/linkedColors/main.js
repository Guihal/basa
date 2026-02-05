import { getColorLinks } from './getColorLinks'

export default async () => {
    const links = await getColorLinks()

    const callback = () => {
        setTimeout(() => {
            setActiveColor(links)
        }, 100)
    }

    callback()
    document.addEventListener('DOMContentLoaded', callback)
    window.addEventListener('load', callback)

    document.addEventListener('click', (ev) => {
        if (!ev.isTrusted) return

        const option = ev.target.closest('.t-product__option-item_color')
        if (!option) return

        const input = option.querySelector('input')
        if (!input) return

        links.forEach((link) => {
            if (link.color !== input.value) return
            location.href = link.link
        })
    })
}

function setActiveColor(links) {
    const inputs = document.querySelectorAll('.t-product__option-item_color input')
    inputs.forEach((input) => {
        for (const link of links) {
            if (link.color === input.value) return
        }

        input.parentNode.click()
    })
}
