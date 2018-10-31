'use strict'

var pluralize = require('pluralize')
var cuss = require('cuss')
var factory = require('./factory')

module.exports = factory({
  lang: 'en',
  cuss: cuss,
  pluralize: pluralize,
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
