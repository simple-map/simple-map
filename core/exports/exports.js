var sm = window.sm = function (options) {
    return $.Map(options);
};

$.util.extend(sm, {
    plugin: function (name, callback) {
        return plugin(name, callback, sm);
    }
});
