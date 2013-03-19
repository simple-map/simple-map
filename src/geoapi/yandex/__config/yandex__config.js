exports.config = {
    url: 'http://api-maps.yandex.ru/',
    version: '2.0-stable',
    modules: [
        'package.standard',
        'DomEvent'
    ],
    language: 'ru-RU',
    template: '{url}{version}/?load={modules}&lang={language}'
};
