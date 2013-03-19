var PATH = require('path');
var FS = require('fs');

exports.baseTechName = 'js-i';

exports.getBuildResult = function (prefixes, suffix) {
    return this.__base.apply(this, arguments).then(function (res) {

        return [].concat(
            'var __modules = {}, __require = function(moduleName) {',
                'var module = __modules[moduleName];',
                'if(!module) throw Error(\'module "\' + moduleName + \'" not found\');',
                'return __modules[moduleName].exports;',
            '};\n',
            res
        );

    });
};

exports.getBuildResultChunk = function (relPath, path, suffix) {
    var block = PATH.basename(relPath, '.' + suffix);
    return [
        '/* ' + relPath + ': begin */ /**/',
        '(function(require, module, exports) {',
        FS.readFileSync(path),
        '})(__require, __modules[\'' + block + '\'] || (__modules[\'' + block + '\'] = { exports : {}}), __modules[\'' + block + '\'].exports);',
        '/* ' + relPath + ': end */ /**/',
        '\n'
    ].join('\n');
};
