plugin('behaviour.ArrayLike', function () {

    return {
        length: 0,
        each: [].forEach,
        map: [].map,
        slice: [].slice,
        sort: [].sort,
        splice: [].splice
    };

});
