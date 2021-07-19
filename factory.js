import difference from 'lodash.difference'
import intersection from 'lodash.intersection'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'

const own = {}.hasOwnProperty

export function factory(config) {
  const words = unpack(config.cuss)
  const source =
    'retext-profanities' + (config.lang === 'en' ? '' : '-' + config.lang)

  return (options = {}) => {
    const ignore = options.ignore || []
    const sureness = options.sureness || 0
    const phrases = difference(Object.keys(words), ignore)
    const normals = difference(phrases, config.regular)
    const literals = intersection(config.regular, phrases)

    return (tree, file) => {
      search(tree, normals, handle)
      search(tree, literals, handle, true)

      // Handle a match.
      function handle(match, position, parent, phrase) {
        const profanitySeverity = words[phrase]
        const actual = toString(match)

        if (profanitySeverity < sureness) {
          return
        }

        Object.assign(
          file.message(
            [
              profanitySeverity === 0
                ? 'Be careful with'
                : profanitySeverity === 1
                ? 'Reconsider using'
                : 'Don’t use',
              quotation(actual, '`') + ',',
              profanitySeverity === 0
                ? 'it’s profane in some cases'
                : profanitySeverity === 1
                ? 'it may be profane'
                : 'it’s profane'
            ].join(' '),
            {
              start: match[0].position.start,
              end: match[match.length - 1].position.end
            },
            [source, phrase.replace(/\W+/g, '-')].join(':')
          ),
          {profanitySeverity, actual, expected: []}
        )
      }
    }
  }

  function unpack(map) {
    const result = {}
    let key

    for (key in map) {
      if (own.call(map, key)) {
        add(key, map[key])

        if (config.pluralize) {
          add(config.pluralize.singular(key), map[key])
          add(config.pluralize.plural(key), map[key])
        }
      }
    }

    function add(key, value) {
      if (!config.ignorePluralize || !config.ignorePluralize.includes(key)) {
        result[key] = value
      }
    }

    return result
  }
}
