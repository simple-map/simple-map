sm.plugin('view.map.Google', function ($) {

    var API_URL = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=googleLoadApi';

    function prepareAPI(callback) {
        var asyncCount = 2;

        function onCallback() {
            asyncCount--;
            if (!asyncCount) {
                callback();
            }
        }

        window.googleLoadApi = onCallback;

        if (!window.google || !window.google.maps) {
            $.dom.getScript(API_URL);
        } else {
            setTimeout(onCallback, 0);
        }

        // TODO: show loader until api will be loaded
        $.dom.ready(onCallback);
    }

    function View(model) {
        this._model = model;
        /// this._map = null;

        var _this = this;
        prepareAPI(function () {
            delete window.googleLoadApi;
            _this._initialize();
        });
    }

    $.util.extend(View.prototype, $.behaviour.Observable, {
        _initialize: function () {
            var containerID = this._model.get('container');
            // TODO: debug error for container with null size
            this._container =  typeof containerID === 'string' ? // TODO: container could be selector
                document.getElementById(containerID):
                containerID;

            this._map = new google.maps.Map(this._container, {
                center: new google.maps.LatLng(this._model.get('center')[0], this._model.get('center')[1]),
                zoom: this._model.get('zoom'),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }
    });

    return View;

});
