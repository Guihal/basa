export async function elementReady(selector: string, parent: Element | Document = document.documentElement): Promise<Element> {
    return new Promise((resolve) => {
        let block = parent.querySelector(selector)

        if (block) {
            resolve(block)
            return
        }

        const observer = new MutationObserver((mutations, obs) => {
            block = parent.querySelector(selector)

            if (block) {
                resolve(block)
                obs.disconnect()
            }
        })

        observer.observe(parent, { childList: true, subtree: true })
    })
}
