sm.plugin('_Model', function (sandbox, undefined) {

    /**
     * Model - object consists of some key-value
     * pairs. Model can notify about changes of
     * the stored values.
     *
     * @constructor Creates new Model instance.
     * @name sm.Model
     * @param {Object} [initialValues] Initial data for Model.
     */
    var Model = function (initialValues) {
            this._values = {};
            this._listeners = {};
            this._updateListeners = [];
            sandbox.util.extend(this._values, initialValues || {});
        };

    Model.prototype.set = function (key, value) {
        function submodelUpdateCallback(eventObject) {
            this._triggerUpdate(sandbox.util.extend({}, eventObject, {key: key + "." + eventObject.key}));
        }
        key = key instanceof Array ? key : key.split(".");
        if (key.length - 1) {
            if (this._values[key[0]] instanceof Model) {
                this._values[key[0]].set(key.slice(1), value);
            } else {
                throw new Error("Can't set key " + key[0]);
            }
        } else {
            if (this._values[key[0]] !== value) {
                var eventObject = {
                        key: key[0],
                        oldValue: this._values[key[0]],
                        newValue: value
                    };
                if (this._values[key[0]] instanceof Model) {
                    this._values[key[0]].unUpdate(submodelUpdateCallback);
                }
                this._values[key[0]] = value;
                if (this._values[key[0]] instanceof Model) {
                    this._values[key[0]].onUpdate(submodelUpdateCallback, this);
                }
                if (this._listeners[key[0]]) {
                    this._listeners[key[0]].forEach(function (listener) {
                        listener.callback.call(listener.context, eventObject);
                    });
                }
                this._triggerUpdate(eventObject);
            }
        }
    }

    Model.prototype.get = function (key) {
        key = key instanceof Array ? key : key.split(".");
        var val = this._values[key[0]];
        if (key.length - 1) {
            return (val && (val instanceof Model)) ? val.get(key.slice(1)) : undefined;
        } else {
            return val;
        }
    };

    Model.prototype.toHash = function () {
        var result = {};
        Object.keys(this._values).forEach(function (key) {
            var value = this._values[key];
            result[key] = value instanceof Model ? value.toHash() : value;
        });
        return result;
    };

    Model.prototype.on = function (key, callback, ctx) {
        try {
            key = key instanceof Array ? key : key.split(".");
            if (key.length - 1) {
                var submodel = this._values[key[0]];
                if (submodel instanceof Model) {
                    submodel.on(key.slice(1), callback, ctx);
                } else {
                    throw new Error("submodel isn't a Model (shit happens!)");
                }
            } else {
                (this._listeners[key[0]] || (this._listeners[key[0]] = [])).push({
                    callback: callback,
                    context: ctx
                });
            }
        } catch (exception) {
            throw new ReferenceError("Key '" + key.join(".") + "' seems to be non-existent");
        }
        return this;
    };

    Model.prototype.un = function (key, callback, ctx) {
        try {
            key = key instanceof Array ? key : key.split(".");
            if (key.length - 1) {
                var submodel = this._values[key[0]].value;
                if (submodel instanceof Model) {
                    submodel.un(key.slice(1), callback, ctx);
                } else {
                    throw new Error("submodel isn't a Model (shit happens!)");
                }
            } else {
                this._values[key[0]].callbacks = this._values[key[0]].callbacks.filter(function (listener) {
                    return !(callback !== listener.callback && (!ctx || ctx !== listener.context));
                });
            }
        } catch (exception) {
            throw new ReferenceError("Key '" + key.join(".") + "' seems to be non-existent");
        }
        return this;
    };

    Model.prototype.onUpdate = function (callback, ctx) {
        this._updateListeners.push({
            callback: callback,
            context: ctx
        });
        return this;
    };

    Model.prototype.unUpdate = function (callback, ctx) {
        this._updateListeners = this._updateListeners.filter(function (listener) {
            return !(listener.callback === callback && (!ctx || listener.context === ctx));
        });
        return this;
    };

    Model.prototype._triggerUpdate = function (eventObject) {
        this._updateListeners.forEach(function (listener) {
            listener.callback.call(listener.context, eventObject);
        });
    };

    Model.prototype.destroy = function () {
        delete this._values;
        delete this._listeners;
        delete this._updateCallbacks;
    };

    return Model;

});
