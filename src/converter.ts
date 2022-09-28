// export interface Converter {
//     encode: (text: string) => string // 编码
//     decode: (text: string) => string // 解码
// }

// // 默认 Cookie 值的转换器
// export const defaultConverter: Converter = {
//     encode(text: string) {
//         return text.replace(ASCII_HEX_REGEXP, encodeURIComponent)
//     },
//     decode(text: string) {
//         return text.replace(ASCII_HEX_REGEXP, decodeURIComponent)
//     },
// }


export default {
    read: function (value) {
        if (value[0] === '"') {
            value = value.slice(1, -1)
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
        return encodeURIComponent(value).replace(
            /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
            decodeURIComponent
        )
    }
}