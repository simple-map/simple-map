plugin('Map', function (sandbox) {

    var PROXY_EVENTS = [
        'bounds_changed',
        'center_changed',
        'zoom_changed',
        'click',
        'dblclick',
        'dragstart',
        'drag',
        'dragend',
        'mouseover',
        'mousemove',
        'mouseout',
        'rightclick',
        'type_changed'
    ];

    function Map(options) {
        this._factory = new sandbox.geoapi.Factory(options.api);

        this._model = new sandbox.Model(options);
        this._view =  this._factory.createMapView(this._model),

        this.init();
    }

    $.extend(Map.prototype, sandbox.behaviour.Observable, {

        remove: function () {
            this._view.destroy();
            this._model.destroy();
            this.un();
            this._view = this._model = null;
        },

        init: function () {
            var _this = this;
            PROXY_EVENTS.map(function (key) {
                _this._view.on(key, function (data) {
                    this.fire(key, data);
                }, _this);
            });
        },

        prop: function (key, value) {
            if (value === undefined) {
                return this._model.get(key);
            } else {
                this._model.set(key, value);
                return this;
            }
        },

        show: function () {
            this._model.set('visibility', true);
            return this;
        },

        hide: function () {
            this._model.set('visibility', false);
            return this;
        },

        original: function () {
            return this._view.original();
        }

    });

    return function (options) {
        return new Map(options);
    };

});
