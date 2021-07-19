import range from 'mdast-util-heading-range'
import u from 'unist-builder'
import {cuss} from 'cuss'

export default function table() {
  return transformer
}

function transformer(tree) {
  range(tree, 'list of rules', function (start, nodes, end) {
    var rows = [
      u('tableRow', [
        u('tableCell', [u('text', 'id')]),
        u('tableCell', [u('text', 'phrase')])
      ])
    ]

    let phrase

    for (phrase in cuss) {
      rows.push(
        u('tableRow', [
          u('tableCell', [u('inlineCode', id(phrase))]),
          u('tableCell', [u('inlineCode', phrase)])
        ])
      )
    }

    return [start].concat(u('table', rows), end)
  })
}

function id(value) {
  return value.replace(/\W+/g, '-')
}
