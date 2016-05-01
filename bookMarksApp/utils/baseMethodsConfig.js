var BaseMethod = function() {

}

var _getRequestHandler = function() {};
var _postRequest = function() {};
var _deleteRequestHandler = function() {};
var _putRequestHandler = function() {};


BaseMethod.prototype.get = _getRequestHandler;
BaseMethod.prototype.post = _postRequest;
BaseMethod.prototype.put = _deleteRequestHandler;
BaseMethod.prototype.delete = _putRequestHandler;

module.exports = BaseMethod;