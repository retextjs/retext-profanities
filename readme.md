# retext-profanities [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for [profane and vulgar][profanities] wording with
[**retext**][retext].

## Installation

[npm][npm-install]:

```bash
npm install retext-profanities
```

**retext-profanities** is also available for [duo][duo-install], and as an
AMD, CommonJS, and globals module, [uncompressed and compressed][releases].

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
        console.log(report(file));
    });
```

Yields:

```txt
<stdin>
  1:33-1:37: Don’t use “butt”, it’s profane

⚠ 5 warnings
```

## API

### `retext.use(profanities[, options])`

Check for [profane and vulgar][profanities] wording.

**Parameters**

*   `profanities` — This plug-in;

*   `options` (`Object?`, optional):

    *   `ignore` (`Array.<string>`)
        — List of phrases to _not_ warn about.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-profanities.svg

[travis]: https://travis-ci.org/wooorm/retext-profanities

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-profanities.svg

[codecov]: https://codecov.io/github/wooorm/retext-profanities

[npm-install]: https://docs.npmjs.com/cli/install

[duo-install]: http://duojs.org/#getting-started

[releases]: https://github.com/wooorm/retext-profanities/releases

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[profanities]: https://github.com/wooorm/profanities
