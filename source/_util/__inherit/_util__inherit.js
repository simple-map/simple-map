sm.plugin('_util.inherit', function (sandbox) {

    /**
     * Classic OOP inheritance implementation.
     *
     * @param {Function} descendant Descendant class.
     * @param {Function} parent Parent class.
     * @param {Object} methods Additional methods for descendant class.
     * @returns {Function} Descendant class.
     */
    var F = function () {};
    function inherit(descendant, parent, methods) {
        descendant.prototype = Object.create(parent.prototype);
        descendant.prototype.constructor = descendant;
        descendant.superclass = parent.prototype;

        if (methods) {
            sandbox.util.extend(descendant.prototype, methods);
        }

        return descendant;
    }

    return inherit;

});
