(function(){
    'use strict';
    angular
        .module('easywebapp')
        .controller('transactionCtrl',function($rootScope,$scope,$state,Stripe){
            function executeTransactions(){
                Stripe.getTransactions().then(function(data){
                    $scope.transactions = data.history;
                },function(){
                    toastr.error("Something went wrong, Please try again");
                });
                $scope.goToUpgradePlan = function(){
                    $state.go('upgradePlan');
                };
            }
            if( $rootScope.User )
                executeTransactions();
            else{
                $rootScope.$on('userInitialized',function(){
                    executeTransactions();
                });
            }
        });
})();