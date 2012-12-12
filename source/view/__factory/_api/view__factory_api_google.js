sm.plugin('view.factories.google', function ($) {

    return {
        createMapView: function (model) {
            return new $.view.map.Google(model);
        }
    };

});
