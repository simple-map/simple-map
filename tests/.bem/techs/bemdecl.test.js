var BEM = require('bem');
var Q = BEM.require('q');
var fs = require('fs');

var PAGE_TEST_NAME = 'index';
var PAGE_TEST_PATH = './tests/' + PAGE_TEST_NAME + '/' + PAGE_TEST_NAME + '.bemdecl.js';

function reduceResult (arr) {
    return arr.reduce(function (result, item) {
        return item ? result.concat(item): result;
    }, [])
}

function processFile (dirPath, file) {
    var d = Q.defer();
    var filePath = dirPath + '/' + file;

    fs.stat(filePath, function (err, stat) {
        if (err) {
            throw err;
        }

        file[0] === '.' ? d.resolve() :
            stat.isDirectory() ?
                processDir(filePath).then(d.resolve) :
                d.resolve(file);
    });

    return d.promise;
}

function processDir(dirPath) {
    var d = Q.defer();

    fs.readdir(dirPath, function (err, files) {
        if (err) {
            throw err;
        }

        Q.all(files.map(function (file) {
            return processFile(dirPath, file);
        })).then(function (data) {
            d.resolve(reduceResult(data));
        });
    });

    return d.promise;
}

function findFiles(dirs) {
    var masterDeffer = Q.defer();

    Q.all(dirs.map(function (dir) {
        var d = Q.defer();
        processDir(dir).then(d.resolve);
        return d.promise;
    })).then(function (data) {
        masterDeffer.resolve(reduceResult(data));
    });

    return masterDeffer.promise;
}

function getItemByName(arr, name) {
    return arr.filter(function (item) {
        return item.name === name;
    })[0];
}

function addModifier(block, modName, modVal) {
    if (!block.mods) {
        block.mods = [];
    }

    var mod = getItemByName(block.mods, modName);
    if (!mod) {
        mod = {name: modName, vals: []};
        block.mods.push(mod);
    }

    var val = getItemByName(mod.vals, modVal);
    if (!val) {
        mod.vals.push({name: modVal});
    }
}

function generateBemDecl(files) {
    var bemDecl = files.reduce(function (result, file) {
        var parts = file.replace(/_+/, '_').split('_');

        var block = getItemByName(result, parts[0]);
        if (!block) {
            block = {name: parts[0]};
            result.push(block);
        }

        // block modifier
        if (parts.length === 3) {
            addModifier(block, parts[1], parts[2]);
        }

        if (parts.length === 2 || parts.length === 4) {
            if (!block.elems) {
                block.elems = [];
            }

            var elem = getItemByName(block.elems, parts[1]);
            if (!elem) {
                elem = {name: parts[1]};
                block.elems.push(elem);
            }

            // elem modifier
            if (parts.length === 4) {
                addModifier(elem, parts[2], parts[3]);
            }
        }

        return result;
    }, []);

    fs.writeFile(PAGE_TEST_PATH, 'exports.blocks=' + JSON.stringify(bemDecl), 'utf-8');
}

exports.create = function (prefix, vars, force) {
    var testDirs = (vars.BlockName || '').trim().split(' ');

    findFiles(testDirs).then(function (files) {
        var testFiles = files.reduce(function (result, fileName) {
            if (fileName.match(/^.*\.(test\.js)$/i)) {
                result.push(fileName.replace(/\.(test\.js)/, ''));
            }
            return result;
        }, []);

        generateBemDecl(testFiles);
    });
};
