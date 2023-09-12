/**
 * @typedef {import('./factory.js').Options} Options
 */

import {cuss} from 'cuss'
import pluralize from 'pluralize'
import {factory} from './factory.js'

const retextProfanitiesEn = factory({
  cuss,
  // Misclassified singulars and plurals.
  ignorePluralize: [
    'children',
    'dy', // Singular of `dies`.
    'pro', // Singular of `pros`.
    'remain', // Singular of `remains`
    'so', // Singular of `sos`.
    'dice', // Plural of `die`.
    'fus' // Plural of `fu`.
  ],
  lang: 'en',
  pluralize,
  // List of values not to normalize.
  regular: ['hell', 'whore']
})

export default retextProfanitiesEn
