/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss/fr.js'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesFr = createPlugin({cuss, lang: 'fr'})

export default retextProfanitiesFr
