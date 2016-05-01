var dialogService = function($modal) {
    this.openDialog = function(config) {
        $modal.open(config);
    };
    var showDialog = function(type, title, message, templateUrl, controller, windowClass) {
        var alertDialog = $modal.open({
            templateUrl: templateUrl,
            windowClass: windowClass ? windowClass : 'alert-box',
            controller: controller,
            backdrop: 'static',
            resolve: {
                data: function() {
                    return {
                        message: message,
                        title: title,
                        type: type,

                    };
                }
            }
        });
        return alertDialog;
    };
    var handleCloseEscKeyEvent = function($uibModalInstance, $scope) {
        var aDocument = angular.element(document);
        aDocument.on('keypress', function(e) {
            if (e.which == 13) {
                $uibModalInstance.dismiss();
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $scope.$on('$destroy', function() {
            aDocument.off('keypress');
        });
        $scope.close = function() {
            $uibModalInstance.close();
        };
    };
    this.showAlert = function(type, title, message, isHtml, windowClass, info, isNewMsgPattern) {
        var alertController = ['$scope', '$uibModalInstance', 'data', '$sce',
            function($scope, $uibModalInstance, data, $sce) {
                $scope.title = data.title;
                if (isHtml) {
                    $scope.message = $sce.trustAsHtml(message);
                } else {
                    $scope.message = data.message;
                }
                $scope.type = data.type;
                $scope.isHtml = isHtml;
                $scope.info = info;
                $scope.isNewMsgPattern = !!isNewMsgPattern;
                handleCloseEscKeyEvent($uibModalInstance, $scope);
            }
        ];
        return showDialog(type, title, message, '../partials/alert.html', alertController, windowClass);
    };
    this.confirm = function(type, title, message, IsYesNo, isHtml) {
        var confirmController = ['$scope', '$uibModalInstance', 'data', '$sce', function($scope, $uibModalInstance, data, $sce) {
            $scope.title = data.title;
            if (isHtml) {
                $scope.message = $sce.trustAsHtml(message);
            } else {
                $scope.message = data.message;
            }
            $scope.isHtml = isHtml;
            $scope.type = data.type;
            $scope.IsYesNo = (IsYesNo);
            $scope.ok = function() {
                $uibModalInstance.close(true);
            };
            handleCloseEscKeyEvent($uibModalInstance, $scope);
        }];
        return showDialog(type, title, message, '../partials/confirm.html', confirmController);
    };

    

    this.showCustomDialog = function(url, controller, resolve, callback, size, windowClass, escRestricted) {
        if (url) {
            var dialog = $modal.open({
                templateUrl: url,
                controller: controller,
                backdrop: 'static',
                size: size ? size : 'lg',
                resolve: resolve,
                windowClass: windowClass,
                keyboard: !escRestricted
            });
            dialog.result.then(
                function(data) {
                    callback(data);
                },
                function(data) {
                    callback(data);
                });
            return dialog;
        }
    };
};

angular.module('pinitapp').service('dialogService', [ '$uibModal', dialogService]);
