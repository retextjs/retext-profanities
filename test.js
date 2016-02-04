/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:profanities
 * @fileoverview Test suite for `retext-profanities`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var retext = require('retext');
var profanities = require('./');

/*
 * Tests.
 */

test('profanities', function (t) {
    t.plan(6);

    retext()
        .use(profanities)
        .process([
            'He’s pretty set on beating your butt for sheriff.'
        ].join('\n'), function (err, file) {
            t.ifError(err, 'should not fail (#1)');

            t.deepEqual(
                file.messages.map(String),
                [
                    '1:33-1:37: Don’t use “butt”, it’s profane'
                ],
                'should warn about profanities'
            );
        });

    retext()
        .use(profanities, {
            'ignore': ['butt']
        })
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
                [
                    '1:25-1:29: Don’t use “hell”, it’s profane'
                ],
                'should correctly depend on apostrophes'
            );
        });
});
