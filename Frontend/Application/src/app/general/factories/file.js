(function() {
    'use strict';

    angular.module('easywebapp')
        .service('File', ['$rootScope', '$http', '$config', '$q', '$log' ,
            function ($rootScope, $http, $config, $q , $log) {
                this.index = function (params) {
                    var defer = $q.defer();
                    $http.post($config.api + 'files/index', params).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data) {
                        defer.reject(data);
                    });
                    return defer.promise;
                };
                this.saveSnapShot = function (params) {
                    var defer = $q.defer();
                    $http.post($config.api + 'preview/save-snapshot', params).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data) {
                        defer.reject(data);
                    });
                    return defer.promise;
                };
            }]);
})();
