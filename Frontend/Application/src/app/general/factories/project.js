(function () {
    'use strict';

    angular.module('easywebapp')
        .factory('Project', ['$resource', '$config', function ($resource, $config) {
            return $resource( $config.api + "projects/:id" , { id : '@id' } , {
                update : {
                    method : 'PUT' // this method issues a PUT request
                },
                query : {
                    method : 'GET',
                    isArray : true
                },
                show : {
                    method : 'GET'
                }
            });
        }]);
})();