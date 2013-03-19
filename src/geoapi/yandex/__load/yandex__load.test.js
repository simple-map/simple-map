describe('yandex__load', function () {
    var ajaxSpy;
    var apiLoad = require('yandex__load').load;

    beforeEach(function () {
        ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
            var d = $.Deferred();
            window.ymaps = {
                ready: function (callback) {
                    callback();
                }
            };
            d.resolve();
            return d.promise();
        });
    });

    afterEach(function () {
        delete window.ymaps;
    });

    it('should load api', function () {
        var callback = jasmine.createSpy();
        apiLoad().done(callback);
        expect(callback.callCount).toEqual(1);
    });

    it('should load api only once', function () {
        var callback = jasmine.createSpy();
        apiLoad().done(callback);
        apiLoad().done(callback);
        expect(ajaxSpy.callCount).toEqual(1);
        expect(callback.callCount).toEqual(2);
    });

});
