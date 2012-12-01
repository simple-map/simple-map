exports.getTechs = function() {

    return {
        'bemjson.js': '',
        'js': 'js-i'
    };

};

exports.getConfig = function() {

    return {

        bundleBuildLevels: this.resolvePaths([
            '../../source'
        ])

    };

};
