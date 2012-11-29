MAKE.decl('Arch', {

    blocksLevelsRegexp: /^source$/,

    bundlesLevelsRegexp: /^build$/

});

MAKE.decl('BundleNode', {

    getTechs: function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'js'
        ];

    }

});
