/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/ar-latn.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesArLatn = createPlugin({cuss, lang: 'ar-latn'})

export default retextProfanitiesArLatn
