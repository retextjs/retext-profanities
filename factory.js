/**
 * @typedef Config
 * @property {string} lang
 * @property {Record<string, number>} cuss
 * @property {{singular: (word: string) => string, plural: (word: string) => string}} [pluralize]
 * @property {string[]} [ignorePluralize]
 * @property {string[]} [regular]
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 * @property {0|1|2} [sureness=0]
 *   Minimum *sureness* to warn about, see `cuss`.
 */

import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {pointStart, pointEnd} from 'unist-util-position'

const own = {}.hasOwnProperty

/**
 * @param {Config} config
 */
export function factory(config) {
  const regular = config.regular || []
  const words = unpack()
  const source =
    'retext-profanities' + (config.lang === 'en' ? '' : '-' + config.lang)

  /**
   * Plugin to check for profane and vulgar wording.
   * Uses `cuss` for sureness.
   *
   * @type {import('unified').Plugin<[Options?]>}
   */
  return (options = {}) => {
    const ignore = options.ignore || []
    const sureness = options.sureness || 0
    const phrases = Object.keys(words).filter((d) => !ignore.includes(d))
    const normals =
      regular.length > 0 ? phrases.filter((d) => !regular.includes(d)) : phrases
    const literals = regular.filter((d) => phrases.includes(d))

    return (tree, file) => {
      search(tree, normals, handle)
      search(tree, literals, handle, true)

      /** @type {import('nlcst-search').Handler} */
      function handle(match, _, _1, phrase) {
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
              start: pointStart(match[0]),
              end: pointEnd(match[match.length - 1])
            },
            [source, phrase.replace(/\W+/g, '-')].join(':')
          ),
          {profanitySeverity, actual, expected: []}
        )
      }
    }
  }

  /**
   * @returns {Record<string, number>}
   */
  function unpack() {
    /** @type {Record<string, number>} */
    const result = {}
    /** @type {string} */
    let key

    for (key in config.cuss) {
      if (own.call(config.cuss, key)) {
        add(key, config.cuss[key])

        if (config.pluralize) {
          add(config.pluralize.singular(key), config.cuss[key])
          add(config.pluralize.plural(key), config.cuss[key])
        }
      }
    }

    /**
     * @param {string} key
     * @param {number} value
     */
    function add(key, value) {
      if (!config.ignorePluralize || !config.ignorePluralize.includes(key)) {
        result[key] = value
      }
    }

    return result
  }
}
