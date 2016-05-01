var bookMarksDAL = require('../DAL/bookMarksDALHandler');
var actionResult = require('../../utils/actionResultHandler');
var utils = require('../../utils/utility');

var productBussinessHandler = function() {

    var _getBookMarksFolderHandler = function(rplCallBack) {

        bookMarksDAL.getBookMarksFolder(function(err, docs) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(docs);
            }
            rplCallBack(result);
        });
    };

    var _setFolderObj = function(rplCallBack, body) {
        var folderObj = {
            folderID: utils.generateUUID(),
            folderName: body.folderName,
            createdDate: utils.getCreatedDate(),
            bookMarks: []
        };

        bookMarksDAL.createFolder(function(err, data) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(data);
            }
            rplCallBack(result);
        }, folderObj)

    };

    var _setBookMarkObj = function(rplCallBack, body, folderID) {

        var bookMarkObj = {
            bookMarkID: utils.generateUUID(),
            bookMarkName: body.bookMarkName,
            bookMarkUrl: body.bookMarkUrl
        };

        bookMarksDAL.createBookMark(function(err, data) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                 //rplCallBack(data.result);
                if (data.result.n) {
                     //rplCallBack(data.result);
                    _getBookMarkFolder(rplCallBack, folderID);
                } else {
                    var err = {
                        errorData: 'Unable to insert bookMark'
                    };
                    result = new actionResult.failureResultHandler().setStatus(err);
                    rplCallBack(result);
                }
            }
            //rplCallBack(result);
        }, bookMarkObj, folderID)

    }

    var _createFolder = function(rplCallBack, body) {
        if (body.folderName) {
            _setFolderObj(rplCallBack, body)
        } else {
            var err = {
                errorData: 'Folder Name is Mandatory'
            };
            result = new actionResult.failureResultHandler().setStatus(err);
            rplCallBack(result);
        }
    }

    var _createBookMark = function(rplCallBack, body, folderID) {
        if (body.bookMarkName && body.bookMarkUrl) {
            _setBookMarkObj(rplCallBack, body, folderID);
        } else {
            var err = {
                errorData: 'Mandatory feilds are missing'
            };
            result = new actionResult.failureResultHandler().setStatus(err);
            rplCallBack(result);
        }
    }

    var _getBookMarkFolder = function(rplCallBack, folderID) {
        bookMarksDAL.getBookMarkFolder(function(err, data) {
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                result = new actionResult.successResultHandler().setStatus(data);
            }
            rplCallBack(result);
        }, folderID)
    };

    var _setDeleteFolderObj = function(rplCallBack, folderID) {
        var data = {
            folderID: folderID
        };

        bookMarksDAL.deleteFolder(function(err, data) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                if (data.result.n) {
                    _getBookMarksFolderHandler(rplCallBack)
                } else {
                    var err = {
                        errorData: 'Unable to delete folder'
                    };
                    result = new actionResult.failureResultHandler().setStatus(err);
                    rplCallBack(result);
                }

            }

        }, data);
    };

    var _deleteFolder = function(rplCallBack, folderID) {
        if (folderID) {
            _setDeleteFolderObj(rplCallBack, folderID)
        } else {
            var err = {
                errorData: 'Unable to delete folder'
            };
            result = new actionResult.failureResultHandler().setStatus(err);
            rplCallBack(result);
        }
        console.log('haiiii')
    };

    var _setDeleteBookMarkObj = function(rplCallBack, folderID, bookMarkID) {
        var data = {
            folderID: folderID,
            bookMarkID: bookMarkID
        };

        bookMarksDAL.deleteBookMark(function(err, data) {
            var result = {};
            if (err) {
                result = new actionResult.failureResultHandler().setStatus(err);
            } else {
                if (data.result.n) {
                    _getBookMarkFolder(rplCallBack, folderID);
                } else {
                    var err = {
                        errorData: 'Unable to delete bookMark'
                    };
                    result = new actionResult.failureResultHandler().setStatus(err);
                    rplCallBack(result);
                }
            }

        }, data);
    }

    var _deleteBookMark = function(rplCallBack, folderID, bookMarkID) {
        if (folderID && bookMarkID) {
            _setDeleteBookMarkObj(rplCallBack, folderID, bookMarkID)
        } else {
            var err = {
                errorData: 'Unable to delete bookMark'
            };
            result = new actionResult.failureResultHandler().setStatus(err);
            rplCallBack(result);
        }

        console.log('haiiii')
    }

    var _moveBookMark = function(rplCallBack, reqBody) {
        var result= {}
        if (reqBody.fromFolder && reqBody.toFolder && reqBody.bookMark && reqBody.bookMark.bookMarkID) {
             console.log('into moveBookMark bussiness')
            bookMarksDAL.moveBooKMark(function(err, data) {
                if (err) {
                    result = new actionResult.failureResultHandler().setStatus(err);
                } else {
                    if (data.result.n) {
                        _getBookMarkFolder(rplCallBack, reqBody.fromFolder);
                    } else {
                        var err = {
                            errorData: 'Unable to move bookMark'
                        };
                        result = new actionResult.failureResultHandler().setStatus(err);
                        rplCallBack(result);
                    }
                }
            }, reqBody)
        } else {
            var err = {
                errorData: 'Unable to move bookMark'
            };
            result = new actionResult.failureResultHandler().setStatus(err);
            rplCallBack(result);
        }


    }

    this.getBookMarkFolders = _getBookMarksFolderHandler;
    this.getBookMarkFolder = _getBookMarkFolder;
    this.createBookMark = _createBookMark;
    this.createFolder = _createFolder;
    this.deleteFolder = _deleteFolder;
    this.deleteBookMark = _deleteBookMark;
    this.moveBookMark = _moveBookMark;


    this.postBILHandler = function() {

    };
};







module.exports = new productBussinessHandler();
