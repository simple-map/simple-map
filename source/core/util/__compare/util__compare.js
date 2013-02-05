plugin('util.compare', function () {

    var toString = Object.prototype.toString;

    function isObject(obj) {
        return toString.apply(obj) === '[object Object]';
    }

    function compareObjects(a, b) {
        // Compare if they are references to each other
        if (a === b) {
            return true;
        }

        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }

        for (var i in a) {
            if (
                a.hasOwnProperty(i) && (
                    typeof b[i] === 'undefined' ||
                    toString.apply(a[i]) !== toString.apply(b[i])
                ) ||
                !compare(a[i], b[i])
            ) {
                return false;
            }
        }
        return true;
    }

    function isArray(arr) {
        return toString.apply(arr) === '[object Array]';
    }

    function compareArrays(a, b) {
        // References to each other?
        if (a === b) {
            return true;
        }

        // Arrays with different length are not equal
        if (a.length !== b.length) {
            return false;
        }

        for (var i = 0, l = a.length; i < l; i++) {
            if (toString.apply(a[i]) !== toString.apply(b[i])) {
                return false;
            }

            if (!compare(a[i], b[i])) {
                return false;
            }
        }

        return true;
    }

    function isFloat(n) {
        return typeof n === 'number' && n % 1 !== 0;
    }

    function compareFloats(a, b) {
        return a.toFixed(6) ===  b.toFixed(6);
    }

    function compare(a, b) {
        switch (Boolean(true)) {
        case toString.apply(a) !== toString.apply(b):
            return false;
        case isObject(a):
            return compareObjects(a, b);
        case isArray(a):
            return compareArrays(a, b);
        case isFloat(a):
            return compareFloats(a, b);
        default:
            return a === b;
        }
    }

    return compare;

});
