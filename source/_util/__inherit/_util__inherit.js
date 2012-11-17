sm.plugin('_util.inherit', function () {

    /**
     * Classic OOP inheritance implementation.
     *
     * @param {Function} descendant Descendant class.
     * @param {Function} parent Parent class.
     * @returns {Function} Descendant class.
     */
    var F = function () {};
    function inherit(descendant, parent) {
        descendant.prototype = Object.create(parent.prototype);
        descendant.prototype.constructor = descendant;
        descendant.superclass = parent.prototype;
        return descendant;
    }

    return inherit;

});
