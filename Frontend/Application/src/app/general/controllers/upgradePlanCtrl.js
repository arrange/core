(function(){
    'use strict';
    angular
        .module('easywebapp')
        .controller('upgradePlanCtrl',function($rootScope,$scope,$state,Stripe,toastr,Auth){
            function executeUpgradePlan(){
                $scope.months = ['01','02','03','04','05','06','07','08','09','10','12'];
                $scope.years = [];
                for(var i = 2015;i<2050;i++){
                    $scope.years.push(i);
                }
                $scope.Payment = {};
                $scope.paymentPart = false;
                $scope.Payment.plan = "";
                $scope.Payment.planName = "";
                Stripe.getPlans().then(function(data){
                    $scope.plans = data.data;
                },function(){
                    $scope.plans = null;
                });
                $scope.showPaymentPart = function(plan_id,plan_name){
                    if( !$rootScope.User.stripe_subscription ) {
                        $scope.paymentPart = true;
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                    }
                    else
                    {
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                        Stripe.upgradePlan($scope.Payment).then(function(data){
                            toastr.success("Plan upgraded successfully");
                            Auth.setUser(data);
                            $state.go('dashboard');
                        },function(){
                            toastr.error("Something went wrong, Please try again");
                        });
                    }
                };
                $scope.hidePaymentPart = function(plan_id,plan_name){
                    $scope.paymentPart = false;
                    $scope.Payment.plan = "";
                    $scope.Payment.planName = "";
                };
                $scope.upgrade = function(){
                    if($scope.Payment.plan)
                    {
                        Stripe.upgradePlan($scope.Payment).then(function(data){
                            toastr.success("Plan upgraded successfully");
                            Auth.setUser(data);
                            $state.go('dashboard');
                        },function(){
                            toastr.error("Something went wrong, Please try again");
                        });
                    }
                };
                $scope.transactions = function(){
                    Stripe.getTransactions().then(function(data){
                        console.log(data);
                    },function(){
                        toastr.error("Something went wrong, Please try again");
                    });
                };
                $scope.cancelPlan = function(){
                    Stripe.cancelSubscription().then(function(data){
                        Auth.setUser(data);
                        $state.go('dashboard');
                    },function(){
                        toastr.error("Something went wrong, Please try again");
                    });
                }
            };
            if( $rootScope.User )
                executeUpgradePlan();
            else{
                $rootScope.$on('userInitialized',function(){
                    executeUpgradePlan();
                });
            }
        });
})();