# retext-profanities

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to check for potential bad words.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextProfanities[, options])`](#unifieduseretextprofanities-options)
    *   [`Options`](#options)
*   [Data](#data)
*   [Messages](#messages)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to check for possible
[profane or otherwise vulgar][profanities] wording.
It uses [`cuss`][cuss] for sureness.

## When should I use this?

You can use this plugin when you’re dealing with your own text and want to
check for potential mistakes.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-profanities
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextProfanities from 'https://esm.sh/retext-profanities@7'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextProfanities from 'https://esm.sh/retext-profanities@7?bundle'
</script>
```

## Use

Say our document `example.txt` contains:

```txt
He’s pretty set on beating your butt for sheriff.
```

…and our module `example.js` contains:

```js
import retextEnglish from 'retext-english'
import retextProfanities from 'retext-profanities'
import retextStringify from 'retext-stringify'
import {read} from 'to-vfile'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(retextEnglish)
  .use(retextProfanities)
  .use(retextStringify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…then running `node example.js` yields:

```txt
example.txt
1:33-1:37 warning Be careful with `butt`, it’s profane in some cases butt retext-profanities

⚠ 1 warning
```

## API

This package has an export map with several entries for plugins in different
languages:

*   `retext-profanities/ar-latn` — Arabic (Latin-script)
*   `retext-profanities/en` — English
*   `retext-profanities/es` — Spanish
*   `retext-profanities/fr` — French
*   `retext-profanities/it` — Italian
*   `retext-profanities/pt` — Portuguese
*   `retext-profanities/pt-pt` — Portuguese (Portugal)
*   `retext-profanities` — English

Each module exports the plugin [`retextProfanities`][api-retext-profanities] as
the default export.

### `unified().use(retextProfanities[, options])`

Check for potential bad words.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `ignore` (`Array<string>`, optional)
    — phrases *not* to warn about
*   `sureness` (`0`, `1`, or `2`, default: `0`)
    — minimum *sureness* to warn about, see [`cuss`][cuss]

## Data

See [`cuss`][cuss].

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message], with `source` set
to `'retext-profanities'`, `ruleId` to the normalized phrase, `actual` to the
potential bad word, `expected` to an empty array, and `profanitySeverity` to
the `cuss` severity of the phrase.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-profanities@^8`,
compatible with Node.js 16.

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — check passive voice
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — check phrases for simpler alternatives

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

[size-badge]: https://img.shields.io/bundlejs/size/retext-profanities

[size]: https://bundlejs.com/?q=retext-profanities

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[cuss]: https://github.com/words/cuss

[profanities]: https://github.com/words/profanities

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[vfile-message]: https://github.com/vfile/vfile-message

[api-retext-profanities]: #unifieduseretextprofanities-options

[api-options]: #options
