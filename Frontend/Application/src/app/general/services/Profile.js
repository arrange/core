(function(){
     'use strict';
    angular
        .module('easywebapp')
        .service('Profile',function($q,$http,$config,Auth){
           this.save = function(user){
               var defer = $q.defer();
               $http.post($config.api + 'users/save', user ).success(function (data) {
                   defer.resolve(data);
                   Auth.setUser(data);
               }).error(function (data) {
                   defer.reject(data);
               });
               return defer.promise;
           };
           this.changePwd = function(user){
               var defer = $q.defer();
               $http.post($config.api + 'users/change-password', user ).success(function (data) {
                   defer.resolve(data);
               }).error(function (data) {
                   defer.reject(data);
               });
               return defer.promise;
           };
        });
})();