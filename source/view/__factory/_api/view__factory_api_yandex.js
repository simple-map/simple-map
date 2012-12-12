plugin('view.factories.yandex', function ($) {

    return {
        createMapView: function (model) {
            return new $.view.map.Yandex(model);
        }
    };

});
