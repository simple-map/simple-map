var converterFactory = require('yandex__util').converterFactory;
exports.Converter = converterFactory({
    fields: {
        zoomControl: 'zoomControl',
        mapTypeControl: 'typeSelector',
        miniMap: 'miniMap',
        scaleControl: 'scaleLine'
    }
});
