plugin('geoapi.yandex.util.converter.mapType', function (sandbox) {

    return sandbox.geoapi.yandex.util.converterFactory({
        fields: {
            roadmap: 'yandex#map',
            satellite: 'yandex#satellite',
            hybrid: 'yandex#hybrid'
        },
        defaultField: 'roadmap'
    });

});
