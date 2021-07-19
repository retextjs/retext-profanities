import test from 'tape'
import {retext} from 'retext'
import french from './fr.js'
import english from './index.js'

test('profanities', function (t) {
  retext()
    .use(english)
    .process('Shit!', function (error, file) {
      t.deepEqual(
        JSON.parse(JSON.stringify([error].concat(file.messages))),
        [
          null,
          {
            name: '1:1-1:5',
            message: 'Don’t use `Shit`, it’s profane',
            reason: 'Don’t use `Shit`, it’s profane',
            line: 1,
            column: 1,
            source: 'retext-profanities',
            ruleId: 'shit',
            position: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 5, offset: 4}
            },
            fatal: false,
            profanitySeverity: 2,
            actual: 'Shit',
            expected: []
          }
        ],
        'should warn'
      )
    })

  retext()
    .use(french)
    .process('Merde!', function (error, file) {
      t.deepEqual(
        [error].concat(file.messages.map(String)),
        [null, '1:1-1:6: Don’t use `Merde`, it’s profane'],
        'should support other languages'
      )
    })

  retext()
    .use(english)
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error].concat(file.messages.map(String)),
          [
            null,
            '1:33-1:37: Be careful with `butt`, it’s profane in some cases',
            '2:9-2:15: Don’t use `asshat`, it’s profane',
            '3:34-3:40: Reconsider using `addict`, it may be profane'
          ],
          'should warn about profanities'
        )
      }
    )

  retext()
    .use(english, {ignore: ['butt']})
    .process(
      ['He’s pretty set on beating your butt for sheriff.'].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error].concat(file.messages.map(String)),
          [null],
          'should not warn for `ignore`d phrases'
        )
      }
    )

  retext()
    .use(english)
    .process(
      ['When he’ll freeze over, hell freezes over.'].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error].concat(file.messages.map(String)),
          [
            null,
            '1:25-1:29: Be careful with `hell`, it’s profane in some cases'
          ],
          'should correctly depend on apostrophes'
        )
      }
    )

  retext()
    .use(english)
    .process('slave slaves', function (error, file) {
      t.deepEqual(
        [error].concat(file.messages.map(String)),
        [
          null,
          '1:1-1:6: Don’t use `slave`, it’s profane',
          '1:7-1:13: Don’t use `slaves`, it’s profane'
        ],
        'should support plurals and singulars'
      )
    })

  retext()
    .use(english, {sureness: 1})
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error].concat(file.messages.map(String)),
          [
            null,
            '2:9-2:15: Don’t use `asshat`, it’s profane',
            '3:34-3:40: Reconsider using `addict`, it may be profane'
          ],
          'should warn about profanities'
        )
      }
    )

  t.end()
})
