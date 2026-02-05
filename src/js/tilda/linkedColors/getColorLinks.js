import { elementReady } from '../../utils/elementReady'

export async function getColorLinks() {
    const dataContainer = await elementReady('.js-store-prod-all-charcs')
    const container = await elementReady('.js-store-prod-text')

    if (!dataContainer.hasChildNodes()) return

    const dataBlocks = dataContainer.childNodes
    const data = []

    for (const child of dataBlocks) {
        let text = child.textContent.trim()

        if (text.length === 0) continue
        if (text[0] !== '#') continue

        child.style.display = 'none'

        text = text.replace('#', '')

        const textSplitted = text.split(': ')

        data.push({
            color: textSplitted[0].trim(),
            link: textSplitted[1].trim(),
        })

        child.remove()
    }

    console.log(data)

    if (container.textContent.trim().length === 0) {
        container.remove()
    }

    return data
}
