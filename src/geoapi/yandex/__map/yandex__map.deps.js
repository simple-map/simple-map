({
    mustDeps: [
        {block: 'behaviour', elem: 'observable'},
        {block: 'plugin'},
        {block: 'yandex', elems: [
            'controls',
            {name: 'util', mods: {converter: 'maptype'}}
        ]},
        {block: 'util', elems: ['compare']}
    ]
});
