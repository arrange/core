(function() {
  'use strict';

  angular
    .module('easywebapp')
    .controller('AuthController',[ '$scope' , '$config' , 'toastr' , function( $scope , $config , toastr ){
          console.log("option");
          var vm = this;
          vm.signinurl = $config.url+"/#/"+'signin';
          vm.signupurl = $config.url+"/#/"+'signup';
    }])
    // Signin (Login Controller)
    .controller('SigninController',function(){
          console.log("signIn");
    })
    // Singup (Registration Form Controller)
    .controller('SignupController',['$scope', 'Organization', function( $scope, Organization ){
         console.log("signup...");
        $scope.organization = new Organization(); 
        $scope.signupForm = function()
        {
          $scope.organization.$save(function(data){
              toastr.success('Organization created successfully!','Success');
          },function(data){
            angular.forEach(data.data, function(value, index){
              toastr.error(value); 
            })
          })
        }

    }]);

   
})();
