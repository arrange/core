(function(){
    'use strict';


    angular.module('easywebapp')
        .factory('httpRequestInterceptor',function($rootScope,$injector){
            return {
                request: function($config) {
                    var Auth = $injector.get('Auth');
                    if( Auth.isLoggedIn() ) {
                        console.log('x');
                        $config.headers['Token'] = Auth.getValue('token');
                    }
                    return $config;
                }
            }
        });
})();