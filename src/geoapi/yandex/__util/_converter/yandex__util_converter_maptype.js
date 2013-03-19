var converterFactory = require('yandex__util').converterFactory;
exports.Converter = converterFactory({
    fields: {
        roadmap: 'yandex#map',
        satellite: 'yandex#satellite',
        hybrid: 'yandex#hybrid'
    },
    defaultField: 'roadmap'
});
