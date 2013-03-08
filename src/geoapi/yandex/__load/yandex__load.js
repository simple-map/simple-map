plugin('geoapi.yandex.load', function (sandbox) {
    var config = sandbox.geoapi.yandex.config;
    var API_URL = config.template
        .replace('{url}', config.url)
        .replace('{version}', config.version)
        .replace('{modules}', config.modules.join(','))
        .replace('{language}', config.language);

    return function () {
        var d = $.Deferred();

        if (!window.ymaps) {
            $.ajax({
                url: API_URL,
                dataType: 'script'
            })
                .done(function () {
                    ymaps.ready(function () {
                        d.resolve();
                    });
                });
        } else {
            ymaps.ready(function () {
                d.resolve();
            });
        }

        return d.promise();
    };
});
