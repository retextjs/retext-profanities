'use strict';

var keys = require('object-keys');
var difference = require('lodash.difference');
var intersection = require('lodash.intersection');
var pluralize = require('pluralize');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var cuss = require('cuss/pt-br');

/* Misclassified singulars and plurals. */
var skip = [
  'têm' /* Plural de `tem`. */,
  'lápis' /* Plural and Singular of `lápis`. */,
  'atlas' /* Plural and Singular of `atlas`. */,
  'pires' /* Plural and Singular of `pires`. */,
  'vírus' /* Plural and Singular of `vírus`. */
];

module.exports = profanities;

var words = unpack(cuss);

/* List of values not to normalize. */
var APOSTROPHES = []; // This is not necessary in pt-br so can leave it empty

/* Map of `cuss` ratings to prefixes. */
var PREFIX = ['Tenha cuidado com', 'Reconsidere usar', 'Não use'];

/* Map of `cuss` ratings to suffixes. */
var SUFFIX = [
  'isto é profano em alguns casos',
  'isto pode ser profano',
  'isto é profano'
];

function profanities(options) {
  var ignore = (options || {}).ignore || [];
  var phrases = difference(keys(words), ignore);
  var apostrophes = difference(phrases, APOSTROPHES);
  var noApostrophes = intersection(APOSTROPHES, phrases);

  return transformer;

  /* Search for violations. */
  function transformer(tree, file) {
    search(tree, apostrophes, handle);
    search(tree, noApostrophes, handle, true);

    /* Handle a match. */
    function handle(match, position, parent, phrase) {
      var rating = words[phrase];
      var value = nlcstToString(match);

      var message = file.warn(
        [PREFIX[rating], quotation(value, '“', '”') + ',', SUFFIX[rating]].join(
          ' '
        ),
        {
          start: match[0].position.start,
          end: match[match.length - 1].position.end
        }
      );

      message.ruleId = phrase.replace(/\W+/g, '-');
      message.profanitySeverity = rating;
      message.source = 'retext-profanities';
      message.actual = value;
      message.expected = null;
    }
  }
}

function unpack(map) {
  var result = {};
  var key;
  var rating;

  for (key in map) {
    rating = map[key];
    add(key, rating);
    add(pluralize.singular(key), rating);
    add(pluralize.plural(key), rating);
  }

  function add(key, value) {
    if (skip.indexOf(key) === -1) {
      result[key] = value;
    }
  }

  return result;
}
