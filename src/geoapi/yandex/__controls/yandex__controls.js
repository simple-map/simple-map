plugin('geoapi.yandex.Controls', function (sandbox) {

    var converter = sandbox.geoapi.yandex.util.converter.controlName;

    function Controls(map) {
        this._map = map;
        this._originalMap = map.getOriginal();
    }

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

    return Controls;

});
