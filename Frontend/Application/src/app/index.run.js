(function() {
  'use strict';

  angular
    .module('easywebapp')
    .run( [ '$rootScope' , '$config' , 'Auth' , 'toastr' , '$state' , '$cookies' , '$http' , '$location' , 'Stripe' ,

		function ( $rootScope , $config , Auth , toastr , $state , $cookies , $http , $location , Stripe) {

			$rootScope.$state = $state;
			$rootScope.Auth = Auth;
			$rootScope.config = $config;
            var host = $location.host();
            var subdomain = "";
            if (host.indexOf('.') > 0)
                subdomain = host.split('.')[0];
            /*var subdomain = "qwe1";*/
            
            Auth.checkSubdomain( subdomain ). then(function(successResp){},function(errorResp){
               window.location = "http://notrie.com";
            });

            $rootScope.getlogout = function()
            {
                Auth.removeUser();
                $state.go('login');
            };

            if( Auth.isLoggedIn() ) {
                $state.go('dashboard');
                $http.defaults.headers.common.Token = Auth.getValue('token');
                $http.get($config.api + 'user/'+ Auth.getValue('token') ).then(function(response){
                    Auth.setUser(response.data);
                    if( Stripe.expiredPackage(response.data) ) {
                        $state.go('upgradePlan');
                    }
                    $rootScope.$broadcast('userInitialized', { message: "hello" });

                    $rootScope.goHome = function(){
                        $state.go('dashboard');
                    };
                    $rootScope.isExpired = function(){
                        return Stripe.expiredPackage(response.data);
                    };
                    $rootScope.isExpiredTrial = function(){
                        return Stripe.expiredPackageTrial(response.data);
                    };
                    $rootScope.isExpiredPlan = function(){
                        return Stripe.expiredPackagePlan(response.data);
                    };
                });
            }

            var url = window.location.href;
            var arr = url.split('?');
            if( arr.length > 1 )
            {
                var tokens = arr[1].split('=');
                if( tokens.length > 1 )
                {
                    if( tokens[0] == "token" )
                    {
                        $http.get($config.api + 'user/'+ tokens[1] ).then(function(response){
                            Auth.setUser(response.data);
                            window.location = arr[0];
                        });
                    }
                }
            }

            $rootScope.$on( '$stateChangeStart' ,

                function ( event , toState , toParams , fromState , fromParams ) {

                    var normalRoutes = [ 'login' , 'forgotpass' , 'reset-link' ];

                    var restrictedRoutes = [];

                    if ( ! Auth.isLoggedIn() && $.inArray( toState.name , normalRoutes ) == - 1 ) {
                        event.preventDefault();
                        $state.transitionTo( 'login' );
                    }

                    if( Auth.isLoggedIn() && toState.name == 'login' )
                    {
                        event.preventDefault();
                        $state.transitionTo('dashboard');
                    }

                    if ( Auth.isLoggedIn() && Stripe.expiredPackage(Auth.getUser()) && toState.name ) {
                        if( toState.name != "upgradePlan" ) {
                            event.preventDefault();
                            $state.transitionTo('upgradePlan');
                        }
                    }
                } );

            $rootScope.editProfile = function(){
                $state.go('profile');
            };

            $rootScope.upgradePlan = function(){
                $state.go('upgradePlan');
            };
		} ] );

  /** @ngInject */
  /*function runBlock($log) {

    $log.debug('runBlock end');
  }*/
})();
