/*global console*/
(function () {

    var ConsoleReporter = jasmine.ConsoleReporter = function (options) {
        this._options = options || {};
        this._suiteResults = [];
        this._progressBar = [];
    };

    ConsoleReporter.prototype.reportRunnerStarting = function () {
        this._runnerStartTime = +new Date();
        this._printHeader();
    };

    ConsoleReporter.prototype.reportSpecStarting = function () {};

    ConsoleReporter.prototype.reportSuiteResults = function (suite) {
        this._suiteResults.push({
            description       : this._getSuiteFullName(suite),
            failedSpecResults : $.map(suite.results().items_, function (spec) {
                return spec.failedCount > 0 && spec.description ? spec : null;
            })
        });
    };

    ConsoleReporter.prototype.reportSpecResults = function (spec) {
        var results = spec.results();

        this._progressBar.push(
            this._colorString(
                results.skipped ? '*' : (results.passed() ? '.' : 'F'),
                results.skipped ? 'yellow' : (results.passed() ? 'green' : 'red')));

        this._printProgressBar();
    };


    ConsoleReporter.prototype.reportRunnerResults = function (runner) {
        var _this = this;

        $.each(_this._suiteResults, function (i, suiteResult) {
            $.each(suiteResult.failedSpecResults, function (i, failedSpecResult) {
                _this._printFailureDetails(suiteResult.description, failedSpecResult.description);
            });
        });

        _this._printSummary(+new Date() - _this._runnerStartTime, runner.specs().length, runner.results().failedCount);
        _this._options.finishCallback && _this._options.finishCallback(runner);
    };

    ConsoleReporter.prototype._getSuiteFullName = function (suite) {
        return suite.parentSuite ?
            this._getSuiteFullName(suite.parentSuite) + ' -> ' + suite.description :
            suite.description;
    };

    ConsoleReporter.prototype._colorString = function (str, color) {
        return this._options.colored ? (colors[color] + str + colors.none) : str;
    };

    ConsoleReporter.prototype._printProgressBar = function () {
        console.log((this._progressBar.length > 1 ? '\033[1A' : '') + this._progressBar.join(''));
    };

    ConsoleReporter.prototype._printHeader = function () {
        console.log('Started');
    };

    ConsoleReporter.prototype._printSummary = function (elapsed, total, failed) {
        console.log('Finished in ' + elapsed / 1000 + ' seconds.');
        console.log(this._colorString('Specs total: ' + total + '\n' + 'Failed: ' + failed, failed ? 'red' : 'green'));
        console.log('');
    };

    ConsoleReporter.prototype._printFailureDetails = function (suiteDescription, specDescription) {
        console.log(this._colorString(suiteDescription + " -> " + specDescription, 'red'));
    };


    var colors = {
        green  : '\033[32m',
        red    : '\033[31m',
        yellow : '\033[33m',
        none   : '\033[0m'
    };

})();
