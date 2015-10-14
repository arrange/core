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
                $scope.paymentPart = false;
                $scope.Payment = {};
                $scope.Payment.plan = "";
                $scope.Payment.planName = "";
                Stripe.getPlans().then(function(data){
                    $scope.plans = data.data;
                },function(){
                    $scope.plans = null;
                });
                $scope.showPaymentPart = function(plan_id,plan_name){
                    if( !$rootScope.User.ever_subscribed ) {
                        $scope.paymentPart = true;
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                    }
                    else
                    {
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                        Stripe.upgradePlan($scope.Payment).then(function(data){
                            if( $rootScope.User.stripe_active )
                                toastr.success("Plan upgraded successfully");
                            else
                                toastr.success("Plan resumed successfully");
                           // Auth.setUser(data);
                            window.location.reload();
                        },function(){
                            toastr.error("Something went wrong, Please try again");
                        });
                    }
                };
                $scope.hidePaymentPart = function(){
                    $scope.paymentPart = false;
                    $scope.Payment.plan = "";
                    $scope.Payment.planName = "";
                };
                $scope.upgrade = function(){
                    if($scope.Payment.plan)
                    {
                        Stripe.upgradePlan($scope.Payment).then(function(data){
                            toastr.success("Plan upgraded successfully");
                            //Auth.setUser(data);
                            window.location.reload();
                        },function(error){
                            if(error.status == 422 && error.data ){
                                angular.forEach(error.data,function(value,index){
                                        toastr.error(value[0]);
                                });
                            }
                            else
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
                       // Auth.setUser(data);
                        toastr.success("Plan cancelled successfully");
                        window.location.reload();
                        //$state.go('dashboard');
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
            };
        });
})();