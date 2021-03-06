(function() {
    'use strict';

    angular
        .module('easywebapp')
        .config(config)

    /** @ngInject */
    function config($logProvider, toastr,$config,fileManagerConfigProvider,$httpProvider,$localStorageProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;

        fileManagerConfigProvider.set(
            $config.filemanager_settings
        );

        $httpProvider.interceptors.push('myHttpInterceptor');
        $localStorageProvider.set('html_file', '');
        $localStorageProvider.set('js_file', '');
        $localStorageProvider.set('css_file', '');
    }

})();