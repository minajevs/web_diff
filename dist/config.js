"use strict";
var OrtusConfig = (function () {
    function OrtusConfig() {
    }
    OrtusConfig.USERNAME = '{USERNAME}';
    OrtusConfig.PASSWORD = '{PASSWORD}';
    OrtusConfig.LOGIN_URL = 'https://id2.rtu.lv/openam/UI/Login';
    OrtusConfig.ORTUS_URL = "https://ortus.rtu.lv";
    OrtusConfig.CHECK_STRING = "Iziet";
    return OrtusConfig;
}());
exports.OrtusConfig = OrtusConfig;
