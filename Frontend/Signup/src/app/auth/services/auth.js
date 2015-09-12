(function() {
'use strict';

angular.module('easywebapp')
	.service('Authservice', ['$rootScope', '$http', '$config', '$q', 
	function ($rootScope, $http, $config, $q ) {
		
		this.checkSubdomain = function (credentials) {
			//$log.debug(credentials);
			var defer = $q.defer();
			$http.get($config.api + 'valid-subdomain?subdomain='+credentials.subdomain).success(function (data) {
				defer.resolve(data);
			}).error(function (data) {
				defer.reject(data);
			});
			return defer.promise;
		};
        this.isUserExist = function(data){
            var defer = $q.defer();
            $http.post($config.api + 'users/is-exist' , data  ).success(function(response){
                defer.resolve(response);
            },function(data1){
                defer.reject(data1);
            });
            return defer.promise;
        };
	}]);		
})();