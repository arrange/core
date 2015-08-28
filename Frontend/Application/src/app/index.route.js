(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/auth/views/sign_in.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })            
        $urlRouterProvider.otherwise('/');
    }

})();