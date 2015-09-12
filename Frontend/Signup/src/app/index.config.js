(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(config);
        
    /** @ngInject */
    function config($logProvider, toastr , GooglePlusProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;

        GooglePlusProvider.init({
            clientId: '936897214783-ish3fnhk0h57a0rb9ilpvu7crt05e1qg.apps.googleusercontent.com',
            apiKey: '0uV5UjdHUMOAObLXHLcjHqFN'
        });

        GooglePlusProvider.setScopes('https://www.googleapis.com/auth/userinfo.email');
    }

})();