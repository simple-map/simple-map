var sm = window.sm = function (options) {
    return sandbox.Map(options);
};

$.extend(sm, {
    plugin: function (name, callback) {
        return plugin(name, callback, sm);
    }
});
