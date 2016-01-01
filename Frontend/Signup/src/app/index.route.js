(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', /* {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            },*/{
                url: '/start/:param1',
                templateUrl: 'app/auth/views/option.html',
                controller: 'AuthController',
                controllerAs: 'auth',
                params:{
                    'param1' : null
                }
            })
            .state('Signin',{
                url: '/signin',
                templateUrl: 'app/auth/views/sign_in.html',
                controller: 'SigninController',
                controllerAs: 'signin'
            })
            .state('Signup',{
                url: '/signup',
                templateUrl: 'app/auth/views/sign_up.html',
                controller: 'SignupController',
                controllerAs: 'signup',
                params:{
                    'user_name' : null,
                    'email' : null,
                    'google_sign_up' : false
                }
            })
            .state('Google',{
                url : '/google',
                templateUrl: 'app/auth/views/google.html',
                controller: 'SignupWithGoogle',
                controllerAs: 'sgoogle'
            });

        $urlRouterProvider.otherwise('/start');
    }

})();