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
                $scope.showPaymentPart = function(plan_id,plan_name,$event){
                    if( !$rootScope.User.ever_subscribed ) {
                        $scope.paymentPart = true;
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                    }
                    else
                    {
                        $scope.Payment.plan = plan_id;
                        $scope.Payment.planName = plan_name;
                        $($event.target).attr('disabled','disabled');
                        Stripe.upgradePlan($scope.Payment).then(function(resp){
                            if( $rootScope.User.stripe_active )
                                toastr.success("Plan upgraded successfully");
                            else
                                toastr.success("Plan resumed successfully");
                            Auth.setUser(resp.data);
                            $($event.target).removeAttr('disabled');
                        },function(error){
                            if(error.status == 422 && error.data ){
                                angular.forEach(error.data,function(value,index){
                                    toastr.error(value[0]);
                                });
                            }
                            else
                                toastr.error("Something went wrong, Please try again");
                            $($event.target).removeAttr('disabled');
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
                        $('.btn-payment').attr('disabled','disabled');
                        Stripe.upgradePlan($scope.Payment).then(function(resp){
                            Auth.setUser(resp.data);
                            $scope.hidePaymentPart();
                            toastr.success("Plan upgraded successfully");
                            $('.btn-payment').removeAttr('disabled');
                        },function(error){
                            if(error.status == 422 && error.data ){
                                angular.forEach(error.data,function(value,index){
                                    toastr.error(value[0]);
                                });
                            }
                            else
                                toastr.error("Something went wrong, Please try again");
                            $('.btn-payment').removeAttr('disabled');
                        });
                    }
                };
                $scope.transactions = function(){
                    $state.go('transactions');
                };
                $scope.cancelPlan = function($event){
                    $($event.target).attr('disabled','disabled');
                    Stripe.cancelSubscription().then(function(data){
                        Auth.setUser(data);
                        toastr.success("Plan cancelled successfully");
                        $($event.target).removeAttr('disabled');
                    },function(error){
                        if(error.status == 422 && error.data ){
                            angular.forEach(error.data,function(value,index){
                                toastr.error(value[0]);
                            });
                        }
                        else
                            toastr.error("Something went wrong, Please try again");
                        $($event.target).removeAttr('disabled');
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