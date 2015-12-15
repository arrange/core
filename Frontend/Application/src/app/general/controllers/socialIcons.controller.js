(function () {
    'use strict';

    angular
        .module('easywebapp')
        .controller('SocialIconCtrl', function ($config, $state, Auth, $scope, $rootScope, toastr, $stateParams,$uibModalInstance) {
            $scope.close = function(){
                $uibModalInstance.close();
            };

            $scope.sliders = {};
            $scope.sliders.sliderValue = 50;

            $scope.testOptions = {
                min: 0,
                max: 100,
                step: 1
            };

            $scope.models = {};
            $scope.models.facebook_link = "http://facebbook.com/";
            $scope.models.twitter_link = "http://twitter.com/";
            $scope.models.styleicon = "plain";
            $scope.models.monochrome = 'monochrome';
            $scope.models.color = "#fff";
            $scope.models.bgcolor = "#999";
            $scope.models.open_in_new_tab = true;
            $scope.output = {};
            var preview1 = ".social-links a{ float: left; text-align: center; margin-left:5px; color:#999; text-decoration: none; }" +  "\n" + ".social-links a:hover{ text-decoration: none; }";
            $scope.output.preview = preview1 + '\n' + '<a href="http://facebook.com/notrie" class="glyph a-social" title="Follow us on Facebook" target="_blank" style="">'+'\n   '+'<i class="glyph-icon  flaticon-facebook31" style="color:#999;font-size:50px;"></i>'+'\n'+'</a>'+'\n'+'<a href="http://twitter.com/notrie" class="glyph a-social" title="Follow us on Twitter" target="_blank" style="">'+'\n   '+'<i class="glyph-icon  flaticon-twitter1" style="color:#999;font-size:50px;"></i>'+'\n'+'</a>';
            $scope.success = function(){ console.log('success'); };
            $scope.fail = function(err){ console.log(err); };

            var changeCode1 =  function(){
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
                        div1.append("\n");
                    }
                });
                $scope.output.preview = preview1 +  "\n" +  div1.html();
            };
            $scope.output.changeCode = changeCode1;

            $scope.output.avail = false;
            $scope.availFuncForTab2 = function() {
                if( !$scope.output.avail ) {
                    $scope.$watch(function ($newVal, $oldVal) {
                        $scope.output.changeCode();
                    });
                    $scope.output.avail = true;
                }
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
