(function() {
  'use strict';

  angular
    .module('easywebapp')
    .run( [ '$rootScope' , '$config' , 'Auth' , 'toastr' , '$state' , '$cookies' , '$http' ,

		function ( $rootScope , $config , Auth , toastr , $state , $cookies , $http ) {

			$rootScope.$state = $state;
			$rootScope.Auth = Auth;
			$rootScope.config = $config;


		} ] );

  /** @ngInject */
  /*function runBlock($log) {

    $log.debug('runBlock end');
  }*/
})();
