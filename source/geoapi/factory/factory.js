plugin('geoapi.Factory', function (sandbox, undefined) {

    var DEFAULT_API = 'yandex';
    var BASE_API = 'base';

    return function Factory(api) {
        api = api && sandbox.geoapi[api] ? api : DEFAULT_API;

        return {
            createMapView: function (model) {
                var View = sandbox.geoapi[api].Map || sandbox.geoapi[BASE_API].Map;
                return new View(model);
            }
        };
    };

});
