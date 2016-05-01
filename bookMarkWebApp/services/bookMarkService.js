var bookMarkService = function(dialogService, serRestApi, $state) {
    var bookMarkServiceRef = this;

     var defaultErrorHandler = function(response) {
        return dialogService.showAlert('error', 'error', response.data.errorData, '', '', false);
    };

    var addFolderController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
        $scope.vdo = data.vdo;
        $scope.vdo.folderName = '';

        $scope.ok = function(vdo) {
            if ($scope.addFolderName.$valid) {
                $uibModalInstance.close(vdo)
            }
        };

        $scope.close = function() {
            $uibModalInstance.dismiss()
        }
    }];


    var addFolderCallBack = function(data) {
        var reqBody = {
            folderName: data.folderName
        }
        serRestApi.postApi('/api/bookMarks', '', reqBody).then(function(response) {
            dialogService.showAlert('success', 'success', 'SuccessFully Added Folder', '', '', false);
            data.folderDatas.push(response.data.data[0]);
        },defaultErrorHandler)
    };

    bookMarkServiceRef.addFolder = function(vdo) {
        dialogService.showCustomDialog('../partials/addFolder.html', addFolderController, {
            data: {
                vdo: vdo
            }
        }, addFolderCallBack, 'sm');

    };

    bookMarkServiceRef.getFolders = function(vdo) {
        serRestApi.getApi('/api/bookMarks', '').then(function(response) {
            vdo.folderDatas = response.data.data;
        },defaultErrorHandler)
    };

    bookMarkServiceRef.getFolderData = function(folderID) {
        var params = {
            folderID: folderID
        };
        $state.go('bookMark', params);
    }

    bookMarkServiceRef.getFolderBookMarks = function(vdo) {
        var url = '/api/bookMarks/' + vdo.folderID;
        serRestApi.getApi(url, '').then(function(response) {
            vdo.folderData = response.data.data[0];
        },defaultErrorHandler);
    };

    var addBookMarkController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
        $scope.vdo = data.vdo;
        $scope.vdo.bookMarkName = '';
        $scope.vdo.bookMarkUrl = '';

        $scope.ok = function(vdo) {
            if ($scope.addBookMarkForm.$valid) {
                $uibModalInstance.close(vdo)
            }
        };

        $scope.close = function() {
            $uibModalInstance.dismiss()
        }
    }];

    var addBookMarkCallBack = function(vdo) {
        var reqBody = {
                bookMarkName: vdo.bookMarkName,
                bookMarkUrl: vdo.bookMarkUrl
            },
            reqUrl = '/api/bookMarks/' + vdo.folderID;

        serRestApi.postApi(reqUrl, '', reqBody).then(function(response) {
            dialogService.showAlert('success', 'success', 'SuccessFully Added Bookmark', '', '', false);
            vdo.folderData = response.data.data[0];
        },defaultErrorHandler)
    };

    bookMarkServiceRef.addBookMark = function(vdo) {
        dialogService.showCustomDialog('../partials/addBookMark.html', addBookMarkController, {
            data: {
                vdo: vdo
            }
        }, addBookMarkCallBack, 'sm');
    }

    bookMarkServiceRef.deleteBookMark = function(vdo, bookMark) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this Bookmark?', true).result.then(function(value) {
            if (value) {
                var reqUrl = '/api/bookMarks/' + vdo.folderID + '/' + bookMark.bookMarkID;

                serRestApi.deleteApi(reqUrl).then(function(response) {
                    dialogService.showAlert('success', 'success', 'SuccessFully Deleted Bookmark', '', '', false);
                    vdo.folderData = response.data.data[0];
                },defaultErrorHandler);
            }

        });

    }


    bookMarkServiceRef.deleteFolder = function(vdo, folder) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this folder?', true).result.then(function(value) {
            if (value) {
                var reqUrl = '/api/bookMarks/' + folder.folderID;
                serRestApi.deleteApi(reqUrl).then(function(response) {
                     dialogService.showAlert('success', 'success', 'SuccessFully Deleted Folder', '', '', false);
                    vdo.folderDatas = response.data.data;
                },defaultErrorHandler);
            }

        });
    };

    var moveBookMarkController = ['$scope', 'data', '$uibModalInstance', 'bookMarkService', function($scope, data, $uibModalInstance, bookMarkService) {
        $scope.vdo = data.vdo;
        $scope.vdo.reqObj = {};
        $scope.vdo.reqObj.bookMark = data.bookMark;
        $scope.vdo.reqObj.fromFolder = $scope.vdo.folderID

        var init = function() {
            bookMarkService.getFolders($scope.vdo);
        }

        $scope.ok = function(vdo) {
            if ($scope.moveFolderForm.$valid) {
                $uibModalInstance.close(vdo);
            }
        };

        $scope.close = function() {
            $uibModalInstance.dismiss();
        }

        init();
    }];

    var moveBookMarkCallBack = function(vdo) {
        var reqUrl = '/api/bookMarks/moveBookMark';
        serRestApi.putApi(reqUrl, '', vdo.reqObj).then(function(response) {
            dialogService.showAlert('success', 'success', 'SuccessFully moved bookmark', '', '', false);
            vdo.folderData = response.data.data[0];
        },defaultErrorHandler);
    };


    bookMarkServiceRef.moveBookMark = function(vdo, bookMark) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to move this Bookmark?', true).result.then(function(value) {
            if (value) {
                dialogService.showCustomDialog('../partials/moveBookMark.html', moveBookMarkController, {
                    data: {
                        vdo: vdo,
                        bookMark: bookMark
                    }
                }, moveBookMarkCallBack, 'sm');
            }

        });

    };

    bookMarkServiceRef.backToFolders = function() {
        $state.go('folders');
    }

};




angular.module('pinitapp').service('bookMarkService', ['dialogService', 'serRestApi', '$state', bookMarkService])
