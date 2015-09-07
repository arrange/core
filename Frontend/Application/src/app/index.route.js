(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider ,$config) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: $config.module.auth.view + 'sign_in.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: $config.module.general.view + "dashboard.html",
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard'
            })
            .state('add-project',{
                url : '/project/add' ,
                templateUrl : $config.module.general.view + 'addProject.html',
                controller : 'addProjectCtrl',
                controllerAs : 'project'
            });
        $urlRouterProvider.otherwise('/');
    }

})();