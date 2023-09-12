/**
 * @typedef {import('./factory.js').Options} Options
 */

import {cuss} from 'cuss/ar-latn.js'
import {factory} from './factory.js'

const retextProfanitiesArLatn = factory({cuss, lang: 'ar-latn'})

export default retextProfanitiesArLatn
