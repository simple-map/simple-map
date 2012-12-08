sm.plugin('_util.mixin', function (sandbox) {

    /**
     * Creates origin's descendant and extends it by functionality from mixins.
     *
     * @param {Function} origin Origin.
     * @param {Function} mixin One or more mixins.
     * @returns {Function} Origin's descendant.
     */
    return function (origin /*, mixin ... */) {
        var mixtures = Array.prototype.slice.call(arguments, 1);
        var Class = function () {
                for (var i = 0, l = mixtures.length; i < l; i++) {
                    mixtures[i].apply(this);
                }
                origin.apply(this, arguments);
            };

        sandbox.util.inherit(Class, origin);

        for (var i = 0, l = mixtures.length; i < l; i++) {
            sandbox.util.extend(Class.prototype, mixtures[i].prototype);
        }

        return Class;
    };

});
