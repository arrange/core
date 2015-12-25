(function() {
  'use strict';

  angular
    .module('easywebapp')        
    .controller('LoginCtrl',['$scope','$window','Auth','$state','toastr','$location','$config',function($scope,$window,Auth,$state,toastr,$location,$config){
        var googleLoginWindow;
          var host = $location.host();
          var subdomain = "";
          if (host.indexOf('.') > 0)
              subdomain = host.split('.')[0];
          /*var subdomain = "demo";*/
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
          window.addEventListener("message", function(ev) {
              console.log(ev.data);
              if (ev.data) {
                  var user = JSON.parse(ev.data);
                  if (!user.email) {
                      toastr.error("Sorry , unable to extract email_id from your google account");
                  }
                  var inputs = {
                      subdomain: subdomain,
                      email: user.email,
                      google_sign_up: true
                  };
                  Auth.isUserExist(inputs).then(function (data) {
                      if (data.user) {
                          Auth.setUser(data.user);
                          $state.go('dashboard');
                      }
                      else {
                          toastr.error("Sorry , email_id " + user.email + " is not registered");
                      }
                  }, function () {
                      toastr.error("Sorry , email_id " + user.email + " is not registered");
                  });
                  //ev.source.close();
              }
          });

          $scope.getLoginGoogle = function(){
              googleLoginWindow = window.open($config.url+"/#/google_sign_up?url="+window.location.href, "_blank", "height=500,width=500");
          };
	}]);
})();

