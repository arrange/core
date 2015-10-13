(function(){
    'use strict';
    angular
        .module('easywebapp')
        .controller('editProfileCtrl',function($rootScope,$scope,Profile,toastr,$state){
            function executeEditProfile(){
                $scope.user = $rootScope.User;
                $scope.newUser = {};
                $scope.newUser.id = $rootScope.User.id;

                // Update Profile
                $scope.updateProfile = function(){
                    Profile.save($scope.user).then(function(resp){
                        toastr.success("Profile saved successfully");
                    },function(err){
                        angular.forEach(err,function(value,index){
                            toastr.error(value);
                        });
                       // $scope.user = $rootScope.User;
                    });
                };

                // Change Password
                $scope.changePassword = function(){
                    Profile.changePwd($scope.newUser).then(function(resp){
                        toastr.success("Password changed successfully");
                        $state.go('dashboard');
                    },function(err){
                        angular.forEach(err,function(value,index){
                            toastr.error(value);
                        });
                    });
                };
            }
            if( $rootScope.User ){
                executeEditProfile();
            }
            else{
                $rootScope.$on('userInitialized', function (event, args) {
                    executeEditProfile();
                });
            }
        });
})();