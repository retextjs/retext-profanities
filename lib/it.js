/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/it.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesIt = createPlugin({lang: 'it', cuss})

export default retextProfanitiesIt
