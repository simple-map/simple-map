/*global __dirname*/
var BEM = require('bem');
var extend = require('bem/lib/util').extend;
var PATH = require('path');

exports.baseLevelPath = require.resolve('../../.bem/levels/bundles.js');

exports.getTechs = function () {

    return extend(this.__base() || {}, {
        'bemdecl.js': '',
        'js': PATH.join(PATH.resolve(__dirname, 'techs'), 'js-i.js'),
        'test.js': PATH.join(PATH.resolve(__dirname, 'techs'), 'test.js')
    });

};

exports.getConfig = function () {

    return BEM.util.extend(this.__base() || {}, {
        bundleBuildLevels: this.resolvePaths([
            '../../source/core',
            '../../source/geoapi',
            '../unit/geoapi'
        ])
    });

};
