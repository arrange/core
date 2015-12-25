/* global malarkey:false, toastr:false, moment:false */
(function() {
    'use strict';
   // var api = "http://localhost/notrierepo/Backend/public/";
   // var api1 = "http://localhost/notrierepo/Backend/";
    var api = "http://api.notrie.com/";
    var api1 = "http://api1.notrie.com/";
    angular
        .module('easywebapp')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('$config',{
           // url : "http://localhost:3000/",
          //  preset_thumb_url :  "http://localhost/notrierepo/Backend/public/preset-thumb",
          //  project_thumb_url :  "http://localhost/notrierepo/Backend/public/preview/file",
          //  clients_path : "http://localhost/notrierepo/Backend/clients",
          //   api : "http://api.notrie.com/",
            api :  api,
            url : "http://notrie.com/",
            preset_thumb_url : api + "preset-thumb",
            clients_path : api1 + "clients",
            module : {
                auth : {
                    controller : 'app/auth/controllers/',
                    view : 'app/auth/views/'
                },
                general : {
                    controller : 'app/general/controller/',
                    view : 'app/general/views/'
                }
            },
            filemanager_settings:{
                 appName: 'Easy Web App',
                 defaultLang: 'en',

                 listUrl: api + 'handler',
                 uploadUrl: api + 'handler1',
                 renameUrl: api + 'handler',
                 copyUrl: api + 'handler',
                 removeUrl: api + 'handler',
                 editUrl: api + 'handler',
                 getContentUrl: api + 'handler',
                 createFolderUrl: api + 'handler',
                 downloadFileUrl: api + 'handler',
                 compressUrl: api + 'handler',
                 extractUrl: api + 'handler',
                 permissionsUrl: api + 'handler',

                 sidebar: false,
                 breadcrumb: true,
                 allowedActions: {
                     rename: true,
                     copy: false,
                     edit: false,
                     changePermissions: true,
                     compress: false,
                     compressChooseName: false,
                     extract: false,
                     download: true,
                     preview: false,
                     remove: true
                 },

                 enablePermissionsRecursive: true,
                 compressAsync: true,
                 extractAsync: true,

                 isEditableFilePattern: /\.(txt|html?|aspx?|ini|pl|py|md|css|js|log|htaccess|htpasswd|json|sql|xml|xslt?|sh|rb|as|bat|cmd|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb)$/i,
                 isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
                 isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i,
                 tplPath: 'app/filemanager/templates'
            }
        });
})();