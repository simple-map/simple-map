sm.plugin('_view.map.Yandex', function (sandbox) {

    var API_URL = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU';

    function prepareAPI(callback) {
        var asyncCount = 2;

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
                callback();
            }
        }
    }

    function View(model) {
        this._model = model;
        this._events = new sandbox.util.EventManager();
        /// this._map = null;

        var _this = this;
        prepareAPI(function () {
            _this._initialize();
        });
    }

    sandbox.util.extend(View.prototype, {
        _initialize: function () {
            var containerID = this._model.get('container');
            // TODO: debug error for container with null size
            this._container =  typeof containerID === 'string' ? // TODO: container could be selector
                document.getElementById(containerID):
                containerID;

            this._map = new ymaps.Map(this._container, {
                //TODO: check center before setting it to map (cause error in ymaps api)
                center: this._model.get('center'), // TODO: center could be address
                zoom: this._model.get('zoom')
            });

            this._setListeners();
        },

        destroy: function () {
            //this._events.removeAll() TODO: add method removeAll for eventManager
            if (this._map) {
                this._map.destroy();
            }
        },

        _setListeners: function () {
            this._model.on('center', function (data) {
                this._map.setCenter(data.newValue);
            }, this);

            this._model.on('zoom', function (data) {
                this._map.setZoom(data.newValue);
            }, this);

            this._listeners = this._map.events.group()
                // TODO: dragstart, drag, dragend isn't implemented in ymaps api
                .add('boundschange', this._onBoundsChange, this)
                .add('click', this._onClick, this)
                .add('dblclick', this._onDblClick, this)
                .add('mouseenter', this._onMouseOver, this)
                .add('mousemove', this._onMouseMove, this)
                .add('mouseleave', this._onMouseOut, this)
                .add('contextmenu', this._onRightClick, this)
                .add('typechange', this._onTypeChange, this);
        },

        _onBoundsChange: function (e) {
            this._model.set('center', e.get('newCenter'), true);
            this._model.set('zoom', e.get('newZoom'), true);
            this._events.fire('bounds_changed');
            this._events.fire('center_changed');
            this._events.fire('zoom_changed');
        },

        _onClick: function (e) {
            this._events.fire('click', e.get('coordPosition'))
        },

        _onDblClick: function (e) {
            this._events.fire('dblclick', e.get('coordPosition'))
        },

        _onMouseOver: function (e) {
            this._events.fire('mouseover', e.get('coordPosition'));
        },

        _onMouseMove: function (e) {
            this._events.fire('mousemove', e.get('coordPosition'));
        },

        _onMouseOut: function (e) {
            this._events.fire('mouseout', e.get('coordPosition'));
        },

        _onRightClick: function (e) {
            this._events.fire('rightclick', e.get('coordPosition'));
        },

        _onTypeChange: function (e) {
            this._model.set('type', e.get('newType'));
        },

        on: function () {
            this._events.on.apply(this._events, arguments);
            return this;
        },

        un: function () {
            this._events.un.apply(this._events, arguments);
            return this;
        },

        original: function () {
            return this._maps;
        }

    });

    return View;

});
