import test from 'tape'
import {retext} from 'retext'
import retextProfanitiesFrench from './fr.js'
import retextProfanities from './index.js'

test('profanities', (t) => {
  t.plan(7)

  retext()
    .use(retextProfanities)
    .process('Shit!')
    .then((file) => {
      t.deepEqual(
        JSON.parse(JSON.stringify(file.messages)),
        [
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
            expected: [],
            url: 'https://github.com/retextjs/retext-profanities#readme'
          }
        ],
        'should warn'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanitiesFrench)
    .process('Merde!')
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        ['1:1-1:6: Don’t use `Merde`, it’s profane'],
        'should support other languages'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanities)
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n')
    )
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        [
          '1:33-1:37: Be careful with `butt`, it’s profane in some cases',
          '2:9-2:15: Don’t use `asshat`, it’s profane',
          '3:34-3:40: Reconsider using `addict`, it may be profane'
        ],
        'should warn about profanities'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanities, {ignore: ['butt']})
    .process('He’s pretty set on beating your butt for sheriff.')
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        [],
        'should not warn for `ignore`d phrases'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanities)
    .process('When he’ll freeze over, hell freezes over.')
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        ['1:25-1:29: Be careful with `hell`, it’s profane in some cases'],
        'should correctly depend on apostrophes'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanities)
    .process('slave slaves')
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        [
          '1:1-1:6: Don’t use `slave`, it’s profane',
          '1:7-1:13: Don’t use `slaves`, it’s profane'
        ],
        'should support plurals and singulars'
      )
    }, t.ifErr)

  retext()
    .use(retextProfanities, {sureness: 1})
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n')
    )
    .then((file) => {
      t.deepEqual(
        file.messages.map((d) => String(d)),
        [
          '2:9-2:15: Don’t use `asshat`, it’s profane',
          '3:34-3:40: Reconsider using `addict`, it may be profane'
        ],
        'should warn about profanities'
      )
    }, t.ifErr)
})
