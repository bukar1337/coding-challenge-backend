import lang from './lang'
import _ from 'lodash'

export default (type, key, replace) => {
    let text = _.get(lang[type], key)

    if (replace && typeof replace === 'object') {
        for (const i in replace) {
            if (typeof replace[i] === 'string') {
                text = _.replace(text, i, replace[i])
            }
        }
    }
    return text
}
