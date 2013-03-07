plugin('geoapi.yandex.util', function (sandbox) {

    var DEFAULT_TYPE = 'roadmap';
    var TYPES = {
        roadmap: 'yandex#map',
        satellite: 'yandex#satellite',
        hybrid: 'yandex#hybrid'
    };

    return {
        typeConverter: {
            fromYMaps: function (ymapsType) {
                var type;
                for (var key in TYPES) {
                    if (TYPES.hasOwnProperty(key) && TYPES[key] === ymapsType) {
                        type = key;
                        break;
                    }
                }
                return type || DEFAULT_TYPE;
            },

            toYMaps: function (type) {
                return TYPES[type] || TYPES[DEFAULT_TYPE];
            }
        }
    };

});
