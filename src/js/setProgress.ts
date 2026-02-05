import { countProducts } from './countProducts'

export async function setProgress(payed, all) {
    document.addEventListener('DOMContentLoaded', () => {
        set(payed, all)
        console.log(1)
    })
    set(payed, all)
}

function set(payed: number, all: number) {
    const progress = document.querySelectorAll('.progress')
    progress.forEach((el: HTMLDivElement) => {
        const text = el.querySelector('.progress_text')
        if (!text) return

        if (all === 0) {
            return
        }

        text.textContent = `${payed}/${all}`

        el.style.setProperty('--progress', `${(payed / all) * 100}%`)

        el.classList.remove('loading')
    })
}
