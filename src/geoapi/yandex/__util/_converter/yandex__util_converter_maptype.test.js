describe('yandex__util', function () {
    var converter = sandbox.geoapi.yandex.util.converter.mapType;

    describe('when type converter is used', function () {

        it('should convert type to ymaps type', function () {
            expect(converter.toYMaps('satellite')).toEqual('yandex#satellite');
            expect(converter.toYMaps('hybrid')).toEqual('yandex#hybrid');
            expect(converter.toYMaps()).toEqual('yandex#map');
        });

        it('should convert ymaps type to type', function () {
            expect(converter.fromYMaps('yandex#satellite')).toEqual('satellite');
            expect(converter.fromYMaps('yandex#hybrid')).toEqual('hybrid');
            expect(converter.fromYMaps()).toEqual('roadmap');
        });

    });

});
