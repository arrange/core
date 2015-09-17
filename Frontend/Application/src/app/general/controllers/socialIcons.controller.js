(function () {
    'use strict';

    angular
        .module('easywebapp')
        .controller('SocialIconCtrl', function ($config, $state, Auth, $scope, $rootScope, toastr, $stateParams,$modalInstance) {
            $scope.close = function(){
                $modalInstance.close();
            };
            $scope.models = {};
            $scope.models.facebook_link = "http://facebbook.com/";
            $scope.models.twitter_link = "http://twitter.com/";
            $scope.models.styleicon = "plain";
            $scope.models.monochrome = 'monochrome';
            $scope.models.color = "";
            $scope.models.font_size = '22px';
            $scope.models.open_in_new_tab = true;
            $scope.models.social_links = [
                    {
                        'name' : 'facebook',
                        'class' : "fa-facebook",
                        'placeholder' : "Enter faceboook Url",
                        'background_color' : "#3B5998",
                        'color' : "#FFFFFF",
                        'title' : '',
                        href: ''
                    },
                    {
                        'name' : 'twitter',
                        'class' : "fa-twitter",
                        'placeholder' : "Enter twitter Url",
                        'background_color' : "#55ACEE",
                        'color' : "#FFFFFF",
                        'title' : '',
                        href: ''
                    },
                    {
                        'name' : 'pinterest',
                        'class' : "fa-pinterest-p",
                        'placeholder' : "Enter twitter Url",
                        'background_color' : "#C8232C",
                        'color' : "#FFFFFF",
                        'title' : '',
                        href: ''
                    }
            ];
        });
})();
