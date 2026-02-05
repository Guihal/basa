import { elementReady } from '../../../utils/elementReady'

export async function getLinkedProductsUid(): Promise<string[]> {
    const charcs = await elementReady('.js-store-prod-text')

    return new Promise(async (resolve, reject) => {
        let pass = true

        const observer = new MutationObserver(() => {
            if (!pass) return

            const charcsTextNode = charcs.querySelectorAll('.t-typography__characteristics')
            if (charcsTextNode.length === 0) return

            for (let i = 0; i < charcsTextNode.length; i++) {
                if (!charcsTextNode[i].textContent.toLocaleLowerCase().includes('связанные товары')) continue

                pass = !pass

                let uidsData = charcsTextNode[i].textContent.split(':')[1].trim()
                let uidsNotTrimmed: string[] | undefined

                if (uidsData.includes(',')) {
                    uidsNotTrimmed = uidsData.split(',')
                } else {
                    uidsNotTrimmed = [uidsData]
                }

                let uids: string[] = []

                for (let i = 0; i < uidsNotTrimmed.length; i++) {
                    const uid = uidsNotTrimmed[i].trim()

                    if (uid !== '') uids.push(uid)
                }

                resolve(uids)

                return
            }
        })

        setTimeout(() => {
            if (pass) resolve([])
        }, 300)

        observer.observe(charcs, { childList: true, subtree: true })
    })
}
