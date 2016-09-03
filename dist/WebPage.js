var request = require('request');
var fs = require('fs');
var diff = require('diff');
var es6_promise_1 = require('es6-promise');
var WebPage = (function () {
    //compared, pageUpdated
    function WebPage(url, name) {
        var _this = this;
        this.bothFilesExist = false;
        this._compareRule = function (str) { return str; };
        this._parseRule = function (str) { return str; };
        this._promises = [];
        this._eventDictionary = [];
        this.setLogin = function (loginMethod) {
            _this._login = loginMethod;
            return _this;
        };
        this.setCompareRule = function (compareMethod) {
            _this._compareRule = compareMethod;
            return _this;
        };
        this.setParseRule = function (parseRule) {
            _this._parseRule = parseRule;
            return _this;
        };
        this.Run = function (callback) {
            _this._login(_this, function () {
                _this.Parse(function () {
                    _this.Compare(function () {
                        _this._eventDictionary['runComplete']();
                    });
                });
            });
        };
        this.Parse = function (callback) {
            if (!fs.existsSync(_this.dir)) {
                fs.mkdirSync(_this.dir);
            }
            if (fs.existsSync(_this.location[0])) {
                _this._promises.push(new es6_promise_1.Promise(function (resolve, reject) {
                    fs.createReadStream(_this.location[0]).pipe(fs.createWriteStream(_this.location[1]).on('finish', resolve));
                    _this.bothFilesExist = true;
                }));
            }
            es6_promise_1.Promise.all(_this._promises).then(function () {
                request({
                    url: _this.url,
                    method: "GET",
                    jar: _this.jar
                }, function (err, response, body) {
                    body = _this._parseRule(body);
                    fs.writeFile(_this.location[0], body, function (err) {
                        if (err)
                            return console.log(err);
                        callback();
                    });
                });
            });
        };
        this.Compare = function (callback) {
            if (_this.bothFilesExist) {
                var newPageStr = _this._compareRule(fs.readFileSync(_this.location[0], "utf-8"));
                var oldPageStr = _this._compareRule(fs.readFileSync(_this.location[1], "utf-8"));
                var d = diff.diffWords(oldPageStr, newPageStr);
                if (d.length > 1) {
                    console.log(_this.name + " (" + _this.url + ") updated!");
                    _this._eventDictionary['pageUpdated'](_this, d);
                    for (var _i = 0; _i < d.length; _i++) {
                        var part = d[_i];
                        if (part.added || part.removed) {
                            console.log((part.added === true ? 'Added' : 'Removed') + " : " + part.value);
                        }
                    }
                    console.log("Time: " + new Date().toLocaleString());
                }
                _this._eventDictionary['compared']();
            }
            callback();
        };
        this.on = function (eventName, callback) {
            _this._eventDictionary[eventName] = callback;
        };
        this.url = url;
        this.name = name;
        this.dir = "./parseData/" + this.name;
        this.location = [(this.dir + "/new.html"),
            (this.dir + "/old.html")];
        //ensure default events
        this._eventDictionary['compared'] = function () { };
        this._eventDictionary['pageUpdated'] = function () { };
        return this;
    }
    return WebPage;
})();
exports.WebPage = WebPage;
