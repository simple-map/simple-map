exports.baseTechName = 'js-i';

exports.getBuildResult = function (prefixes, suffix) {
    return this.__base.apply(this, arguments).then(function (res) {
        if (suffix === 'js') {
            res.unshift('!(function (window, undefined) {');
            res.push('}(window));');
        }

        return res;
    });
};
