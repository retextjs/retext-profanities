/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef {import('nlcst-search').Handler} Handler
 *
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Config
 *   Configuration.
 * @property {string} lang
 *   BCP-47 tag.
 * @property {Record<string, number>} cuss
 *   Cuss.
 * @property {Pluralize | undefined} [pluralize]
 *   Pluralize instance.
 * @property {ReadonlyArray<string> | undefined} [ignorePluralize]
 *   Phrases not to make plural/singular.
 * @property {ReadonlyArray<string> | undefined} [regular]
 *   Phrases not to normalize.
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {ReadonlyArray<string> | null | undefined} [ignore]
 *   Phrases *not* to warn about (optional).
 * @property {0 | 1 | 2 | null | undefined} [sureness=0]
 *   Minimum *sureness* to warn about, see `cuss` (default: `0`).
 *
 * @typedef Pluralize
 *   Pluralize instance.
 * @property {Transform} singular
 *   Transform to singular.
 * @property {Transform} plural
 *   Transform to plural.
 *
 * @callback Transform
 *   Transform a word.
 * @param {string} word
 *   Word to transform.
 * @returns {string}
 *   Transformed word.
 */

import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {pointEnd, pointStart} from 'unist-util-position'

/** @type {Readonly<Options>} */
const emptyOptions = {}
/** @type {ReadonlyArray<never>} */
const emptyList = []

/**
 * @param {Config} config
 *   Configuration (required).
 * @returns
 *   Plugin.
 */
export function createPlugin(config) {
  const regular = config.regular || emptyList
  const words = unpack()
  const source =
    'retext-profanities' + (config.lang === 'en' ? '' : '-' + config.lang)

  /**
   * Check for potential bad words.
   *
   * @param {Readonly<Options> | null | undefined} [options]
   *   Configuration (optional).
   * @returns
   *   Transform.
   */
  return function (options) {
    const settings = options || emptyOptions
    const ignore = settings.ignore || emptyList
    const sureness = settings.sureness || 0
    const phrases = Object.keys(words).filter(function (d) {
      return !ignore.includes(d)
    })
    const normals =
      regular.length > 0
        ? phrases.filter(function (d) {
            return !regular.includes(d)
          })
        : phrases
    const literals = regular.filter(function (d) {
      return phrases.includes(d)
    })

    /**
     * Transform.
     *
     * @param {Root} tree
     *   Tree.
     * @param {VFile} file
     *   File.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree, file) {
      search(tree, normals, handle)
      search(tree, literals, handle, {allowApostrophes: true})

      /** @type {Handler} */
      function handle(match, _, parent, phrase) {
        const profanitySeverity = words[phrase]
        const actual = toString(match)

        if (profanitySeverity < sureness) {
          return
        }

        const start = pointStart(match[0])
        const end = pointEnd(match[match.length - 1])

        const message = file.message(
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
            /* c8 ignore next -- verbose to test */
            place: start && end ? {start, end} : undefined,
            ruleId: phrase.replace(/\W+/g, '-'),
            source
          }
        )

        message.actual = actual
        message.expected = []
        // @ts-expect-error: to do: remove or type.
        message.profanitySeverity = profanitySeverity
        message.url = 'https://github.com/retextjs/retext-profanities#readme'
      }
    }
  }

  /**
   * @returns {Record<string, number>}
   *   Cuss.
   */
  function unpack() {
    /** @type {Record<string, number>} */
    const result = {}
    /** @type {string} */
    let key

    for (key in config.cuss) {
      if (Object.hasOwn(config.cuss, key)) {
        add(key, config.cuss[key])

        if (config.pluralize) {
          add(config.pluralize.singular(key), config.cuss[key])
          add(config.pluralize.plural(key), config.cuss[key])
        }
      }
    }

    /**
     * @param {string} key
     *   Key.
     * @param {number} value
     *   Value.
     */
    function add(key, value) {
      if (!config.ignorePluralize || !config.ignorePluralize.includes(key)) {
        result[key] = value
      }
    }

    return result
  }
}
