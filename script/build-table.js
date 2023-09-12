/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').TableContent} TableContent
 */

import {cuss} from 'cuss'
import {headingRange} from 'mdast-util-heading-range'
import {u} from 'unist-builder'

/**
 * @returns
 *   Transform.
 */
export default function table() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    headingRange(tree, 'list of rules', function (start, _, end) {
      /** @type {Array<TableContent>} */
      const rows = [
        u('tableRow', [
          u('tableCell', [u('text', 'id')]),
          u('tableCell', [u('text', 'phrase')])
        ])
      ]

      /** @type {string} */
      let phrase

      for (phrase in cuss) {
        if (Object.hasOwn(cuss, phrase)) {
          rows.push(
            u('tableRow', [
              u('tableCell', [u('inlineCode', phrase.replace(/\W+/g, '-'))]),
              u('tableCell', [u('inlineCode', phrase)])
            ])
          )
        }
      }

      return [start, u('table', rows), end]
    })
  }
}
