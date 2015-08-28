(function() {
  'use strict';

  angular
    .module('easywebapp')        
    .controller('LoginCtrl',['$scope','Auth','$state','toastr',function($scope,Auth,$state,toastr){
            if( Auth.isLoggedIn() ) {
                $state.go('dashboard');
            }
          $scope.credentials = { subdomain : "qwe" };
          $scope.signIn = function() {
			Auth.login( $scope.credentials ).then(function(response){
                toastr.success('You are successfully login','Success');
                $state.go('dashboard');
			},function(data){
                if( data ) {
                    if (data.error) {
                        toastr.error(data.error);
                    }
                }
			});
		};
	}])
	.controller('dashboardCtrl',[ '$scope' , 'Auth' , '$rootScope' , '$state' , function( $scope , Auth , $rootScope , $state){
		$scope.User = $rootScope.User;
        $scope.getlogout = function()
        {
            Auth.removeUser(function(){
                $state.go('home');
            });
        };
	}]);
})();

