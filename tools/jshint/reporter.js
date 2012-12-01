/*jshint globalstrict:true, onevar:false, node:true */
'use strict';

var codes = {
    'error'  : 31, // red
    'warning': 36  // cyan
};

function report(level, context) {
    var error = context.error;
    var text = '\x1b[1;' + codes[level] + 'm' + level + ': \x1b[0m'
        + context.file + ':' + error.line;

    if (error.character >= 0) {
        text += ':' + error.character;
    }

    text += ' ' + error.reason;
    console.log(text);
}

exports.reporter = function(results, data) {
    // Handle errors
    results.forEach(function(result) {
        report('error', result);
    });

    // Handle warnings
    var hasWarnings = false;
    data.forEach(function(item) {
        var implieds = item.implieds;
        var unuseds = item.unused;
        var context = {
            file: item.file,
            error: {
                character: -1
            }
        };

        if (!hasWarnings) {
            hasWarnings = implieds || unuseds;
        }

        if (implieds) {
            implieds.forEach(function(implied) {
                context.error.line = implied.line;
                context.error.reason = "Implied global '" + implied.name + "'";
                report('warning', context);
            });
        }

        if (unuseds) {
            unuseds.forEach(function(unused) {
                var reason = "Unused variable '" + unused.name + "'";
                if (unused['function'] !== '"anonymous"') {
                    reason += ' in function ' + unused['function'];
                }
                context.error.line = unused.line;
                context.error.reason = reason;
                report('warning', context);
            });
        }
    });

    // Exit with 'failure' code if has warnings
    if (!results.length && hasWarnings) {
        results.length = 1;
    }
};
