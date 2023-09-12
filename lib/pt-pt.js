/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/pt-pt.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesPt = createPlugin({cuss, lang: 'pt-pt'})

export default retextProfanitiesPt
