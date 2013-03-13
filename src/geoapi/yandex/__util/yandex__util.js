plugin('geoapi.yandex.util', function (sandbox) {

    function Converter(options) {
        this.FIELDS = options.fields;
        this.DEFAULT_FIELD = options.defaultField;
    }

    $.extend(Converter.prototype, {

        toYMaps: function (type) {
            return this.FIELDS[type] || this.FIELDS[this.DEFAULT_FIELD];
        },

        fromYMaps: function (ymapsType) {
            var type;
            for (var key in this.FIELDS) {
                if (this.FIELDS.hasOwnProperty(key) && this.FIELDS[key] === ymapsType) {
                    type = key;
                    break;
                }
            }
            return type || this.DEFAULT_FIELD;
        }

    });

    return {
        converterFactory: function (options) {
            return new Converter(options);
        }
    };

});
