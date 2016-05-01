var serRestApi = function($http, dialogService, $location) {
    var serRestApiRef = this;
    
    
    serRestApiRef.getApi = function(url, queryParams, successApiCallBack, failureApiCallBack) {
        return $http({
            method: 'GET',
            url: url,
            params: queryParams
        })
    };

    serRestApiRef.postApi = function(url, queryParams, reqBody, successApiCallBack, failureApiCallBack) {
        return $http({
            url: url,
            method: "POST",
            params: queryParams,
            data: reqBody
        });

        //return defered.promise;
    };

    serRestApiRef.putApi = function(url, queryParams, reqBody, successApiCallBack, failureApiCallBack) {
       return $http({
            method: 'PUT',
            url: url,
            params: queryParams,
            data: reqBody
        });
        //return defered.promise;
    };

    serRestApiRef.deleteApi = function(url, queryParams, reqBody, successApiCallBack, failureApiCallBack) {
        return $http({
            method: 'DELETE',
            url: url,
            params: queryParams,
            data: reqBody
        })
    }

}




angular.module('pinitapp').service('serRestApi', ['$http', 'dialogService','$q', serRestApi])
