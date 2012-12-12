plugin('view.Factory', function ($, undefined) {

    var DEFAULT_API = 'yandex';

    function Factory(api) {
        api = api || DEFAULT_API;
        var factory = $.view.factories[api];

        return factory ? factory: $.view.factories[DEFAULT_API];
    }

    return Factory;

});
