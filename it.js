/**
 * @typedef {import('./factory.js').Options} Options
 */

import {factory} from './factory.js'
import {cuss} from 'cuss/it.js'

const retextProfanitiesIt = factory({lang: 'it', cuss})

export default retextProfanitiesIt
