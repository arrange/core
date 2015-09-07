(function() {
    'use strict';

    angular
        .module('easywebapp')
        .controller('dashboardCtrl',[ '$scope' , '$rootScope' , '$state' , function( $scope , $rootScope , $state ){

         $scope.User = $rootScope.User;
         $scope.addProject = function(){
             $state.go('add-project');
         }

    }]);
})();
