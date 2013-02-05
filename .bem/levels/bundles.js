/*global __dirname*/
var PATH = require('path');

exports.getTechs = function () {

    return {
        'bemjson.js': '',
        'js': PATH.join(PATH.resolve(__dirname, '../techs'), 'js-i.js')
    };

};

exports.getConfig = function () {

    return {

        bundleBuildLevels: this.resolvePaths([
            '../../source/core',
            '../../source/geoapi'
        ])

    };

};
