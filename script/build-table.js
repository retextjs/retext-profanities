/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').TableContent} TableContent
 */

import {headingRange} from 'mdast-util-heading-range'
import {u} from 'unist-builder'
import {cuss} from 'cuss'

const own = {}.hasOwnProperty

/** @type {import('unified').Plugin<[], Root>} */
export default function table() {
  return (tree) => {
    headingRange(tree, 'list of rules', (start, _, end) => {
      /** @type {TableContent[]} */
      const rows = [
        u('tableRow', [
          u('tableCell', [u('text', 'id')]),
          u('tableCell', [u('text', 'phrase')])
        ])
      ]

      /** @type {string} */
      let phrase

      for (phrase in cuss) {
        if (own.call(cuss, phrase)) {
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
