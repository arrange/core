(function () {
    'use strict';
    angular
        .module('easywebapp')
        .controller('filemanagerCtrl',function($config, $state, Auth, $scope, $rootScope, toastr, $stateParams,$uibModalInstance,projectData,fileManagerConfig){
            $scope.close = function(){
                $uibModalInstance.close();
            };
            $scope.fileSelected = function(data) {
                $uibModalInstance.close(data);
            };
            $scope.models = {};
        });
})();