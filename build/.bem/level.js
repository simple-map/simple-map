var extend = require('bem/lib/util').extend;
var PATH = require('path');
var BEM_TECHS = '../../bem-bl/blocks-common/i-bem/bem/techs';

exports.getTechs = function() {

    return {
        'bemjson.js': '',
        'js': 'js-i'
    };

};

exports.getConfig = function() {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            '../../source',
            '../blocks'
        ])

    });

};
