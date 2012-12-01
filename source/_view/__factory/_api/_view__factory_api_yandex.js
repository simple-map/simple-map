sm.plugin('_view.factories.yandex', function (sandbox, undefined) {

    return {
        createMapView: function (model) {
            return new sandbox.view.map.Yandex(model);
        }
    };

});
