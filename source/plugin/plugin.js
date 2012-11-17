(function () {

var sandbox = {};

function deepExtend(destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object") {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

/**
 * Plugin system.
 * Add some functionality to sm namespace or to internal sandbox.
 * Prefix '_' of plugin name means that plugin internal and should be placed to sandbox.
 *
 * @param {String} name Plugin name
 * @param {Function} callback Plugin body
 * @returns {SM} sm
 */
sm.plugin = function (name, callback) {
    var isInternal = name[0] === '_';
    name = isInternal ? name.substr(1): name;
    var parts = name.split('.');

    var plugin = {};
    var temp = plugin;
    while(parts.length) {
        var key = parts.shift();
        temp[key] = !parts.length ? callback.call(sm, sandbox): {};
        temp = temp[key]
    }

    deepExtend(!isInternal ? sm: sandbox, plugin);

    return sm;
}

}());
