sm.plugin(function ($) {

    var exports = function (options) {
        return new $.Map(options);
    };

    var plugin = sm.plugin;
    $.util.extend(exports, {
        plugin: function (name, callback) {
            return plugin(name, callback, sm);
        }
    });

    // TODO: create global closure with plugin function
    sm = exports;
});
