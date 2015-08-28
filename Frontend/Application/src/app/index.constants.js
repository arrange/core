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
            module : {
                auth : {
                    controller : 'app/auth/controllers',
                    view : 'app/auth/views'
                }
            }
        });
})();