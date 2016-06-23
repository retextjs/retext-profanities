/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:simplify
 * @fileoverview Check phrases for simpler alternatives.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var keys = require('object-keys');
var difference = require('array-differ');
var intersection = require('array-intersection');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var cuss = require('cuss');

/* List of values not to normalize. */
var APOSTROPHES = ['hell'];

/* Map of `cuss` ratings to prefixes. */
var PREFIX = [
    'Be careful with',
    'Reconsider using',
    'Don’t use'
];

/* Map of `cuss` ratings to suffixes. */
var SUFFIX = [
    'it’s profane in some cases',
    'it may be profane',
    'it’s profane'
];

/**
 * Attacher.
 *
 * @param {Unified} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to _not_ warn about.
 * @return {Function} - `transformer`.
 */
function attacher(processor, options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(keys(cuss), ignore);
    var apostrophes = difference(phrases, APOSTROPHES);
    var noApostrophes = intersection(APOSTROPHES, phrases);

    /**
     * Search `tree` for validations.
     *
     * @param {Node} tree - NLCST node.
     * @param {VFile} file - Virtual file.
     */
    function transformer(tree, file) {
        /**
         * Handle a match.
         *
         * @param {Array.<Node>} match - Matched nodes.
         * @param {Position} position - Location.
         * @param {Node} parent - Parent of `match`.
         * @param {string} phrase - Matched value.
         */
        function handle(match, position, parent, phrase) {
            var rating = cuss[phrase];

            var message = file.warn([
                PREFIX[rating],
                quotation(nlcstToString(match), '“', '”') + ',',
                SUFFIX[rating]
            ].join(' '), {
                start: match[0].position.start,
                end: match[match.length - 1].position.end
            });

            message.ruleId = phrase;
            message.profanitySeverity = rating;
            message.source = 'retext-profanities';
        }

        search(tree, apostrophes, handle);
        search(tree, noApostrophes, handle, true);
    }

    return transformer;
}

/* Expose. */
module.exports = attacher;
