(function() {
  'use strict';

  angular
    .module('easywebapp')
    .run( [ '$rootScope' , '$config' , 'Auth' , 'toastr' , '$state' , '$cookies' , '$http' , '$location' ,

		function ( $rootScope , $config , Auth , toastr , $state , $cookies , $http , $location ) {

			$rootScope.$state = $state;
			$rootScope.Auth = Auth;
			$rootScope.config = $config;

            var host = $location.host();
            var subdomain = "";
            if (host.indexOf('.') > 0)
                subdomain = host.split('.')[0];
            
            console.log(subdomain);
            
            Auth.checkSubdomain( subdomain ). then(function(successResp){},function(errorResp){
               window.location = "http://notrie.com";
            });


            if( Auth.isLoggedIn() ) {
                $state.go('dashboard');
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
                } );
		} ] );

  /** @ngInject */
  /*function runBlock($log) {

    $log.debug('runBlock end');
  }*/
})();
