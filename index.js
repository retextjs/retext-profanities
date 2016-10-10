/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:profanities
 * @fileoverview Check for profanities.
 */

'use strict';

/* Dependencies. */
var keys = require('object-keys');
var difference = require('array-differ');
var intersection = require('array-intersection');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var cuss = require('cuss');

/* Expose. */
module.exports = attacher;

/* List of values not to normalize. */
var APOSTROPHES = ['hell'];

/* Map of `cuss` ratings to prefixes. */
var PREFIX = [
  'Be careful with',
  'Reconsider using',
  'Don’t use'
];

/* Map of `cuss` ratings to suffixes. */
var SUFFIX = [
  'it’s profane in some cases',
  'it may be profane',
  'it’s profane'
];

/* Attacher. */
function attacher(processor, options) {
  var ignore = (options || {}).ignore || [];
  var phrases = difference(keys(cuss), ignore);
  var apostrophes = difference(phrases, APOSTROPHES);
  var noApostrophes = intersection(APOSTROPHES, phrases);

  return transformer;

  /* Search for violations. */
  function transformer(tree, file) {
    search(tree, apostrophes, handle);
    search(tree, noApostrophes, handle, true);

    /* Handle a match. */
    function handle(match, position, parent, phrase) {
      var rating = cuss[phrase];

      var message = file.warn([
        PREFIX[rating],
        quotation(nlcstToString(match), '“', '”') + ',',
        SUFFIX[rating]
      ].join(' '), {
        start: match[0].position.start,
        end: match[match.length - 1].position.end
      });

      message.ruleId = phrase.replace(/\W+/g, '-');
      message.profanitySeverity = rating;
      message.source = 'retext-profanities';
    }
  }
}
