(function () {
    'use strict';
    angular
        .module('easywebapp')
        .factory('myHttpInterceptor', function ($q,$config,$injector,$rootScope) {
            return {
                // optional method
                'request': function (config) {
                    var Auth = $injector.get('Auth');
                    // do something on success
                    if( Auth.isLoggedIn() ) {
                        if ( config.data  && config.url == $config.api + "handler" ) {
                            config.headers.Token = Auth.getValue('token');
                            config.data = config.data.params;
                            if( $rootScope.selected_project && config.data && config.data.path.substring(0,$rootScope.selected_project.location.length) != $rootScope.selected_project.location){
                                config.data.path = $rootScope.selected_project.location + config.data.path;
                            }
                            if( config.data && config.data.mode == "rename" ){
                                config.data.newPath = $rootScope.selected_project.location + config.data.newPath;
                            }
                            if( config.data && $rootScope.filterByExtension ){
                                config.data.extension = $rootScope.filterByExtension;
                            }
                        }
                    }

                    return config;
                },

                // optional method
                'requestError': function (rejection) {
                    // do something on error
                    if (canRecover(rejection)) {
                        return responseOrNewPromise
                    }
                    return $q.reject(rejection);
                },


                // optional method
                'response': function (response) {
                    // do something on success
                    return response;
                },

                // optional method
                'responseError': function (rejection) {
                    // do something on error
                   /* if (canRecover(rejection)) {
                        return responseOrNewPromise
                    }*/
                    return $q.reject(rejection);
                }
            };
        });
})();
