/**
 * @typedef {import('./factory.js').Options} Options
 */

import {factory} from './factory.js'
import {cuss} from 'cuss/es.js'

const retextProfanitiesEs = factory({lang: 'es', cuss})

export default retextProfanitiesEs
