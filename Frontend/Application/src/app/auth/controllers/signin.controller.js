(function() {
  'use strict';

  angular
    .module('easywebapp')        
    .controller('LoginCtrl',['$scope','Auth','$state',function($scope,Auth,$state){
		$scope.credentials.subdomain = "niyati"; 
		$scope.login = function() {
			Auth.login($scope.credentials ).then(function(data){
				toastr.success('You are successfully login','Success');				
			},function(data){				
				console.log(data);
			})
		}
	}])	
})();

