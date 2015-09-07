(function () {
    'use strict';

    angular.module('easywebapp')
        .factory('Preset', ['$resource', '$config' , function ($resource, $config) {
            return $resource( $config.api + 'admin-presets/:id' , { id : '@id' },{
                update : {
                    method : 'PUT' // this method issues a put request
                },
                query : {
                    method : 'GET',
                    isArray : true
                }
            });
        }]);
})();