
var _express = require("express");
var _serverExpApp = _express();
var _env = process.env.NODE_ENV || 'dev';
var _config = require('./config/appConfig').dev;
var dbConnection = require('./config/dbConfig');
var routeConfig = require('./config/routeConfig');
var _bodyParser = require('body-parser');
_serverExpApp.use(_bodyParser.urlencoded({ extended: false }));
_serverExpApp.use(_bodyParser.json());
_serverExpApp.use(_express.static('bookMarkWebApp'));

_serverExpApp.listen(process.env.OPENSHIFT_NODEJS_PORT ||  8080 , process.env.OPENSHIFT_NODEJS_IP, function() {
    console.log("serverStarted at " + process.env.OPENSHIFT_NODEJS_PORT);
    var db = dbConnection.dbConfig(_config);
    routeConfig(_serverExpApp);
});


