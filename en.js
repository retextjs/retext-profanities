import {factory} from './factory.js'
import {cuss} from 'cuss'
import pluralize from 'pluralize'

const retextProfanitiesEn = factory({
  lang: 'en',
  cuss,
  pluralize,
  // Misclassified singulars and plurals.
  ignorePluralize: [
    'children',
    'dy', // Singular of `dies`.
    'pro', // Singular of `pros`.
    'so', // Singular of `sos`.
    'dice', // Plural of `die`.
    'fus' // Plural of `fu`.
  ],
  // List of values not to normalize.
  regular: ['hell']
})

export default retextProfanitiesEn
