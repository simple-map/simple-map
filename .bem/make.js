MAKE.decl('Arch', {

    blocksLevelsRegexp: /^source$/,

    bundlesLevelsRegexp: /^(build|tests)$/i,

});

MAKE.decl('BundleNode', {

    getTechs: function() {

        var techs = [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'js'
        ]

        if (this.getLevelPath() === 'tests') {
            techs.push('test.js');
        }

        return techs;
    },

    'create-test.js-node': function(tech, bundleNode, magicNode) {

        return this.setBemBuildNode(
            tech,
            this.level.resolveTech(tech),
            this.getBundlePath('bemdecl.js'),
            bundleNode,
            magicNode);
    },

    'create-test.js-optimizer-node': function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
