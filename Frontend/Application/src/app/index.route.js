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
                controllerAs : 'addproject'
            })
            .state('edit-project',{
                url : '/project/edit/:projectId' ,
                templateUrl : $config.module.general.view + 'editProject.html',
                controller : 'editProjectCtrl',
                controllerAs : 'editProject'
            })
            .state('profile',{
                url : '/edit-profile' ,
                templateUrl : $config.module.general.view + 'editProfile.html',
                controller : 'editProfileCtrl',
                controllerAs : 'editProfile'
            })
            .state('upgradePlan',{
                url : '/upgrade-plan',
                templateUrl : $config.module.general.view + 'upgradePlan.html',
                controller : 'upgradePlanCtrl',
                controllerAs : 'upgradePlan'
            })
            .state('transactions',{
                url : '/transactions',
                templateUrl : $config.module.general.view + 'transactions.html',
                controller : 'transactionCtrl',
                controllerAs : 'transactions'
            });
        $urlRouterProvider.otherwise('/');
    }

})();