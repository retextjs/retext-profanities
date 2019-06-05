# retext-profanities [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Chat][chat-badge]][chat]

Check for [profane and vulgar][profanities] wording with
[**retext**][retext].  Uses [cuss][] for sureness.

## Installation

[npm][]:

```bash
npm install retext-profanities
```

## Usage

Say we have the following file, `example.txt`:

```text
He’s pretty set on beating your butt for sheriff.
```

And our script, `example.js`, looks like this:

```javascript
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var english = require('retext-english')
var stringify = require('retext-stringify')
var profanities = require('retext-profanities')

unified()
  .use(english)
  .use(profanities)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function(err, file) {
    console.error(report(err || file))
  })
```

Now, running `node example` yields:

```text
example.txt
  1:33-1:37  warning  Be careful with “butt”, it’s profane in some cases  butt  retext-profanities

⚠ 1 warning
```

## API

### `retext().use(profanities[, options])`

Check for profanities.

###### `options.ignore`

`Array.<string>` — phrases *not* to warn about.

###### `options.sureness`

`Number` — minimum *sureness* to warn about, see
[cuss](https://github.com/words/cuss#cuss).  Default `0`

## Rules

See [`rules.md`][rules] for a list of rules.

Note that Latin-script Arabic (`retext-profanities/ar-latn`), French
(`retext-profanities/fr`), Spanish (`retext-profanities/es`), and Brazilian
Portuguese (`retext-profanities/pt-br`) are also supported.

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — Check passive voice
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — Check phrases for simpler alternatives

## Contribute

See [`contributing.md` in `retextjs/retext`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-profanities.svg

[build]: https://travis-ci.org/retextjs/retext-profanities

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-profanities.svg

[coverage]: https://codecov.io/github/retextjs/retext-profanities

[downloads-badge]: https://img.shields.io/npm/dm/retext-profanities.svg

[downloads]: https://www.npmjs.com/package/retext-profanities

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[profanities]: https://github.com/words/profanities

[cuss]: https://github.com/words/cuss

[rules]: rules.md

[contributing]: https://github.com/retextjs/retext/blob/master/contributing.md

[coc]: https://github.com/retextjs/retext/blob/master/code-of-conduct.md
