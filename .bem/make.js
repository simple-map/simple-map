MAKE.decl('Arch', {

    blocksLevelsRegexp: /^(src\/core|src\/geoapi)$/,

    bundlesLevelsRegexp: /^(build|tests)$/i

});

MAKE.decl('BundleNode', {

    getTechs: function () {

        var techs = [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'js'
        ];

        if (this.getLevelPath() === 'tests') {
            techs.push('test.js');
        }

        return techs;
    }

});
