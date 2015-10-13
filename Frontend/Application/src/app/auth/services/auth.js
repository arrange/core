(function() {
  'use strict';

angular.module('easywebapp')
	.service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', '$config', '$q', '$log' ,
	function ($rootScope, $cookie, $cookieStore, $http, $config, $q , $log) {
		var setUser = function (User) {
            $cookieStore.put('user',JSON.stringify(User));
			$rootScope.User = User;
            $http.defaults.headers.common['Token'] = User.token;
            //$log.debug($http.defaults.headers);
		};

        var getValue = function (key){
            if($cookieStore.get('user')) {
                var user = JSON.parse($cookieStore.get('user'));
                return user[key];
            }
            return false;
        };

        var getUser = function (){
            if($cookieStore.get('user')) {
                return JSON.parse($cookieStore.get('user'));
            }
            return false;
        };

        this.getValue = getValue;
        this.setUser = setUser;
        this.getUser = getUser;

		this.login = function (credentials) {
			var defer = $q.defer();
			$http.post($config.api + 'auth', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
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

        this.checkSubdomain = function (subdomain) {
            //$log.debug(credentials);
            var defer = $q.defer();
            $http.get($config.api + 'valid-subdomain?subdomain='+subdomain).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        };
	}]);
})();
