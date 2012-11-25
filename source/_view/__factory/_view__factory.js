sm.plugin('_view.Factory', function (sandbox, undefined) {

    var DEFAULT_API = 'yandex';

    function Factory(api) {
        api = api || DEFAULT_API;
        var factory = sandbox.view.factories[api];

        return factory ? factory: sandbox.view.factories[DEFAULT_API];
    }

    return Factory;

});
