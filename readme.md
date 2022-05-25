# retext-profanities

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to check for [profane and vulgar][profanities]
wording.
Uses [`cuss`][cuss] for sureness.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install retext-profanities
```

## Use

Say we have the following file, `example.txt`:

```txt
He’s pretty set on beating your butt for sheriff.
```

…and our script, `example.js`, looks like this:

```js
import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import retextProfanities from 'retext-profanities'
import retextStringify from 'retext-stringify'

const file = readSync('example.txt')

unified()
  .use(retextEnglish)
  .use(retextProfanities)
  .use(retextStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
  })
```

Now, running `node example` yields:

```txt
example.txt
  1:33-1:37  warning  Be careful with “butt”, it’s profane in some cases  butt  retext-profanities

⚠ 1 warning
```

## API

This package exports no identifiers.
The default export is `retextProfanities`.

### `unified().use(retextProfanities[, options])`

check for [profane and vulgar][profanities] wording.
Uses [`cuss`][cuss] for sureness.

###### `options.ignore`

Phrases *not* to warn about (`Array<string>`, default: `[]`).

###### `options.sureness`

Minimum *sureness* to warn about, see [`cuss`][cuss] (`number`, default: `0`).

## Rules

See [`rules.md`][rules] for a list of rules.

Note that Latin-script Arabic (`retext-profanities/ar-latn`), French
(`retext-profanities/fr`), Spanish (`retext-profanities/es`), Italian
(`retext-profanities/it`), and Portuguese (Brazilian) (`retext-profanities/pt`)
are also supported.

### Messages

See [`rules.md`][rules] for a list of rules and how rules work.

Each message is emitted as a [`VFileMessage`][message] on `file`, with the
following fields:

###### `message.source`

Name of this plugin (`'retext-profanities'`).

###### `message.ruleId`

See `id` in [`rules.md`][rules].

###### `message.profanitySeverity`

[Cuss][] sureness (`number`).

###### `message.actual`

Profane phrase (`string`).

###### `message.expected`

Empty array to signal that `actual` should be removed or changed (`[]`).

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — Check passive voice
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — Check phrases for simpler alternatives

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-profanities/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-profanities/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-profanities.svg

[coverage]: https://codecov.io/github/retextjs/retext-profanities

[downloads-badge]: https://img.shields.io/npm/dm/retext-profanities.svg

[downloads]: https://www.npmjs.com/package/retext-profanities

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-profanities.svg

[size]: https://bundlephobia.com/result?p=retext-profanities

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/retextjs/.github/blob/HEAD/support.md

[coc]: https://github.com/retextjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[message]: https://github.com/vfile/vfile-message

[profanities]: https://github.com/words/profanities

[cuss]: https://github.com/words/cuss

[rules]: rules.md
