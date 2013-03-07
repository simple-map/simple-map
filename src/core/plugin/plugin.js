/*global sandbox:true*/
/*exported plugin*/
var sandbox = {};

/**
 * Plugin system.
 * Add some functionality to sm namespace or to internal sandbox.
 *
 * @param {String} name Plugin name
 * @param {Function} callback Plugin body
 * @returns {SM} sm
 */
function plugin(name, callback, namespace) {
    namespace = namespace || sandbox;
    if (typeof name === 'function') {
        name.call(namespace, sandbox);
        return;
    }

    var parts = name.split('.');
    var pluginNamespace = {};
    var temp = pluginNamespace;
    while (parts.length) {
        var key = parts.shift();
        temp[key] = !parts.length ? callback.call(namespace, sandbox): {};
        temp = temp[key];
    }

    $.extend(true, namespace, pluginNamespace);
}
