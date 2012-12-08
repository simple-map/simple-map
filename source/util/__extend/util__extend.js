sm.plugin('util.extend', function () {

    /**
     * Extend origin object by values from some others.
     *
     * @param {Object} origin Object to extend.
     * @param {Object} obj Object
     * @returns {Object} Extended origin object.
     */
    function extend(origin /*, obj, ... */) {
        var obj;
        for (var i = 1, l = arguments.length; i < l; i++) {
            obj = arguments[i];
            Object.keys(obj).forEach(function (key) {
                origin[key] = obj[key];
            });
        }
        return origin;
    }

    return extend;

});
