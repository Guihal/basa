export async function setZoom() {
    let isActive = false

    const set = async (inEvent: boolean = true) => {
        if (isActive) return
        const scaled = document.querySelector('[style*="zoom"]:not(svg, html)') as HTMLDivElement
        if (!scaled) {
            setTimeout(set, 30)

            return
        }

        isActive = true

        const callback = () => {
            let zoom = getComputedStyle(scaled).zoom
            console.log(zoom, scaled, getComputedStyle(scaled))
            if (zoom == '0' || zoom === '1') {
                zoom = getComputedStyle(scaled).getPropertyValue('--zoom')

                if (zoom === '0') {
                    zoom = '1'
                }
            }

            document.documentElement.style.setProperty('--zoom', zoom)
        }

        callback()

        const observer = new MutationObserver(callback)

        observer.observe(scaled, {
            attributes: true,
        })
    }

    set(false)
}
