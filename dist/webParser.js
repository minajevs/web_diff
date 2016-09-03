var fs = require('fs');
var WebPageParser = (function () {
    function WebPageParser(interval) {
        var _this = this;
        if (interval === void 0) { interval = 60; }
        this._pages = [];
        this._updating = false;
        this._logger = new Logger(new Date().toDateString() + '.txt');
        this._diffLogger = new Logger('differences.txt');
        this._logDiff = function (page, difference) {
            _this._logger.Log("\n            Found difference at " + page.name + ", on " + new Date().toString() + ".");
            var diffStr = '';
            for (var _i = 0; _i < difference.length; _i++) {
                var part = difference[_i];
                if (part.added || part.removed) {
                    diffStr += '\r\n' + '--' + (part.added === true ? 'Added' : 'Removed') + ' : '
                        + '\r\n' + part.value;
                }
            }
            var time = new Date().getTime().toString();
            _this._diffLogger.Log("\n            =============" + page.name + "=============\n            " + new Date().toString() + "\n            " + time + ".html\n            \n            " + diffStr + "\n            ");
            _this._diffLogger.saveBackup(page, time);
        };
        this.Add = function (page) {
            page.on('pageUpdated', _this._logDiff);
            _this._pages.push(page);
        };
        this.Remove = function (page) {
            var index = _this._pages.indexOf(page);
            _this._pages.splice(index, 1);
        };
        this.Start = function () {
            if (_this._timer)
                return;
            _this._timer = setInterval(function () {
                _this.Update();
            }, _this._interval);
        };
        this.Stop = function () {
            clearInterval(_this._timer);
            _this._timer = null;
        };
        this.Update = function () {
            if (!_this._updating) {
                _this._logger.Log("\n                ================updating================\n                " + new Date().toString());
                _this._updating = true;
                var i = 0;
                var self_1 = _this;
                function _update() {
                    if (i < self_1._pages.length) {
                        var page = self_1._pages[i];
                        page.on('runComplete', function () {
                            i++;
                            _update();
                        });
                        page.Run();
                    }
                    else {
                        self_1._updating = false;
                        self_1.lastUpdate = new Date();
                    }
                }
                _update();
            }
            else {
                console.log("can't start new update yet");
            }
        };
        this._interval = interval * 1000;
    }
    Object.defineProperty(WebPageParser.prototype, "count", {
        get: function () { return this._pages.length; },
        enumerable: true,
        configurable: true
    });
    ;
    return WebPageParser;
})();
exports.WebPageParser = WebPageParser;
var Logger = (function () {
    function Logger(filename) {
        var _this = this;
        this.Log = function (str) {
            if (!fs.existsSync(_this.filename)) {
                fs.writeFile(_this.filename, "New log create at " + new Date().toString(), function (err) {
                    if (err)
                        console.log(err);
                });
            }
            fs.appendFile(_this.filename, dedent(str), function (err) {
                if (err)
                    console.log(err);
            });
        };
        this.saveBackup = function (page, timestamp) {
            fs.createReadStream(page.location[1]).pipe(fs.createWriteStream(page.dir + '\\' + timestamp + '.html'));
        };
        this.filename = filename;
    }
    return Logger;
})();
function dedent(callSite) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    function format(str) {
        var size = -1;
        return str.replace(/\n(\s+)/g, function (m, m1) {
            if (size < 0)
                size = m1.replace(/\t/g, "    ").length;
            return "\n" + m1.slice(Math.min(m1.length, size));
        });
    }
    if (typeof callSite === "string")
        return format(callSite);
    if (typeof callSite === "function")
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return format(callSite.apply(void 0, args));
        };
    var output = callSite
        .slice(0, args.length + 1)
        .map(function (text, i) { return (i === 0 ? "" : args[i - 1]) + text; })
        .join("");
    return format(output);
}
