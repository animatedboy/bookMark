var bookMarkFolderController = function($scope,bookMarkService) {

    var init = function() {
        _getFolders($scope.vdo);
    };

    var _addFolder = function(vdo) {
        bookMarkService.addFolder(vdo);
    };

    var _getFolders = function(vdo) {
        bookMarkService.getFolders(vdo);
    };

    var _deleteFolder = function(vdo,folder) {
        bookMarkService.deleteFolder(vdo,folder);
    };

    var _getFolderData = function(vdo) {
        bookMarkService.getFolderData(vdo);
    }


    $scope.vdo = {
        addFolder: _addFolder,
        getFolders: _getFolders,
        deleteFolder: _deleteFolder,
        folderDatas: [],
        getFolderData: _getFolderData
    }

    init();

};



angular.module('pinitapp').controller('bookMarkFolderController', ['$scope','bookMarkService', bookMarkFolderController]);
