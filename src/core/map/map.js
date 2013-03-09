plugin('Map', function (sandbox) {

    var INIT_MAP_TIMEOUT = 5000;

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
        this._model = new sandbox.Model(options);

        this._loader = new sandbox.map.Loader(this._model);
        this._loader.loading();

        // TODO: show different messages for api loading failed and unset required fields
        $.when(this._getDomReadyPromise(), this._createRequiredFieldsPromise(), sandbox.geoapi.yandex.load())
            .done($.proxy(this._onLoadSuccess, this))
            .fail($.proxy(this._loader.error, this._loader));
    }

    $.extend(Map.prototype, sandbox.behaviour.Observable, {

        remove: function () {
            if (this._view) {
                this._view.destroy();
                this._view = null;
            }

            this.un();

            this._model.destroy();
            this._model = null;

            if (this._loader) {
                this._loader.destroy();
                this._loader = null;
            }
        },

        _onLoadSuccess: function () {
            this._loader.destroy();
            this._view = new sandbox.geoapi.yandex.Map($(this._model.get('container'))[0], {
                center: this._model.get('center'),
                zoom: this._model.get('zoom')
            });

            //var _this = this;
            //PROXY_EVENTS.map(function (key) {
                //_this._view.on(key, function (data) {
                    //this.fire(key, data);
                //}, _this);
            //});
        },

        _getDomReadyPromise: function () {
            if (!this._domReadyPromise) {
                this._domReadyPromise = $.Deferred();
                $(this._domReadyPromise.resolve);
            }
            return this._domReadyPromise.promise();
        },

        _createRequiredFieldsPromise: function () {
            var requiredFields = $.Deferred();
            var model = this._model;
            var timeoutId;

            function checkRequiredFields() {
                if ($(model.get('container')).length && model.get('center') && model.get('zoom')) {
                    requiredFields.resolve();
                    clearTimeout(timeoutId);
                }
            }

            timeoutId = setTimeout(function () {
                requiredFields.reject();
            }, INIT_MAP_TIMEOUT);

            this._getDomReadyPromise().done(checkRequiredFields);

            this._model
                .on('container', checkRequiredFields)
                .on('center', checkRequiredFields)
                .on('zoom', checkRequiredFields);
            checkRequiredFields();

            return requiredFields;
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
