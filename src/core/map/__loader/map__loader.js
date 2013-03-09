plugin('map.Loader', function (sandbox) {

    function Loader(model) {
        this._element = this._createElement();

        $.when(
            this._createDomReadyPromise(),
            this._createContainerPromise()
        )
            .done($.proxy(this._onDone, this));
    }

    $.extend(Loader.prototype, {

        destroy: function () {
            this._element.remove();
            this._element = null;
        },

        _createElement: function () {
            return $('<div/>')
                .css({
                    position: 'absolute',
                    top: '50%',
                    width: '100%',
                    textAlign: 'center'
                });
        },

        _createDomReadyPromise: function () {
            var domReadyPromise = $.Deferred();
            $(domReadyPromise.resolve);
            return domReadyPromise;
        },

        _createContainerPromise: function () {
            var containerPromise = $.Deferred();
            var model = this._model;

            function checkContainer() {
                if (model.get('container')) {
                    containerPromise.resolve();
                }
            }

            this._model.on('container', checkContainer);
            checkContainer();

            return containerPromise;
        },

        _onDone: function () {
            var container = $(this._model.get('container'));
            container
                .css('position', 'relative')
                .append(this._element);
        },

        loading: function () {
            this._setMessage('loading...');
            this._setColorByType('loading');
        },

        error: function () {
            // TODO: Show some kind of message when cotainer isn't available
            this._setMessage('something wrong');
            this._setColorByType('error');
        },

        _setMessage: function (message) {
            this._element.html(message);
        },

        _setColorByType: function (type) {
            this._element.css('color', type === 'error' ? 'red' : 'green');
        }
    });

    return Loader;

});
