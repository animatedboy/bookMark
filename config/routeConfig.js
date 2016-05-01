var _initRequest = function(req, res, app) {
    //console.log(app);
    var _url = req.path,
        BaseUri = "../bookMarksApp/";
    var _fileUri = _url.split('/')[1];
    var _requireURI = BaseUri + _fileUri + '/RPL/' + _fileUri + 'RequestHandler';
    console.log('in request',_requireURI)
    /*try{*/
    var _processRequest = require(_requireURI);
    _processRequest.handleRequest(req, res, app);
    /*}catch (e){
    	 console.log('haiiii in catch')
    	res.status(500).send({error:e});
    }*/

};


var routeConfig = function(app) {
    app.use('/api', function(req, res) {
        _initRequest(req, res, app);
    });
};

module.exports = routeConfig;
