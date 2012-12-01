exports.baseTechName = 'js';

exports.techMixin = {

    getBuildResultChunk: function(relPath, path, suffix) {
        return '/*borschik:include:' + relPath + '*/;\n';
    },

    getSuffixes: function() {
        return ['test.js'];
    }

};
