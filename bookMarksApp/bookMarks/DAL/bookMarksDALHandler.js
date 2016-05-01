var dB = require('../../../config/dbConfig').getDB().dB;

var productDALHandler = function() {

    var _getBookMarksFolder = function(callBack) {
        var products = dB.collection('bookMarks').find({}, {
            folderID: 1,
            folderName: 1,
            createdDate: 1,
            _id: -1
        });
        products.toArray(function(err, docs) {
            callBack(err, docs);
        });
    };

    var _getBookMarkFolder = function(callBack, folderID) {
        console.log(folderID)
        var products = dB.collection('bookMarks').find({
            folderID: folderID
        });
        products.toArray(function(err, docs) {
            console.log(docs);
            callBack(err, docs);
        });
    }

    var _postFolder = function(callBack, data) {
        dB.collection('bookMarks').insert(data, function(err, data) {
            callBack(err, data.ops);
        });

    };

    var _updateFolder = function(callBack, updateData, query) {
        var query = {
            folderID: folderID
        };
        var updateQuery = {
            $set: {
                'folderName': updateData.folderName
            }
        };
        dB.collection('bookMarks').update(query, updateData, function(err, data) {
            callBack(err, data.ops);
        });
    }

    var _createBookMark = function(callBack, bookMarkObj, folderID) {
        var query = {
            folderID: folderID
        };
        var updateQuery = {
            $addToSet: {
                bookMarks: bookMarkObj
            }
        }
        dB.collection('bookMarks').update(query, updateQuery, function(err, data) {
            callBack(err, data);
        });
    }

    var _updateBookMark = function(data) {
        var query = {
            'folderID': data.folderID,
            'bookMarks.bookMarkID': data.bookMarkID
        };

        var updateQuery = {
            $set: {
                'bookMarks.$': bookMarkObj
            }
        };

        dB.collection('bookMarks').update(query, updateData, function(err, data) {
            callBack(err, data);
        });
    }


    this.getBookMarksFolder = function(callBack, folderID) {
        if (dB) {
            _getBookMarksFolder(callBack, folderID);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    };

    this.createBookMark = function(callBack, data, folderID) {
        if (dB) {
            _createBookMark(callBack, data, folderID);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    }

    this.createFolder = function(callBack, data) {
        if (dB) {
            _postFolder(callBack, data);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    };

    var _deleteFolder = function(callBack, data) {
        var query = {
            'folderID': data.folderID
        }

        dB.collection('bookMarks').remove(query, function(err, data) {
            callBack(err, data);
        });
    };


    var _deleteBookMark = function(callBack, data) {
        var query = {
            folderID: data.folderID
        };
        var updateQuery = {
            $pull: {
                'bookMarks': {
                    'bookMarkID': data.bookMarkID
                }
            }
        };

        console.log(updateQuery);

        dB.collection('bookMarks').update(query, updateQuery, function(err, data) {
            callBack(err, data);
        });
    };


    var _moveBooKMark = function(callBack, queryObj) {
        console.log('into moveBookMark DAL',queryObj)
        _createBookMark(function(err, data) {
            if (err) {
                callBack(err, '');
            } else {
                _deleteBookMark(function(err, data) {
                    if (err) {
                        callBack(err, '');
                    } else {
                        callBack(err, data)
                    }
                }, {
                    folderID: queryObj.fromFolder,
                    bookMarkID: queryObj.bookMark.bookMarkID
                })
            }
        }, queryObj.bookMark, queryObj.toFolder)
    }





    this.deleteFolder = function(callBack, data) {
        if (dB) {
            _deleteFolder(callBack, data);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    };

    this.deleteBookMark = function(callBack, data) {
        if (dB) {

            _deleteBookMark(callBack, data);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    };

    this.getBookMarkFolder = function(callBack, folderID) {
        if (dB) {
            _getBookMarkFolder(callBack, folderID);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    }

    this.moveBooKMark = function(callBack, queryObj) {
        if (dB) {
            _moveBooKMark(callBack, queryObj);
        } else {
            callBack({
                errorData: 'Unable to Connect DB'
            }, '');
        }
    }





};







module.exports = new productDALHandler();
