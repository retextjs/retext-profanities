/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:profanities
 * @fileoverview Check for profane and vulgar wording with retext.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var difference = require('array-differ');
var intersection = require('array-intersection');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var profanities = require('profanities');

/*
 * List of values not to normalize.
 */

var APOSTROPHES = ['hell'];

/**
 * Attacher.
 *
 * @param {Retext} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to _not_ warn about.
 * @return {Function} - `transformer`.
 */
function attacher(processor, options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(profanities, ignore);
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
            var message = file.warn([
                'Don’t use',
                quotation(nlcstToString(match), '“', '”') + ',',
                'it’s profane'
            ].join(' '), {
                'start': match[0].position.start,
                'end': match[match.length - 1].position.end
            });

            message.ruleId = phrase;
            message.source = 'retext-profanities';
        }

        search(tree, apostrophes, handle);
        search(tree, noApostrophes, handle, true);
    }

    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
