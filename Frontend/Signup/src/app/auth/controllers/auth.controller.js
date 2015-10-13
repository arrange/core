(function() {
  'use strict';

  angular
    .module('easywebapp')
    .controller('AuthController',[ '$state' , '$scope' , '$config' ,  'GooglePlus', 'Authservice' , '$stateParams' , function( $state , $scope , $config , GooglePlus , Authservice , $stateParams){
          $scope.getLoginGoogle = function(){
              GooglePlus.login().then(function (authResult) {
                  console.log(authResult);
                  GooglePlus.getUser().then(function (user) {
                      if( !user.email ) {
                          var datam = {
                              'user_name' : user.name,
                              'google_sign_up' : true
                          };
                          return $state.go('Signup', datam );
                      }
                      var inputs = {
                          email : user.email,
                          google_sign_up : true
                      };
                      Authservice.isUserExist(inputs).then(function(data) {
                          console.log(user);
                           if( data.user )
                           {
                               var subdomain = data.user.organization.subdomain;
                               var token = data.user.token;
                               window.location = "http://" + subdomain + ".notrie.com?token="+token;
                           }
                           else{
                               var datam = {
                                   'user_name' : user.name,
                                   'email' : ( user.email ) ? user.email : '',
                                   'google_sign_up' : true
                               };
                               $state.go('Signup', datam );
                           }
                      },function(){
                          var datam = {
                              'user_name' : user.name,
                              'email' : ( user.email ) ? user.email : '',
                              'google_sign_up' : true
                          };
                          $state.go('Signup',datam);
                      });
                  });
              }, function (err) {
                  console.log(err);
              });
          };
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
    .controller('SignupController',['$scope', 'Organization', 'toastr', '$state' , function( $scope, Organization, toastr , $state ){
        $scope.organization = new Organization();
          $scope.showPwd = true;
          console.log($state.params);
          if( $state.params.user_name )
              $scope.organization.name = $state.params.user_name;
          if( $state.params.email ) {
              $scope.organization.email = $state.params.email;
          }
          if( $state.params.google_sign_up )
          {
              $scope.showPwd = false;
              $scope.organization.google_sign_up = $state.params.google_sign_up;
          }


        $scope.signupForm = function()
        {
              $scope.organization.$save(function(data){
                  toastr.success('Organization created successfully!','Success');
                  window.location = "http://" + data.subdomain + ".notrie.com?token="+data.users[0].token;
              },function(data){
                /*angular.forEach(data.data, function(value){
                  toastr.error(value);
                });*/
                  console.log(data);
              });
        };

    }])

})();
