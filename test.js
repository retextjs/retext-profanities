import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextProfanitiesFrench from './fr.js'
import retextProfanities from './index.js'

test('profanities', async () => {
  const file = await retext().use(retextProfanities).process('Shit!')

  assert.deepEqual(
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

  const fileFr = await retext().use(retextProfanitiesFrench).process('Merde!')

  assert.deepEqual(
    fileFr.messages.map(String),
    ['1:1-1:6: Don’t use `Merde`, it’s profane'],
    'should support other languages'
  )

  const fileLonger = await retext()
    .use(retextProfanities)
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n')
    )

  assert.deepEqual(
    fileLonger.messages.map(String),
    [
      '1:33-1:37: Be careful with `butt`, it’s profane in some cases',
      '2:9-2:15: Don’t use `asshat`, it’s profane',
      '3:34-3:40: Reconsider using `addict`, it may be profane'
    ],
    'should warn about profanities'
  )

  const ignore = await retext()
    .use(retextProfanities, {ignore: ['butt']})
    .process('He’s pretty set on beating your butt for sheriff.')

  assert.deepEqual(
    ignore.messages.map(String),
    [],
    'should not warn for `ignore`d phrases'
  )

  const apostrophes = await retext()
    .use(retextProfanities)
    .process('When he’ll freeze over, hell freezes over.')

  await assert.deepEqual(
    apostrophes.messages.map(String),
    ['1:25-1:29: Be careful with `hell`, it’s profane in some cases'],
    'should correctly depend on apostrophes'
  )

  const pluralsAndSingulars = await retext()
    .use(retextProfanities)
    .process('slave slaves')

  assert.deepEqual(
    pluralsAndSingulars.messages.map(String),
    [
      '1:1-1:6: Don’t use `slave`, it’s profane',
      '1:7-1:13: Don’t use `slaves`, it’s profane'
    ],
    'should support plurals and singulars'
  )

  const sureness = await retext()
    .use(retextProfanities, {sureness: 1})
    .process(
      [
        'He’s pretty set on beating your butt for sheriff.',
        'What an asshat.',
        'The kidnapper was the mother, an addict.'
      ].join('\n')
    )

  assert.deepEqual(
    sureness.messages.map(String),
    [
      '2:9-2:15: Don’t use `asshat`, it’s profane',
      '3:34-3:40: Reconsider using `addict`, it may be profane'
    ],
    'should warn about profanities'
  )

  const whoAre = await retext()
    .use(retextProfanities)
    .process(["who're", 'who’re', 'whore'].join('\n'))

  assert.deepEqual(
    whoAre.messages.map(String),
    ['3:1-3:6: Don’t use `whore`, it’s profane'],
    'should not warn about `who are` contractions'
  )

  const remain = await retext()
    .use(retextProfanities)
    .process('Only two minutes still remain in the game.')

  assert.deepEqual(
    remain.messages.map(String),
    [],
    'should not warn about `remain`'
  )
})
