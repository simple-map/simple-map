plugin('geoapi.yandex.load', function (sandbox) {
    var API_URL = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard,DomEvent&lang=ru-RU';

    return function (callback) {
        var asyncCount = 2;

        function onCallback() {
            asyncCount--;
            if (!asyncCount) {
                callback();
            }
        }

        if (!window.ymaps) {
            $.getScript(API_URL, function () {
                ymaps.ready(onCallback);
            });
        } else {
            setTimeout(onCallback, 0);
        }

        // TODO: show loader until api will be loaded
        $(onCallback);
    };
});
