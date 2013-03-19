var converter = require('yandex__util_converter_control-name').Converter;

var Controls = exports.Controls = function (map) {
    this._map = map;
    this._originalMap = map.getOriginal();
};

$.extend(Controls.prototype, {

    destroy: function () {
        this._map = this._originalMap = null;
    },

    add: function (controlName, options) {
        this._originalMap.controls.add(converter.toYMaps(controlName, options));
    },

    remove: function (controlName) {
        this._originalMap.controls.remove(converter.toYMaps(controlName));
    },

    getAll: function () {
        var controls = [];
        this._originalMap.controls.each(function (controlName) {
            controls.push(converter.fromYMaps(controlName));
        });
        return controls;
    }

});
