sm.plugin('_Model', function (sandbox, undefined) {

    function getNestedField(data, parts) {
        var i, il;
        for (i = 0, il = parts.length; i < il; i++) {
            data = data && data[parts[i]];
        }
        return data;
    }

    /**
     * Model - object consists of some key-value pairs.
     * Model can notify about changes of the stored values.
     *
     * @constructor Creates new Model instance.
     * @param {Object} [initialValues] Initial data for Model.
     */
    var Model = function (initialValues) {
        this._values = initialValues || {};
        sandbox.util.EventManager.call(this);
    };

    sandbox.util.inherit(Model, sandbox.util.EventManager, {

        set: function (key, newValue) {
            var field, lastPart, oldValue, parts, path, values;

            if (typeof key === 'string') {
                values = {};
                values[key] = newValue;
            } else {
                values = key;
            }

            for (path in values) {
                if (values.hasOwnProperty(path)) {
                    parts = path.split('.');
                    field = getNestedField(this._values, parts.slice(0, -1));
                    lastPart = parts[parts.length - 1];
                    oldValue = field[lastPart];
                    field[lastPart] = values[path];
                    this._notify(parts, field, oldValue, values[path]);
                }
            }
        },

        get: function (path) {
            return getNestedField(this._values, path.split('.'));
        },

        _notify: function (parts, field, oldValue, newValue) {
            var key;
            if (!sandbox.util.compare(oldValue, newValue)) {
                // notify recursively about key changes
                if (oldValue && oldValue.constructor === Object) {
                    for (key in oldValue) {
                        if (oldValue.hasOwnProperty(key)) {
                            if (!newValue || !newValue.hasOwnProperty(key)) {
                                this._notify(parts.concat(key), oldValue, oldValue[key]);
                            }
                        }
                    }
                }
                if (newValue && newValue.constructor === Object) {
                    for (key in newValue) {
                        if (newValue.hasOwnProperty(key)) {
                            this._notify(parts.concat(key), newValue, oldValue && oldValue[key], newValue[key]);
                        }
                    }
                }
                this.fire(parts.join('.'), {
                    oldValue: oldValue,
                    newValue: newValue
                });
            }
        }

    });

    return Model;

});
