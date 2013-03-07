plugin('geoapi.yandex.Map', function (sandbox) {

    var typeConverter = sandbox.geoapi.yandex.util.typeConverter;

    function YandexMap(container, options) {
        this._container = container;
        this._map = new ymaps.Map(this._container, {
            center: options.center,
            zoom: options.zoom,
            type: typeConverter.toYMaps(options.type)
        });
        this._setListeners();
    }

    $.extend(YandexMap.prototype, sandbox.behaviour.Observable, {

        destruct: function () {
            this._unsetListeners();
            this._map.destroy();
            this._container = this._map = null;
        },

        _setListeners: function () {
            var dragBehavior = this._map.behaviors.get('drag');
            if (dragBehavior) {
                this._dragListeners = dragBehavior.events.group()
                    .add('dragstart', function () {
                        this.fire('dragstart');
                    }, this)
                    .add('drag', function () {
                        this.fire('drag');
                    }, this)
                    .add('dragend', function () {
                        this.fire('dragend');
                    }, this);
            }
            this._listeners = this._map.events.group()
                .add('boundschange', function (e) {
                    this.fire('boundschange');
                    if (!sandbox.util.compare(e.get('oldCenter'), e.get('newCenter'))) {
                        this.fire('centerchange');
                    }
                    if (e.get('oldZoom') !== e.get('newZoom')) {
                        this.fire('zoomchange');
                    }
                }, this)
                .add('click', function (e) {
                    this.fire('click', {position: e.get('coordPosition')});
                }, this)
                .add('dblclick', function (e) {
                    this.fire('dblclick', {position: e.get('coordPosition'), type: e.get('zoomDelta') > 0 ? 'left' : 'right'});
                }, this)
                .add('mouseenter', function (e) {
                    this.fire('mouseenter', {position: e.get('coordPosition')});
                }, this)
                .add('mousemove', function (e) {
                    this.fire('mousemove', e.get('coordPosition'));
                }, this)
                .add('mouseleave', function (e) {
                    this.fire('mouseleave', e.get('coordPosition'));
                }, this)
                .add('contextmenu', function (e) {
                    this.fire('contextmenu', e.get('coordPosition'));
                }, this)
                .add('typechange', function (e) {
                    this.fire('typechange', e.get('newType'));
                }, this);
        },

        _unsetListeners: function () {
            this._dragListeners.removeAll();
            this._listeners.removeAll();
        },

        getContainer: function () {
            return this._container;
        },

        setCenter: function (center) {
            this._map.setCenter(center);
        },

        getCenter: function () {
            return this._map.getCenter();
        },

        setZoom: function (zoom) {
            this._map.setZoom(zoom);
        },

        getZoom: function () {
            return this._map.getZoom();
        },

        setType: function (type) {
            this._map.setType(typeConverter.toYMaps(type));
        },

        getType: function () {
            return typeConverter.fromYMaps(this._map.getType());
        },

        getOriginal: function () {
            return this._map;
        }

    });

    return YandexMap;
});
