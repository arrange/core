(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/auth/views/sign_in.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/auth/views/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard'
            });
        $urlRouterProvider.otherwise('/login');
    }

})();