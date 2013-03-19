/*jshint node:true*/
var PATH = require('path');

exports.baseTechName = PATH.join(PATH.resolve(__dirname), 'commonjs-without-closure.js');

exports.getBuildResult = function (prefixes, suffix) {
    return this.__base.apply(this, arguments).then(function (res) {

        return [].concat(
            '!(function (window, undefined) {',
            res,
            '}(window));\n\n'
        );

    });
};
