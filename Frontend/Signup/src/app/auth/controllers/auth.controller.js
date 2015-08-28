(function() {
  'use strict';

  angular
    .module('easywebapp')
    .controller('AuthController',[ '$scope' , '$config' , function( $scope , $config ){
          //console.log("option");
          var vm = this;
          
    }])
    // Signin (Login Controller)
    .controller('SigninController',['$scope', 'Authservice', 'toastr', '$config' , function( $scope, Authservice, toastr, $config ){
        //console.log("signIn");

        $scope.signinForm = function() {
          //var credentials = {'subdomain':$scope.subdomain};
          $scope.credentials = {subdomain:$scope.subdomain};
          // console.log($scope.credentials);
          Authservice.checkSubdomain($scope.credentials).then(function() {
            window.location = 'http://' + $scope.subdomain + '.' + $config.domain;
            toastr.success('Valid Domain....','Success');
          },function(data){    
              toastr.error(data.error); 
            });
        };
    }])

    // Singup (Registration Form Controller)
    .controller('SignupController',['$scope', 'Organization', 'toastr', function( $scope, Organization, toastr ){
        $scope.organization = new Organization(); 
        $scope.signupForm = function()
        {
          $scope.organization.$save(function(){
              toastr.success('Organization created successfully!','Success');
          },function(data){
            angular.forEach(data.data, function(value){
              toastr.error(value); 
            });
          });
        };

    }]);

   
})();
