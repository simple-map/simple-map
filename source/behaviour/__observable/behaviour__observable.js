plugin('behaviour.Observable', function () {

    var callbacksStorageName = '__' + Number(new Date()) + 'storage';

    return {

        /**
         * Start listening some particular event.
         *
         * @param {String|String[]} eventName Identificator of the event or space separated events list.
         * @param {Function} callback Function to be executed every time event being
         *      fired.
         * @param {Object} [ctx] Context of the callback execution.
         * @returns {this}
         */
        on: function (eventName, callback, ctx) {
            eventName = Array.isArray(eventName) ? eventName : eventName.split(' ');

            var storage = this[callbacksStorageName] || (this[callbacksStorageName] = {});

            eventName.forEach(function (singleEventName) {
                (storage[singleEventName] || (storage[singleEventName] = []))
                    .push({
                        fn: callback,
                        ctx: ctx
                    });
            }, this);

            return this;
        },

        /**
         * Stop listening some particular event. If none of arguments are specified,
         * method will remove all callbacks for all events.
         *
         * @param {String|String[]} [eventName] Identificator of the event.
         * @param {Function} [callback] Function to be executed every time event being
         *      fired. If not specified all event's callbacks will be removed.
         * @param {Object} [ctx] Context of the callback execution.
         * @returns {this}
         */
        un: function (eventName, callback, ctx) {
            if (!eventName) {
                this[callbacksStorageName] = {};
                return this;
            }

            eventName = Array.isArray(eventName) ? eventName : eventName.split(' ');
            var storage = this[callbacksStorageName];

            eventName.forEach(function (singleEventName) {
                var eventCallbacks = storage[singleEventName];

                if (eventCallbacks) {
                    if (callback) {
                        storage[singleEventName] = eventCallbacks
                            .filter(function (storedCallback) {
                                var isContextsEqual = (!ctx || ctx === storedCallback.ctx);

                                return !(callback === storedCallback.fn && isContextsEqual);
                            });
                    } else {
                        storage[singleEventName] = [];
                    }
                }
            }, this);

            return this;
        },

        /**
         * Fire particular event.
         *
         * @param {String} eventName Identificator of the event.
         * @param {Object} [eventData] Data to be passed to the event's callbacks.
         * @returns {this}
         */
        fire: function (eventName, eventData) {
            var eventCallbacks = this[callbacksStorageName][eventName];

            if (eventCallbacks) {
                eventCallbacks.forEach(function (callback) {
                    callback.fn.call(callback.ctx || window, eventData);
                });
            }

            return this;
        }
    };

});
