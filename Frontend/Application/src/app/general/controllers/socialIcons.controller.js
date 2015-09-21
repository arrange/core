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
            $scope.models.color = "#fff";
            $scope.models.bgcolor = "#999";
            $scope.models.font_size = '22px';
            $scope.models.open_in_new_tab = true;
            $scope.output = {};
            $scope.output.preview = "";
            $scope.output.changeCode = function(){
                var htmlText = $('.social-links').clone();
                var div = $('<div>');
                var div1 = $('<div>');
                div.html(htmlText);
                div.find('a').each(function(){
                    if( !$(this).hasClass('ng-hide') ){
                        $(this).removeClass('ng-scope');
                        $(this).removeAttr('ng-attr-target ng-repeat ng-show');
                        $(this).find('i').removeAttr('ng-class');
                        div1.append($(this));
                    }
                });
                $scope.output.preview = div1.html();
            };
            $scope.models.social_links = [
                    {
                        'name' : 'facebook',
                        'placeholder' : "Enter faceboook Url",
                        'background_color' : "#3B5998",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Facebook',
                        'href' : 'http://facebook.com/notrie',
                        'plain' : 'flaticon-facebook31',
                        'rounded' : 'flaticon-facebook29',
                        'circle' : 'flaticon-facebok',
                        'square' : 'flaticon-facebook53'
                    },
                    {
                        'name' : 'twitter',
                        'placeholder' : "Enter twitter Url",
                        'background_color' : "#55ACEE",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Twitter',
                        'href' : 'http://twitter.com/notrie',
                        'plain' : 'flaticon-twitter1',
                        'rounded' : 'flaticon-twitter47',
                        'circle' : 'flaticon-logo22',
                        'square' : 'flaticon-twitter25'
                    },
                    {
                        'name' : 'pinterest',
                        'placeholder' : "Enter Pinterest Url",
                        'background_color' : "#C8232C",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Pinterest',
                        'href' : '',
                        'plain' : 'flaticon-pinterest19',
                        'rounded' : 'flaticon-pinterest12',
                        'circle' : 'flaticon-socialnetwork159',
                        'square' : 'flaticon-pinterest24'
                    },
                    {
                        'name' : 'google',
                        'placeholder' : "Enter Google+ Url",
                        'background_color' : "#DD4B39",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Google+',
                        'href' : '',
                        'plain' : 'flaticon-google116',
                        'rounded' : 'flaticon-google2',
                        'circle' : 'flaticon-google110',
                        'square' : 'flaticon-google111'
                    },
                    {
                        'name' : 'instagram',
                        'placeholder' : "Enter Instagram Url",
                        'background_color' : "#3F729B",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Instagram',
                        'href' : '',
                        'plain' : 'flaticon-socialnetwork302',
                        'rounded' : 'flaticon-socialmedia11',
                        'circle' : 'flaticon-instagram13',
                        'square' : 'flaticon-socialnetwork301'
                    },
                    {
                        'name' : 'linkedin',
                        'placeholder' : "Enter Linkedin Url",
                        'background_color' : "#0E76A8",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Linkedin',
                        'href' : '',
                        'plain' : 'flaticon-socialnetwork168',
                        'rounded' : 'flaticon-linkedin24',
                        'circle' : 'flaticon-linkedin21',
                        'square' : 'flaticon-linkedin18'
                    },
                    {
                        'name' : 'Flickr',
                        'placeholder' : "Enter Flickr Url",
                        'background_color' : "#0063DC",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Flickr',
                        'href' : '',
                        'plain' : 'flaticon-flickr5',
                        'rounded' : 'flaticon-flickr19',
                        'circle' : 'flaticon-flickr7',
                        'square' : 'flaticon-socialnetwork287'
                    },
                    {
                        'name' : 'yelp',
                        'placeholder' : "Enter Yelp Url",
                        'background_color' : "#C41200",
                        'color' : "#FFFFFF",
                        'title' : 'Look us up on Yelp',
                        'href' : '',
                        'plain' : 'flaticon-yelp',
                        'rounded' : 'flaticon-yelp6',
                        'circle' : 'flaticon-yelp5',
                        'square' : 'flaticon-yelp7'
                    },
                    {
                        'name' : 'vimeo',
                        'placeholder' : "Enter Vimeo Url",
                        'background_color' : "#44BBFF",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Vimeo',
                        'href' : '',
                        'plain' : 'flaticon-social140',
                        'rounded' : 'flaticon-vimeo1',
                        'circle' : 'flaticon-vimeo3',
                        'square' : 'flaticon-socialnetwork288'
                    },
                    {
                        'name' : 'youtube',
                        'placeholder' : "Enter YouTube Url",
                        'background_color' : "#C4302B",
                        'color' : "#FFFFFF",
                        'title' : 'Follow us on Youtube',
                        'href' : '',
                        'plain' : 'flaticon-youtube28',
                        'rounded' : 'flaticon-video193',
                        'circle' : 'flaticon-youtube31',
                        'square' : 'flaticon-youtube32'
                    },
                    {
                        'name' : 'tumblr',
                        'placeholder' : "Enter Tumblr Url",
                        'background_color' : "#34526F",
                        'color' : "#FFFFFF",
                        'title' : 'Come visit our blog',
                        'href' : '',
                        'plain' : 'flaticon-logotype1',
                        'rounded' : 'flaticon-tumblr22',
                        'circle' : 'flaticon-tumblr19',
                        'square' : 'flaticon-socialnetwork291'
                    },
                    {
                        'name' : 'wordpress',
                        'placeholder' : "Enter Wordpress Blog Url",
                        'background_color' : "#1E8CBE",
                        'color' : "#FFFFFF",
                        'title' : 'Come visit our blog',
                        'href' : '',
                        'plain' : 'flaticon-logotype48',
                        'rounded' : 'flaticon-wordpress4',
                        'circle' : 'flaticon-wordpress15',
                        'square' : 'flaticon-socialnetwork323'
                    },
                    {
                        'name' : 'blog',
                        'placeholder' : "Enter Blog Feed Url",
                        'background_color' : "#C8232C",
                        'color' : "#FFFFFF",
                        'title' : 'Subscribe to our blog',
                        'href' : '',
                        'plain' : 'flaticon-web-feed1',
                        'rounded' : 'flaticon-rss45',
                        'circle' : 'flaticon-rss23',
                        'square' : 'flaticon-rss51'
                    },
                    {
                        'name' : 'mail',
                        'placeholder' : "mailto:your-email@domain.com",
                        'background_color' : "#C8232C",
                        'color' : "#FFFFFF",
                        'title' : 'Email us',
                        'href' : '',
                        'plain' : 'flaticon-dark4',
                        'rounded' : 'flaticon-email131',
                        'circle' : 'flaticon-dark5',
                        'square' : 'flaticon-dark6'
                    }
            ];
        });
})();