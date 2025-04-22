class DocumentMutationObserver {
    needToCall = []
    desired = []
    defaultNotSelector = '.init'
    opt = { childList: true, subtree: true }

    constructor() {
        this.observer = new MutationObserver(this.callbackDocument)
        this.observer.observe(document.documentElement, this.opt)

        document.addEventListener('DOMContentLoaded', () => {
            this.runDesired(document.documentElement)
            this.runNeedToCall(document.documentElement)
        })
    }

    callbackDocument = (mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== Node.ELEMENT_NODE) return

                this.runNeedToCall(node)
                this.runDesired(node)
            })
        })
    }

    runNeedToCall(node) {
        this.needToCall.forEach((obj) => {
            const els = this.getAll(node, obj.selector)
            if (els.length === 0) return
            els.forEach((el) => {
                if (el.classList.contains(obj.notSelector)) return
                el.classList.add(obj.notSelector)
                this.runIfFunc(obj.callback, el)
            })
        })
    }

    getNotSelector = (selector, notSelector) => {
        const not = `:not(${notSelector})`
        if (!selector.includes(',')) {
            return `${selector}${not}`
        }

        const splitSelector = selector.split(',')
        selector = ''

        for (let i = 0; i < splitSelector.length; i++) {
            if (i === splitSelector.length - 1) {
                selector += `${splitSelector[i]}${not}`
                continue
            }

            selector += `${splitSelector[i]}${not},`
        }

        return selector
    }

    getAll(node, selector) {
        const els = Array.from(node.querySelectorAll(selector))

        const el = this.desiredSingle(node, selector)
        if (el) {
            els.push(el)
        }

        return els
    }

    desiredSingle(node, selector, resolve = false, index = false) {
        let foundNode = this.checkNode(node, selector)
        if (!foundNode) {
            foundNode = node.querySelector(selector)
        }

        if (foundNode) {
            this.runIfFunc(resolve, foundNode)
            if (index !== false) this.desired.splice(index, 1)
        }

        return foundNode
    }

    runIfFunc(func, ...args) {
        if (typeof func !== 'function') return
        func(...args)
    }

    runDesired(node) {
        this.desired.forEach((des, index) => {
            this.desiredSingle(node, des.selector, des.resolve, index)
        })
    }

    checkNode = (node, selector) => (node.matches?.(selector) ? node : null)

    get(selector, parent = false) {
        return new Promise((resolve) => {
            if (parent !== false) {
                this.getInParent(selector, parent, resolve)
                return
            }
            const ex = document.querySelector(selector)
            if (ex) {
                resolve(ex)
                return
            }
            this.desired.push({ selector, resolve })
        })
    }

    getInParent(selector, parent, resolve) {
        const ex = parent.querySelector(selector)
        if (ex) {
            resolve(ex)
            return
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return
                    if (this.desiredSingle(node, selector, resolve)) {
                        observer.disconnect()
                    }
                })
            })
        })
        observer.observe(parent, this.opt)
    }

    setCallback(callback, selector, notSelector = this.defaultNotSelector) {
        const obj = {
            callback: callback,
            selector: this.getNotSelector(selector, notSelector),
            notSelector: notSelector.replace('.', ''),
        }

        this.needToCall.push(obj)
        return this
    }
}

export const documentObserver = new DocumentMutationObserver()
