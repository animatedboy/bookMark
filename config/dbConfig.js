var MongoClient = require('mongodb').MongoClient;
var connectedDB = {
    dB: ''
};



var _dbConfig = function(appConfig) {
    console.log(appConfig.dbURL);

    MongoClient.connect(appConfig.dbURL, function(err, db) {
        if (err) {
            console.log("unable to connect")
        } else {
            connectedDB.dB = db;
            console.log("connectted successfully")
        }
    });
}

var getDB = function() {
    return connectedDB
}

var dbConfig = _dbConfig;
module.exports = {
    dbConfig: dbConfig,
    getDB: getDB
}
