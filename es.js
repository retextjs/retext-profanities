/**
 * @typedef {import('./factory.js').Options} Options
 */

import {cuss} from 'cuss/es.js'
import {factory} from './factory.js'

const retextProfanitiesEs = factory({cuss, lang: 'es'})

export default retextProfanitiesEs
