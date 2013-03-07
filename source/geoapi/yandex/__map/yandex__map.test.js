describe('yandex__map', function () {
    var map;
    var container;

    it('load yandex api', function () {
        $.getScript('cache/yandex/api.js');
        waits(300);
        runs(function () {
            expect(ymaps.Map).toBeDefined();
        });
    });

    function fireMouseEvent(map, type, ymapsType) {
        var ymapsMap = map.getOriginal();
        var domEvent = document.createEvent('MouseEvents');
        domEvent.initMouseEvent(type, true, false);
        ymapsMap.events.fire(
            ymapsType,
            new ymaps.MapEvent({
                type: ymapsType,
                position: [10, 10],
                target: ymapsMap
            }, ymapsMap)
        );
    }

    function fireDragEvent(map, type) {
        var ymapsMap = map.getOriginal();
        var domEvent = document.createEvent('MouseEvents');
        domEvent.initMouseEvent('mouseover', true, false);
        ymapsMap.behaviors.get('drag').events.fire(
            type,
            new ymaps.MapEvent({
                type: type,
                position: [10, 10],
                target: ymapsMap
            }, ymapsMap)
        );
    }

    describe('when api has been loaded', function () {

        beforeEach(function () {
            container = $('<div/>').css({width: 300, height: 300}).appendTo('body');

            map = new sandbox.geoapi.yandex.Map(container[0], {
                center: [55.734046, 37.588628],
                zoom: 10,
                type: 'satellite'
            });
        });

        afterEach(function () {
            map.destruct();
            container.remove();
        });

        it('should return right initial params', function () {
            expect(sandbox.util.compare(map.getCenter(), [55.734046, 37.588628])).toBeTruthy();
            expect(map.getZoom()).toEqual(10);
            expect(map.getType()).toEqual('satellite');
        });

        it('should return right container', function () {
            expect(map.getContainer()).toBe(container[0]);
        });

        it('handle setting and getting center', function () {
            var center = [10.78, 5.45];
            map.setCenter(center);
            expect(sandbox.util.compare(map.getCenter(), center)).toBeTruthy();
        });

        it('handle setting and getting zoom', function () {
            var zoom = 7;
            map.setZoom(zoom);
            expect(map.getZoom()).toEqual(zoom);
        });

        it('handle setting and getting type', function () {
            var type = 'hybrid';
            map.setType(type);
            expect(map.getType()).toEqual(type);
        });

        it('handle setting and getting type', function () {
            var type = 'hybrid';
            map.setType(type);
            expect(map.getType()).toEqual(type);
        });

        it('should return original ymaps object', function () {
            expect(map.getOriginal() instanceof ymaps.Map).toBeTruthy();
        });

        describe('when some events are occuried', function () {

            it('should fire boundschange', function () {
                var callback = jasmine.createSpy();
                map.on('boundschange', callback);
                map.setZoom(7);
                map.setCenter([1, 1]);
                expect(callback.callCount).toEqual(2);
            });

            it('should fire centerchange', function () {
                var callback = jasmine.createSpy();
                map.on('centerchange', callback);
                map.setCenter([1, 1]);
                map.setCenter([1, 1]);
                map.setCenter([2, 1]);
                expect(callback.callCount).toEqual(2);
            });

            it('should fire zoomchange', function () {
                var callback = jasmine.createSpy();
                map.on('zoomchange', callback);
                map.setZoom(7);
                map.setZoom(7);
                map.setZoom(8);
                expect(callback.callCount).toEqual(2);
            });

            it('should fire click', function () {
                var callback = jasmine.createSpy();
                map.on('click', callback);
                fireMouseEvent(map, 'click', 'click');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire dblclick', function () {
                var callback = jasmine.createSpy();
                var ymapsMap = map.getOriginal();
                var domEvent = document.createEvent('MouseEvents');
                domEvent.initMouseEvent('click', true, true, window, 2, 10, 10, 10, 10, false, false, false, false, 0, null);
                map.on('dblclick', callback);
                ymapsMap.events.fire(
                    'dblclick',
                    new ymaps.MapEvent({
                        type: 'dblclick',
                        position: [10, 10],
                        target: ymapsMap,
                        domEvent: new ymaps.DomEvent(domEvent, 'dblclick')
                    }, ymapsMap)
                );
                expect(callback.callCount).toEqual(1);
            });

            it('should fire mouseenter', function () {
                var callback = jasmine.createSpy();
                map.on('mouseenter', callback);
                fireMouseEvent(map, 'mouseover', 'mouseenter');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire mousemove', function () {
                var callback = jasmine.createSpy();
                map.on('mousemove', callback);
                fireMouseEvent(map, 'mousemove', 'mousemove');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire mouseleave', function () {
                var callback = jasmine.createSpy();
                map.on('mouseleave', callback);
                fireMouseEvent(map, 'mouseout', 'mouseleave');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire contextmenu', function () {
                var callback = jasmine.createSpy();
                var ymapsMap = map.getOriginal();
                var domEvent = document.createEvent('MouseEvents');
                domEvent.initMouseEvent('click', true, true, window, 2, 10, 10, 10, 10, false, false, false, false, 0, null);
                map.on('contextmenu', callback);
                ymapsMap.events.fire(
                    'contextmenu',
                    new ymaps.MapEvent({
                        type: 'contextmenu',
                        position: [10, 10],
                        target: ymapsMap,
                        domEvent: new ymaps.DomEvent(domEvent, 'contextmenu')
                    }, ymapsMap)
                );
                expect(callback.callCount).toEqual(1);
            });

            it('should fire typechange', function () {
                var callback = jasmine.createSpy();
                map.on('typechange', callback);
                fireMouseEvent(map, 'typechange', 'typechange');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire dragstart', function () {
                var callback = jasmine.createSpy();
                map.on('dragstart', callback);
                fireDragEvent(map, 'dragstart');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire drag', function () {
                var callback = jasmine.createSpy();
                map.on('drag', callback);
                fireDragEvent(map, 'drag');
                expect(callback.callCount).toEqual(1);
            });

            it('should fire dragend', function () {
                var callback = jasmine.createSpy();
                map.on('dragend', callback);
                fireDragEvent(map, 'dragend');
                expect(callback.callCount).toEqual(1);
            });

        });

    });

});
