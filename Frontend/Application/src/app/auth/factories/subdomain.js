(function() {
    'use strict';

    angular
        .module('easywebapp')
        .factory('Subdomain', ['$location', function ($location) {
        var host = $location.host();
        if (host.indexOf('.') < 0)
            return null;
        else
            return host.split('.')[0];
        }]);
})();