import {headingRange} from 'mdast-util-heading-range'
import {u} from 'unist-builder'
import {cuss} from 'cuss'

const own = {}.hasOwnProperty

export default function table() {
  return (tree) => {
    headingRange(tree, 'list of rules', (start, nodes, end) => {
      const rows = [
        u('tableRow', [
          u('tableCell', [u('text', 'id')]),
          u('tableCell', [u('text', 'phrase')])
        ])
      ]

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

      return [start].concat(u('table', rows), end)
    })
  }
}
