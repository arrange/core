(function() {
    'use strict';

    angular.module('easywebapp')
        .service('Preview', ['$rootScope', '$http', '$config', '$q', '$log' ,
            function ($rootScope, $http, $config, $q , $log) {
                this.getpreview = function (filename) {
                    var defer = $q.defer();
                    $http.post($config.api + 'preview', filename).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data) {
                        defer.reject(data);
                    });
                    return defer.promise;
                };
            }]);
})();
