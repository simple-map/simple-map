plugin('geoapi.yandex.util.converter.controlName', function (sandbox) {

    return sandbox.geoapi.yandex.util.converterFactory({
        fields: {
            zoomControl: 'zoomControl',
            mapTypeControl: 'typeSelector',
            miniMap: 'miniMap',
            scaleControl: 'scaleLine'
        }
    });

});
