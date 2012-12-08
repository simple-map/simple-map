sm.plugin('Map', function ($) {

    function Map(options) {
        this._factory = new $.view.Factory(options.api);

        this._model = new $.Model(options);
        this._view =  this._factory.createMapView(this._model),

        this._onViewReady();
    }

    $.util.extend(Map.prototype, $.behaviour.Observable, {

        remove: function () {
            this._view.destroy();
            this._model.destroy();
            this._view = this._model = null;
        },

        _onViewReady: function () {
            var _this = this;
            [
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
            ].map(function (key) {
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
