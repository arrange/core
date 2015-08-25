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
    .controller('SigninController',function(){
          console.log("signIn");
    })
    .controller('SignupController',function(){
         console.log("signup");
    });
})();
