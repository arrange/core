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
               var currentDate = new Date().getTime();
                if( data.trial_ends_at )
                {
                    if( data.trial_ends_at > currentDate )
                        return false;
                }
               if( data.subscription_ends_at )
               {
                   if( data.subscription_ends_at > currentDate )
                       return false;
               }
               return true;
           };
            this.expiredPackageTrial = function(data){
                var currentDate = new Date().getTime();
                if( data.trial_ends_at )
                {
                    if( data.trial_ends_at > currentDate )
                        return false;
                    return true;
                }
                return false;
            };
            this.expiredPackagePlan = function(data){
                var currentDate = new Date().getTime();
                if( data.subscription_ends_at )
                {
                    if( data.subscription_ends_at > currentDate )
                        return false;
                    return true;
                }
                return false;
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
                $http.post($config.api+"stripe/change-plan",data).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            };
        });
})();