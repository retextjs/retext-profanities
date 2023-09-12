/**
 * @typedef {import('./factory.js').Options} Options
 */

import {cuss} from 'cuss/fr.js'
import {factory} from './factory.js'

const retextProfanitiesFr = factory({cuss, lang: 'fr'})

export default retextProfanitiesFr
