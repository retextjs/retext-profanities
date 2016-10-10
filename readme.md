# retext-profanities [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for [profane and vulgar][profanities] wording with
[**retext**][retext].  Uses [cuss][] for sureness.

## Installation

[npm][]:

```bash
npm install retext-profanities
```

**retext-profanities** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

```js
var retext = require('retext');
var profanities = require('retext-profanities');
var report = require('vfile-reporter');

retext()
  .use(profanities)
  .process([
    'He’s pretty set on beating your butt for sheriff.'
  ].join('\n'), function (err, file) {
    console.error(report(err || file));
  });
```

Yields:

```txt
  1:33-1:37  warning  Be careful with “butt”, it’s profane in some cases  butt  retext-profanities

⚠ 1 warning
```

## API

### `retext().use(profanities[, options])`

Check for profanities.

###### `options`

*   `ignore` (`Array.<string>`) — phrases _not_ to warn about.

## Rules

See [`rules.md`][rules] for a list of rules.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-profanities.svg

[travis]: https://travis-ci.org/wooorm/retext-profanities

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-profanities.svg

[codecov]: https://codecov.io/github/wooorm/retext-profanities

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/retext-profanities/releases

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[profanities]: https://github.com/wooorm/profanities

[cuss]: https://github.com/wooorm/cuss

[rules]: rules.md
