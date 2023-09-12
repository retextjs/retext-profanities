/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/pt.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesPtBr = createPlugin({cuss, lang: 'pt'})

export default retextProfanitiesPtBr
