declare module './elementReady' {
    const fn: (selector: string) => Promise<Element | null>
    export default fn
}
