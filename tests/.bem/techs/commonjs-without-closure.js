/*jshint node:true*/
var PATH = require('path');

exports.baseTechName = PATH.join(PATH.resolve(__dirname, '../../../.bem/techs'), 'commonjs-without-closure.js');

exports.getBuildResult = function (prefixes, suffix) {
    return this.__base.apply(this, arguments).then(function (res) {

        return [].concat(
            res,
            'var require = __require;\n\n'
        );

    });
};
