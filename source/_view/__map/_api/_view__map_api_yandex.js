sm.plugin('_view.map.Yandex', function (sandbox) {

    var API_URL = 'http://api-maps.yandex.ru/2.0-stable/?load=package.map&lang=ru-RU';

    function View() {
        var asyncCount = 2;
        var _this = this;

        this._events = new sandbox.util.EventManager();
        /// this._map = null;
        /// this._container = container (if container equals domNode)

        if (!window.ymaps) {
            sandbox.dom.getScript(API_URL, function () {
                ymaps.ready(onCallback);
            });
        } else {
            setTimeout(onCallback, 0);
        }

        // TODO: show loader until api will be loaded
        sandbox.dom.ready(onCallback);

        function onCallback() {
            asyncCount--;
            if (!asyncCount) {
                _this._events.fire('ready');
            }
        }
    }

    sandbox.util.extend(View.prototype, {
        initialize: function (options) {
            // TODO: debug error for container with null size
            this._container = typeof options.container === 'string' ?
                document.getElementById(options.container) : // TODO: container could be selector
                options.container;
            this._map = new ymaps.Map(this._container, {
                center: options.center, // TODO: center could be address
                zoom: options.zoom
            });
            this._setListeners();
        },

        destroy: function () {
            //this._events.removeAll() TODO: add method removeAll for eventManager
            if (this._map) {
                this._map.destroy();
            }
        },

        // TODO:
        // boundschange (center_changed, zoom_changed, type_changed)
        // click
        // dblclick
        // drag, dragstart, dragend
        // mouseover, mouseout, mousemove
        // rightclick
        _setListeners: function () {
            this._listeners = this._map.events.group()
                .add('boundschange', function (e) {
                    this._events.fire('boundschange', {
                        center: {
                            old: e.get('oldCenter'),
                            new: e.get('newCenter')
                        },
                        zoom: {
                            old: e.get('oldZoom'),
                            new: e.get('newZoom')
                        }
                    });
                }, this)
                .add('click', function (e) {
                    this._events.fire('click', {
                        coords: e.get('coordPosition')
                    });
                }, this);
        },

        on: function () {
            this._events.on.apply(this._events, arguments);
            return this;
        },

        un: function () {
            this._events.un.apply(this._events, arguments);
            return this;
        },

        setCenter: function (center) {
            this._map.setCenter(center);
        },

        original: function () {
            return this._maps;
        }

    });

    return View;

});
