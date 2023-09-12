import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextProfanitiesFrench from './fr.js'
import retextProfanities from './index.js'

test('profanities', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should emit messages w/ metadata', async function () {
    const file = await retext().use(retextProfanities).process('Shit!')

    assert.deepEqual(JSON.parse(JSON.stringify(file.messages)), [
      {
        column: 1,
        fatal: false,
        message: 'Don’t use `Shit`, it’s profane',
        line: 1,
        name: '1:1-1:5',
        place: {
          start: {line: 1, column: 1, offset: 0},
          end: {line: 1, column: 5, offset: 4}
        },
        reason: 'Don’t use `Shit`, it’s profane',
        ruleId: 'shit',
        source: 'retext-profanities',
        profanitySeverity: 2,
        actual: 'Shit',
        expected: [],
        url: 'https://github.com/retextjs/retext-profanities#readme'
      }
    ])
  })

  await t.test('should support other languages', async function () {
    const file = await retext().use(retextProfanitiesFrench).process('Merde!')

    assert.deepEqual(file.messages.map(String), [
      '1:1-1:6: Don’t use `Merde`, it’s profane'
    ])
  })

  await t.test('should warn about profanities', async function () {
    const file = await retext()
      .use(retextProfanities)
      .process(
        [
          'He’s pretty set on beating your butt for sheriff.',
          'What an asshat.',
          'The kidnapper was the mother, an addict.'
        ].join('\n')
      )

    assert.deepEqual(file.messages.map(String), [
      '1:33-1:37: Be careful with `butt`, it’s profane in some cases',
      '2:9-2:15: Don’t use `asshat`, it’s profane',
      '3:34-3:40: Reconsider using `addict`, it may be profane'
    ])
  })

  await t.test('should not warn for `ignore`d phrases', async function () {
    const file = await retext()
      .use(retextProfanities, {ignore: ['butt']})
      .process('He’s pretty set on beating your butt for sheriff.')

    assert.deepEqual(file.messages.map(String), [])
  })

  await t.test('should correctly depend on apostrophes', async function () {
    const file = await retext()
      .use(retextProfanities)
      .process('When he’ll freeze over, hell freezes over.')

    assert.deepEqual(file.messages.map(String), [
      '1:25-1:29: Be careful with `hell`, it’s profane in some cases'
    ])
  })

  await t.test('should support plurals and singulars', async function () {
    const file = await retext().use(retextProfanities).process('slave slaves')

    assert.deepEqual(file.messages.map(String), [
      '1:1-1:6: Don’t use `slave`, it’s profane',
      '1:7-1:13: Don’t use `slaves`, it’s profane'
    ])
  })

  await t.test('should warn about profanities', async function () {
    const file = await retext()
      .use(retextProfanities, {sureness: 1})
      .process(
        [
          'He’s pretty set on beating your butt for sheriff.',
          'What an asshat.',
          'The kidnapper was the mother, an addict.'
        ].join('\n')
      )

    assert.deepEqual(file.messages.map(String), [
      '2:9-2:15: Don’t use `asshat`, it’s profane',
      '3:34-3:40: Reconsider using `addict`, it may be profane'
    ])
  })

  await t.test(
    'should not warn about `who are` contractions',
    async function () {
      const file = await retext()
        .use(retextProfanities)
        .process(["who're", 'who’re', 'whore'].join('\n'))

      assert.deepEqual(file.messages.map(String), [
        '3:1-3:6: Don’t use `whore`, it’s profane'
      ])
    }
  )

  await t.test('should not warn about `remain`', async function () {
    const file = await retext()
      .use(retextProfanities)
      .process('Only two minutes still remain in the game.')

    assert.deepEqual(file.messages.map(String), [])
  })
})
