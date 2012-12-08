sm.plugin('view.map.Yandex', function (sandbox) {

    var API_URL = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU';

    function prepareAPI(callback) {
        var asyncCount = 2;

        function onCallback() {
            asyncCount--;
            if (!asyncCount) {
                callback();
            }
        }

        if (!window.ymaps) {
            sandbox.dom.getScript(API_URL, function () {
                ymaps.ready(onCallback);
            });
        } else {
            setTimeout(onCallback, 0);
        }

        // TODO: show loader until api will be loaded
        sandbox.dom.ready(onCallback);
    }

    function View(model) {
        this._model = model;
        /// this._map = null;

        var _this = this;
        prepareAPI(function () {
            _this._initialize();
        });
    }

    sandbox.util.extend(View.prototype, sandbox.behaviour.Observable, {
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
            this.fire('bounds_changed');
            this.fire('center_changed');
            this.fire('zoom_changed');
        },

        _onClick: function (e) {
            this.fire('click', e.get('coordPosition'));
        },

        _onDblClick: function (e) {
            this.fire('dblclick', e.get('coordPosition'));
        },

        _onMouseOver: function (e) {
            this.fire('mouseover', e.get('coordPosition'));
        },

        _onMouseMove: function (e) {
            this.fire('mousemove', e.get('coordPosition'));
        },

        _onMouseOut: function (e) {
            this.fire('mouseout', e.get('coordPosition'));
        },

        _onRightClick: function (e) {
            this.fire('rightclick', e.get('coordPosition'));
        },

        _onTypeChange: function (e) {
            this._model.set('type', e.get('newType'));
        },

        original: function () {
            return this._maps;
        }

    });

    return View;

});
