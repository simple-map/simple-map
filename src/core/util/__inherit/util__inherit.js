/**
 * Classic OOP inheritance implementation.
 *
 * @param {Function} descendant Descendant class.
 * @param {Function} parent Parent class.
 * @param {Object} methods Additional methods for descendant class.
 * @returns {Function} Descendant class.
 */
exports.inherit = function (descendant, parent, methods) {
    descendant.prototype = Object.create(parent.prototype);
    descendant.prototype.constructor = descendant;
    descendant.superclass = parent.prototype;

    if (methods) {
        $.extend(descendant.prototype, methods);
    }

    return descendant;
};
