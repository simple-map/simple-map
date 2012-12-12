var $ = {};

function deepExtend(destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object") {
            destination[property] = destination[property] || {};
            deepExtend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
}

/**
 * Plugin system.
 * Add some functionality to sm namespace or to internal sandbox.
 *
 * @param {String} name Plugin name
 * @param {Function} callback Plugin body
 * @returns {SM} sm
 */
function plugin(name, callback, namespace) {
    namespace = namespace || $;
    if (typeof name === 'function') {
        name.call(namespace, $);
        return;
    }

    var parts = name.split('.');
    var plugin = {};
    var temp = plugin;
    while (parts.length) {
        var key = parts.shift();
        temp[key] = !parts.length ? callback.call(namespace, $): {};
        temp = temp[key];
    }

    deepExtend(namespace, plugin);
}
