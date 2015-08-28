(function() {
  'use strict';

angular.module('easywebapp')
	.service('Auth', ['$rootScope', '$cookies', '$cookieStore', '$http', 'config', '$q',
	function ($rootScope, $cookie, $cookieStore, $http, config, $q) {
		var setUser = function (User) {
			angular.forEach(User, function (val, index) {
				$cookie[index] = val;
			})
			$rootScope.User = User;
			$http.defaults.headers.common.Token = User.token;
		}

		this.renewUser = function () {
			$rootScope.User = {};
			angular.forEach($cookie, function (value, key) {
				$rootScope.User[key] = value;
			});
		}

		this.setUser = setUser;
		this.removeToken = function () {
			delete $http.defaults.headers.common['token'];
		}
		this.setToken = function () {
			$http.defaults.headers.common.Token = $cookies.token;
		}
		this.login = function (credentials) {
			var defer = $q.defer();
			$http.post(config.api + 'auth', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
			}).error(function (data) {
				defer.reject(data);
			})
			return defer.promise;
		}

		this.isLoggedIn = function () {
			if ($cookie.id && $cookie.token)
				return true;

			return false;
		}

		this.getCurrentUserId = function () {
			if ($cookie.id)
				return $cookie.id;

			return false;
		}

		this.getCurrentUserCompanyId = function () {
			if ($cookie.company_id)
				return $cookie.company_id;
			else if ($cookie.company_email)
				return $cookie.id;

			return false;
		}

		this.getToken = function () {
			if ($cookie.token)
				return $cookie.token;

			return false;
		}

		this.isAdmin = function () {
			if ($cookie.company_email)
				return true;

			return false;
		}


		this.removeUser = function () {
			angular.forEach($cookie, function (value, key) {
				$cookieStore.remove(key);
			});
			$rootScope.User = false;
		}
	}]);
