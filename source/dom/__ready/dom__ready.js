/**
 * @see https://gist.github.com/1476064
 */
sm.plugin('dom.ready', function () {

    'use strict';

    /**
     * Ready flag
     *
     * @access private
     * @var boolean ready
     */
    var ready = false,

    /**
     * List of listeners
     *
     * @access private
     * @var Array listeners
     */
    listeners = [],

    /**
     * Listener handler
     *
     * @access private
     * @returns void
     */
    listener = function() {
        ready = true;//flip switch
        while(listeners[0]) {
            listeners.shift()();
        }
    };

    // Attach event
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', listener, false);
    }
    else {//mostly IE<9
        document.onreadystatechange = function() {
            // Interactive equals DOMContentLoaded, but doesn't always fire
            if(this.readyState.match(/interactive|complete/)) {
                this.onreadystatechange = null;//unbind
                listener();
            }
        };
    }

    /**
     * Adds ready function
     *
     * @access public
     * @param function fn
     * @returns void
     */
    return function(fn) {
        fn && (ready ? fn() : listeners.push(fn));
    };

});
