sm.plugin('_view.factories.yandex', function (sandbox, undefined) {

    return {
        createMapView: function (options) {
            return new sandbox.view.map.Yandex(options);
        }
    };

});
