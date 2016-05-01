var BaseMethod = require('../../utils/baseMethodsConfig');
var BaseResponseMethod = require('../../utils/baseResponseHandler');
var bookMarksRequestBIL = require('../BIL/bookMarksBussinessHandler');

var productRequestHandler = function() {
    _requestHandlers = new BaseMethod();
    _responseHandlers = new BaseResponseMethod();

    var productResponseHandler = function(req, res) {
        return function(result) {
            _responseHandlers[result.status](req, res, result);
        }
    };

    _requestHandlers.get = function(req, res) {
        var urlSplit = req.path.split('/');
        urlSplit.shift();
        if (urlSplit.length === 1) {
            bookMarksRequestBIL.getBookMarkFolders(productResponseHandler(req, res));
        } else if (urlSplit.length === 2) {
            bookMarksRequestBIL.getBookMarkFolder(productResponseHandler(req, res), urlSplit[1]);
        } else if (urlSplit.length === 3){
            bookMarksRequestBIL.getBookMark(productResponseHandler(req, res), urlSplit);
        }
        else {
            _responseHandlers.notFound(req, res);
        }
    };

    _requestHandlers.post = function(req, res) {
        var urlSplit = req.path.split('/');
        urlSplit.shift();
        if (urlSplit.length === 1) {
            bookMarksRequestBIL.createFolder(productResponseHandler(req, res), req.body);
        } else if (urlSplit.length === 2) {
            bookMarksRequestBIL.createBookMark(productResponseHandler(req, res), req.body, urlSplit[1])
        } else {
            _responseHandlers.notFound(req, res);
        }
    };


    _requestHandlers.delete = function(req,res) {
        var urlSplit = req.path.split('/');
        urlSplit.shift();
        if (urlSplit.length === 2) {
            bookMarksRequestBIL.deleteFolder(productResponseHandler(req, res), urlSplit[1]);
        } else if (urlSplit.length === 3) {
            bookMarksRequestBIL.deleteBookMark(productResponseHandler(req, res), urlSplit[1], urlSplit[2])
        } else {
            _responseHandlers.notFound(req, res);
        }
    }

    _requestHandlers.put = function(req,res) {
        var urlSplit = req.path.split('/');
        urlSplit.shift();
        if(urlSplit.length === 2 && urlSplit[1] === 'moveBookMark'){
            console.log('into moveBookMark')
            bookMarksRequestBIL.moveBookMark(productResponseHandler(req, res),req.body);
        } else {
            _responseHandlers.notFound(req, res);
        }    
    }

    this.handleRequest = function(req, res) {
        var requestMethod = req.method.toLowerCase();
        //console.log('reqme',requestMethod)
        _requestHandlers[requestMethod](req, res);
    }
};







module.exports = new productRequestHandler();
