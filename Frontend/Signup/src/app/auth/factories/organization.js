(function() {

'use strict';
angular.module('easywebapp')
.factory('Organization',['$resource','$config',
	function($resource,$config){
		return $resource( $config.api + 'register/:id' , { id : '@id' } , {
			update : {
				method : 'PUT' // this method issues a PUT request
			} ,
			query : {
				method : 'GET'
			}
		} );
	}]);

})();