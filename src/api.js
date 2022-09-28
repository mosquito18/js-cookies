
import assign from '../../../learn-codding/js-cookie/src/assign.mjs'
import defaultConverter from './converter'

function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
        if (typeof document === 'undefined') {
            return
        }
        attributes = assign({}, defaultAttributes, attributes)

        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(Date.now() + attributes.expires * 864e5)
        }
        if (attributes.expires) {
            attributes.expires = attributes.expires.toUTCString()
        }

        name = encodeURIComponent(name)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape)

        var stringifiedAttributes = '';

        for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue
            }

            stringifiedAttributes += '; ' + attributeName;

            if (attributes[attributeName] === true) {
                continue
            }

            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
        }

        // TODO:
        return (document.cookie =
            name + '=' + converter.write(value, name) + stringifiedAttributes)
    }

    function get(name) {

    }

    return {
        set,
        get,
        remove: function (name) {

        }
    }
}

export default init