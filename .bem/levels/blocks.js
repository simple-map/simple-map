/*jshint node:true*/
var PATH = require('path');

exports.getTechs = function () {

    return {
        'js': PATH.join(PATH.resolve(__dirname, '../techs'), 'commonjs.js')
    };

};
