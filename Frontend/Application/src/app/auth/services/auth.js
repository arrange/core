(function() {
  'use strict';

angular.module('easywebapp')
	.service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', '$config', '$q', '$log' ,
	function ($rootScope, $cookie, $cookieStore, $http, $config, $q , $log) {
		var setUser = function (User) {
            angular.forEach(User,function(value,index){
                $cookieStore.put(index,value);
            });

			$rootScope.User = User;
			$http.defaults.headers.common.Token = User.token;
		};

        var getValue = function (key){
            return  $cookieStore.get(key);
        };

        this.getValue = getValue;

		this.login = function (credentials) {
			var defer = $q.defer();
			$http.post($config.api + 'auth', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
                $log.debug($cookie);
			}).error(function (data) {
				defer.reject(data);
			});
			return defer.promise;
		};

        this.getUpdatedUser = function(){
            var defer = $q.defer();
            getValue('token',function(token){
                $http.get($config.api + 'user/', token ).success(function (data) {
                    defer.resolve(data);
                    setUser(data);
                }).error(function (data) {
                    defer.reject(data);
                });
            });
        };

		this.isLoggedIn = function () {
            if (getValue('id') && getValue('token')) {
                return true;
            }
			return false;
		};

		this.getToken = function () {
			if (getValue('token')) {
                return $cookie.token;
            }
			return false;
		};
		
		this.removeUser = function () {
            $cookieStore.remove('user');
			$rootScope.User = false;
		};

        this.setUserByParams = function(data){
           setUser(data);
        };
	}]);
})();
