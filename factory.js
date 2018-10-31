'use strict'

var keys = require('object-keys')
var difference = require('lodash.difference')
var intersection = require('lodash.intersection')
var nlcstToString = require('nlcst-to-string')
var quotation = require('quotation')
var search = require('nlcst-search')

// Map of `cuss` ratings to prefixes.
var prefixes = ['Be careful with', 'Reconsider using', 'Don’t use']

// Map of `cuss` ratings to suffixes.
var suffixes = [
  'it’s profane in some cases',
  'it may be profane',
  'it’s profane'
]

var pid = 'retext-profanities'
var english = 'en'
var dash = '-'
var comma = ','
var openingQuote = '“'
var closingQuote = '”'
var word = /\W+/g
var dashLetter = /-([a-z])/g

module.exports = factory

function factory(config) {
  var lang = config.lang
  var regular = config.regular
  var pluralize = config.pluralize
  var ignorePluralize = config.ignorePluralize
  var words = unpack(config.cuss)
  var source = pid + (config.lang === english ? '' : dash + lang)

  profanities.displayName = [pid, lang]
    .join(dash)
    .replace(dashLetter, titleCase)

  return profanities

  function profanities(options) {
    var ignore = (options || {}).ignore || []
    var phrases = difference(keys(words), ignore)
    var normals = difference(phrases, regular)
    var literals = intersection(regular, phrases)

    return transformer

    // Search for violations.
    function transformer(tree, file) {
      search(tree, normals, handle)
      search(tree, literals, handle, true)

      // Handle a match.
      function handle(match, position, parent, phrase) {
        var rating = words[phrase]
        var value = nlcstToString(match)

        var message = file.warn(
          [
            prefixes[rating],
            quotation(value, openingQuote, closingQuote) + comma,
            suffixes[rating]
          ].join(' '),
          {
            start: match[0].position.start,
            end: match[match.length - 1].position.end
          }
        )

        message.ruleId = phrase.replace(word, dash)
        message.profanitySeverity = rating
        message.source = source
        message.actual = value
        message.expected = null
      }
    }
  }

  function unpack(map) {
    var result = {}
    var key
    var rating

    for (key in map) {
      rating = map[key]
      add(key, rating)

      if (pluralize) {
        add(pluralize.singular(key), rating)
        add(pluralize.plural(key), rating)
      } else {
        add(key, rating)
      }
    }

    function add(key, value) {
      if (!ignorePluralize || ignorePluralize.indexOf(key) === -1) {
        result[key] = value
      }
    }

    return result
  }
}

function titleCase($0, $1) {
  return $1.charAt(0).toUpperCase()
}
