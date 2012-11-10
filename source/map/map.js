sm.plugin('Map', function (sandbox) {

    var DEFAULT_OPTIONS = {
        api: 'yandex'
    };

    function Map(options) {
        options = sandbox.util.extend(DEFAULT_OPTIONS, options);

        this._model = new sandbox.Model(options);
        this._events = new sandbox.util.EventManager();
    }

    Map.prototype.remove = function () {
        this._view.destroy();
        this._model.destroy();
        this._events = this._view = this._model = null;
    };

    Map.prototype.on = function (eventName, callback, ctx) {
        this._events.on(eventName, callback, ctx);
        return this;
    }

    Map.prototype.un = function (eventName, callback, ctx) {
        this._events.un(eventName, callback, ctx);
        return this;
    }

    Map.prototype.prop = function (key, value) {
        if (value === undefined) {
            return this._model.get(key);
        } else {
            this._model.set(key, value);
            return this;
        }
    };

    Map.prototype.show = function () {
        this._model.set('visibility', true);
        return this;
    };

    Map.prototype.hide = function () {
        this._model.set('visibility', false);
        return this;
    };

    return function (options) {
        return new Map(options);
    };

});
