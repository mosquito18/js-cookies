function get(key: string): string | null {
    const cookiePairs = document.cookie ? document.cookie.split(';') : [];

    const cookieStore: Record<string, string> = {};

    cookiePairs.some(pair => {
        const [curtKey, ...curtValues] = pair.split('=');
        try {
            // 解码
            const decodeedValue = decodeURIComponent(curtValues.join('='))  // 有可能 value 存在 '='
            cookieStore[curtKey] = decodeedValue

        } catch (e) {

        }

        return curtKey === key
    })

    return key ? cookiePairs[key] : null
}

// document.cookie = `${key}=${value}; expires=${expires}; path=${path}`

interface Attributes {
    path: string // Cookie 对应路径
    expires?: string | number | Date// Cookie 的过期时间，第N天过期
}

const TWENTY_FOUR_HOURS = 864e5
const defaultAttributes: Attributes = { path: '/' }

function set(key: string, value: string, attributes = defaultAttributes): string | null {
    attributes = { ...defaultAttributes, ...attributes };
    if (attributes.expires) {
        // 将过期天数转为 UTC string
        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(Date.now() + attributes.expires * TWENTY_FOUR_HOURS)
            attributes.expires = attributes.expires.toUTCString()
        }
    }

    // 获取 Cookie 其它属性的字符串形式，如 "; expires=1; path=/"
    const attrStr = Object.entries(attributes).reduce((prevStr, attrPair) => {
        const [attrKey, attrValue] = attrPair;

        if (!attrValue) return prevStr;

        prevStr += `;${attrKey}`;

        // attrValue 有可能为 truthy，所以要排除 true 值的情况
        if (attrValue === true) return prevStr;

        // 排除 attrValue 存在 ";" 号的情况
        prevStr += `=${attrValue.split('; ')[0]}`;

        return prevStr

    }, '')

    value = encodeURIComponent(value)

    return document.cookie = `${key}=${value}${attrStr}`
}

/**
 * 删除某个 Cookie
 */

function del(key: string, attributes = defaultAttributes) {
    // 将 expires 减 1 天，Cookie 自动失败
    set(key, '', { ...attributes, expires: -1 })
}