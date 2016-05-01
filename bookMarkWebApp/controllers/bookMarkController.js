
var bookMarkController = function($scope, $state, bookMarkService) {
    var init = function() {
        $scope.vdo.folderID = $state.params.folderID
        _getFolderBookMarks($scope.vdo)
    };

    var _getFolderBookMarks = function(vdo) {
        bookMarkService.getFolderBookMarks(vdo);
    };

    var _deleteBookMark = function(vdo,bookMark) {
    	bookMarkService.deleteBookMark(vdo,bookMark)
    };

    var _addBookMark = function(vdo) {
    	bookMarkService.addBookMark(vdo);
    };

    var _moveBookMark = function(vdo,bookMark) {
        bookMarkService.moveBookMark(vdo,bookMark);
    }

    var _backToFolders = function() {
        bookMarkService.backToFolders();
    }

    $scope.vdo = {
        folderID: '',
        folderData: {},
        deleteBookMark: _deleteBookMark,
        addBookMark: _addBookMark,
        moveBookMark: _moveBookMark,
        getFolderBookMarks: _getFolderBookMarks,
        backToFolders:_backToFolders,
        regEx:'^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
    }

    init();

};



angular.module('pinitapp').controller('bookMarkController', ['$scope', '$state', 'bookMarkService', bookMarkController]);
