/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/es.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesEs = createPlugin({cuss, lang: 'es'})

export default retextProfanitiesEs
