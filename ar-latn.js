/**
 * @typedef {import('./factory.js').Options} Options
 */

import {factory} from './factory.js'
import {cuss} from 'cuss/ar-latn.js'

const retextProfanitiesArLatn = factory({lang: 'ar-latn', cuss})

export default retextProfanitiesArLatn
