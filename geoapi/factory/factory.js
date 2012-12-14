plugin('geoapi.Factory', function ($, undefined) {

    var DEFAULT_API = 'yandex';
    var BASE_API = 'base';

    return function Factory(api) {
        api = api && $.geoapi[api] ? api : DEFAULT_API;

        return {
            createMapView: function (model) {
                var View = $.geoapi[api].Map || $.geoapi[BASE_API].Map;
                return new View(model);
            }
        };
    };

});
