sm.plugin('Map', function (sandbox) {

    function Map(options) {
        this._factory = new sandbox.view.Factory(options.api);
        this._model = new sandbox.Model(options);
        this._view =  this._factory.createMapView(),
        this._events = new sandbox.util.EventManager();

        this._view.on('ready', this._onViewReady, this);
    }

    sandbox.util.extend(Map.prototype, {

        remove: function () {
            this._view.destroy();
            this._model.destroy();
            this._view = this._model = null;
        },

        _onViewReady: function () {
            this._initView();
            this._model
                .on('center', this._onCenterChanged, this)
                .on('api', this._onApiChanged, this);
        },

        _initView: function () {
            //TODO: check center before setting it to map (cause error in ymaps api)
            this._view.initialize({
                container: this._model.get('container'),
                center: this._model.get('center'),
                zoom: this._model.get('zoom')
            });

            this._view.on('click', function (data) {
                this._events.fire('click', data);
            }, this);

            this._view.on('boundschange', function (data) {
                if (!this._freeze) {
                    this._model.set('center', data.center.new); //TODO: add silent option to model
                }
            }, this);
        },

        _onCenterChanged: function () {
            //TODO: the model should pass a new center into the callback
            this._freeze = true;
            this._view.setCenter(this._model.get('center'));
            this._events.fire('center-change', this._model.get('center'));
            this._freeze = false;
        },

        _onApiChanged: function () {
            this._factory = new sandbox.view.Factory(this._model.get('api'));
            this._view.destroy(); //TODO: hide
            this._view =  this._factory.createMapView();
            this._view.on('ready', this._initView, this);
        },

        on: function () {
            this._events.on.apply(this._events, arguments);
            return this;
        },

        un: function () {
            this._events.un.apply(this._events, arguments);
            return this;
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
