(function() {
  'use strict';

  angular
    .module('easywebapp')        
    .controller('LoginCtrl',['$scope','Auth','$state','toastr','$location',function($scope,Auth,$state,toastr,$location){

          /*var host = $location.host();
          var subdomain = "";
          if (host.indexOf('.') < 0)
              subdomain = host.split('.')[0];
        */
          var subdomain = "qwe";

          $scope.credentials = { subdomain : subdomain };
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
            Auth.removeUser();
            $state.go('login');
        };
	}]);
})();

