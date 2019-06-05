'use strict'

var test = require('tape')
var retext = require('retext')
var french = require('./fr')
var english = require('.')

test('profanities', function(t) {
  retext()
    .use(english)
    .process('Shit!', function(err, file) {
      t.deepEqual(
        [err].concat(file.messages),
        [
          null,
          {
            message: 'Don’t use “Shit”, it’s profane',
            name: '1:1-1:5',
            reason: 'Don’t use “Shit”, it’s profane',
            line: 1,
            column: 1,
            location: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 5, offset: 4}
            },
            source: 'retext-profanities',
            ruleId: 'shit',
            fatal: false,
            profanitySeverity: 2,
            actual: 'Shit',
            expected: null
          }
        ],
        'should warn'
      )
    })

  retext()
    .use(french)
    .process('Merde!', function(err, file) {
      t.deepEqual(
        [err].concat(file.messages),
        [
          null,
          {
            message: 'Don’t use “Merde”, it’s profane',
            name: '1:1-1:6',
            reason: 'Don’t use “Merde”, it’s profane',
            line: 1,
            column: 1,
            location: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 6, offset: 5}
            },
            source: 'retext-profanities-fr',
            ruleId: 'merde',
            fatal: false,
            profanitySeverity: 2,
            actual: 'Merde',
            expected: null
          }
        ],
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
      function(err, file) {
        t.deepEqual(
          [err].concat(file.messages.map(String)),
          [
            null,
            '1:33-1:37: Be careful with “butt”, it’s profane in some cases',
            '2:9-2:15: Don’t use “asshat”, it’s profane',
            '3:34-3:40: Reconsider using “addict”, it may be profane'
          ],
          'should warn about profanities'
        )
      }
    )

  retext()
    .use(english, {ignore: ['butt']})
    .process(
      ['He’s pretty set on beating your butt for sheriff.'].join('\n'),
      function(err, file) {
        t.deepEqual(
          [err].concat(file.messages.map(String)),
          [null],
          'should not warn for `ignore`d phrases'
        )
      }
    )

  retext()
    .use(english)
    .process(
      ['When he’ll freeze over, hell freezes over.'].join('\n'),
      function(err, file) {
        t.deepEqual(
          [err].concat(file.messages.map(String)),
          [
            null,
            '1:25-1:29: Be careful with “hell”, it’s profane in some cases'
          ],
          'should correctly depend on apostrophes'
        )
      }
    )

  retext()
    .use(english)
    .process('slave slaves', function(err, file) {
      t.deepEqual(
        [err].concat(file.messages.map(String)),
        [
          null,
          '1:1-1:6: Don’t use “slave”, it’s profane',
          '1:7-1:13: Don’t use “slaves”, it’s profane'
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
      function(err, file) {
        t.deepEqual(
          [err].concat(file.messages.map(String)),
          [
            null,
            '2:9-2:15: Don’t use “asshat”, it’s profane',
            '3:34-3:40: Reconsider using “addict”, it may be profane'
          ],
          'should warn about profanities'
        )
      }
    )

  t.end()
})
