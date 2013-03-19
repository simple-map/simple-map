/*jshint node:true*/
var PATH = require('path');

exports.getTechs = function () {

    return {
        'bemjson.js': '',
        'js': PATH.join(PATH.resolve(__dirname, '../techs'), 'commonjs.js')
    };

};

exports.getConfig = function () {

    return {

        bundleBuildLevels: this.resolvePaths([
            '../../src/core',
            '../../src/geoapi'
        ])

    };

};
