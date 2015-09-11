/* global malarkey:false, toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('easywebapp')
        .constant('malarkey', malarkey)
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('$config',{
            url : "http://localhost:3000/",
            api : "http://localhost/notrierepo/Backend/public/",
            preset_thumb_url :  "http://localhost/notrierepo/Backend/public/preset-thumb",
            project_thumb_url :  "http://localhost/notrierepo/Backend/public/preview/file",
           // api : "http://api.notrie.com/",
           // preset_thumb_url :  "http://api.notrie.com/preset-thumb",
           // project_thumb_url :  "http://api.notrie.com/preview/file",
            module : {
                auth : {
                    controller : 'app/auth/controllers/',
                    view : 'app/auth/views/'
                },
                general : {
                    controller : 'app/general/controller/',
                    view : 'app/general/views/'
                }
            }
        });
})();