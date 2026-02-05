export type Product = {
    uid: number
    title: string
    sku: string
    text: string
    mark: string
    quantity: string
    portion: number
    unit: string
    single: string
    price: string
    priceold: string
    descr: string
    gallery: string // JSON-строка, например: '[{"img": "https://..."}]'
    buttonlink: string
    buttontarget: string
    json_options: string
    sort: number
    url: string
    pack_label: string
    pack_x: number
    pack_y: number
    pack_z: number
    pack_m: number
    partuids: string // JSON-строка, например: "[123,456,...]"
    externalid: string
    editions: {
        uid: number
        price: string
        priceold: string
        sku: string
        quantity: string
        img: string
    }[]
    characteristics: {
        title: string
        value: string
    }[]
}
