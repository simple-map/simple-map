var BEM = require('bem');
var extend = require('bem/lib/util').extend;

exports.baseLevelPath = require.resolve('../../.bem/levels/bundles.js');

exports.getTechs = function() {

    return extend(this.__base() || {}, {
        'bemdecl.js': '',
        'test.js': './techs/test.js'
    });


};
