(function(){
    'use strict';
    angular
        .module('easywebapp')
        .service('Stripe',function($q,$http,$config){
           this.getPlans = function(){
               var defer = $q.defer();
               $http.get($config.api+"stripe/plans").success(function(data){
                    defer.resolve(data);
               }).error(function(data){
                    defer.reject(data);
               });
               return defer.promise;
           };
           this.expiredPackage = function(data){
               return ( !data.ever_subscribed && !data.on_trial ) || ( data.ever_subscribed && data.expired ) || ( data.ever_subscribed && !data.stripe_active_int );
           };
            this.cancelSubscription = function(){
                var defer = $q.defer();
                $http.post($config.api+"stripe/cancel-subscription").success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            };
            this.getTransactions = function(){
                var defer = $q.defer();
                $http.get($config.api+"stripe/transactions").success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            };
            this.upgradePlan = function(data){
                var defer = $q.defer();
                $http.post($config.api+"stripe/change-plan",data).then(function(data){
                    defer.resolve(data);
                },function(data){
                    defer.reject(data);
                });
                return defer.promise;
            };
        });
})();