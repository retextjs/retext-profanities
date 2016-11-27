'use strict';

var test = require('tape');
var retext = require('retext');
var profanities = require('./');

test('profanities', function (t) {
  t.plan(6);

  retext()
    .use(profanities)
    .process([
      'He’s pretty set on beating your butt for sheriff.',
      'What an asshat.',
      'The kidnapper was the mother, an addict.'
    ].join('\n'), function (err, file) {
      t.ifError(err, 'should not fail (#1)');

      t.deepEqual(
        file.messages.map(String),
        [
          '1:33-1:37: Be careful with “butt”, it’s profane in some cases',
          '2:9-2:15: Don’t use “asshat”, it’s profane',
          '3:34-3:40: Reconsider using “addict”, it may be profane'
        ],
        'should warn about profanities'
      );
    });

  retext()
    .use(profanities, {ignore: ['butt']})
    .process([
      'He’s pretty set on beating your butt for sheriff.'
    ].join('\n'), function (err, file) {
      t.ifError(err, 'should not fail (#2)');

      t.deepEqual(
        file.messages.map(String),
        [],
        'should not warn for `ignore`d phrases'
      );
    });

  retext()
    .use(profanities)
    .process([
      'When he’ll freeze over, hell freezes over.'
    ].join('\n'), function (err, file) {
      t.ifError(err, 'should not fail (#3)');

      t.deepEqual(
        file.messages.map(String),
        ['1:25-1:29: Be careful with “hell”, it’s profane in some cases'],
        'should correctly depend on apostrophes'
      );
    });
});
