# retext-profanities [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

<!--lint disable heading-increment list-item-spacing-->

Check for [profane and vulgar][profanities] wording with
[**retext**][retext].  Uses [cuss][] for sureness.

## Installation

[npm][npm-install]:

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

### `retext().use(profanities[, options])`

Check phrases for simpler alternatives.

###### `options`

*   `ignore` (`Array.<string>`) — phrases _not_ to warn about.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-profanities.svg

[travis]: https://travis-ci.org/wooorm/retext-profanities

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-profanities.svg

[codecov]: https://codecov.io/github/wooorm/retext-profanities

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/retext-profanities/releases

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[profanities]: https://github.com/wooorm/profanities

[cuss]: https://github.com/wooorm/cuss
