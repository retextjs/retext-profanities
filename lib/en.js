/**
 * @typedef {import('./create-plugin.js').Options} Options
 */

import {cuss} from 'cuss'
import pluralize from 'pluralize'
import {createPlugin} from './create-plugin.js'

const retextProfanitiesEn = createPlugin({
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
