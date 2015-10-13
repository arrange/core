/* global malarkey:false, toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('easywebapp')
        .constant('malarkey', malarkey)
        .value('froalaConfig', {
            inlineMode: true,
            placeholder: 'Enter Text Here'
        })
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('$config',{
            url : "http://localhost:3000/",
           // api : "http://localhost/notrierepo/Backend/public/",
           // preset_thumb_url :  "http://localhost/notrierepo/Backend/public/preset-thumb",
           // project_thumb_url :  "http://localhost/notrierepo/Backend/public/preview/file",
           // clients_path : "http://localhost/notrierepo/Backend/clients/",
            api : "http://api.notrie.com/",
            preset_thumb_url :  "http://api.notrie.com/preset-thumb",
            project_thumb_url :  "http://api.notrie.com/preview/file",
            clients_path : "http://api1.notrie.com/clients",
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