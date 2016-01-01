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
           // api : "http://localhost/notrierepo/Backend/public/",
            api : "http://api.notrie.com/",
            domain: "notrie.com",
            module : {
                auth : {
                    controller : 'app/auth/controllers',
                    view : 'app/auth/views'
                }
            }
        });
})();