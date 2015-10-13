(function () {
    'use strict';

    angular.module('easywebapp')
        .controller('addProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', 'Preset', '$config', 'Auth', 'Project', 'toastr','Upload','File',
            function ($stateParams, $scope, $state, $rootScope, Preset, $config, Auth, Project, toastr,Upload,File) {

                function executeProject() {
                    $scope.Project = new Project();
                    $scope.presets = [];
                    $scope.preset_thumb_url = $config.preset_thumb_url;
                    $scope.token = Auth.getValue('token');
                    $scope.Project.preset_id = -1;
                    $scope.Project.user_id = Auth.getValue('id');
                    $scope.Project.organization_id = Auth.getValue('organization_id');
                    $scope.zipFile = null;
                    $scope.uploadFiles = function(file) {
                        if( file ) {
                            //console.log(file.name.split('.')[1]);
                            if (file.name.split('.')[1] == "zip" || file.name.split('.')[1] == "ZIP") {
                                $scope.zipFile = file;
                            }
                            else
                            {
                                toastr.error("Only zip files allowed");
                                return false;
                            }
                        }
                    };
                    Preset.query().$promise.then(function (aPresets) {
                        $scope.presets = aPresets;
                    }, function () {
                    });

                    $scope.setPreset = function (id) {
                        $scope.Project.preset_id = id;
                    };

                    $scope.saveProject = function () {
                        var valid = false;
                        if( $scope.Project.type == "zip" ){
                            if( $scope.zipFile )
                                valid = true;
                            else{
                                toastr.error('Zip file is required');
                            }
                        }
                        else if( $scope.Project.type == "template" ){
                            $scope.zipFile = null;
                            if( $scope.Project.preset_id > 0 ) {
                                valid = true;
                            }
                            else
                                toastr.error("Select Preset");
                        }
                        else if( $scope.Project.type == "blank" ){
                            $scope.zipFile = null;
                            valid = true;
                        }
                        if( valid ) {
                            if( $scope.zipFile ) {
                                Upload.upload({
                                    url: $config.api + 'projects',
                                    method: 'POST',
                                    async : false,
                                    headers: {'token': Auth.getValue('token')},
                                    fields: ($scope.Project).toJSON(),
                                    file: $scope.zipFile,
                                    fileFormDataName: 'zipFile'
                                }).then(function(resp){
                                    toastr.success('Project created successfully!', 'Success');
                                    $state.go('edit-project', {projectId: resp.data.id});
                                },function(data){

                                })
                            }
                            else {
                                $scope.Project.$save(function (data) {
                                    toastr.success('Project created successfully!', 'Success');
                                    $state.go('edit-project', {projectId: data.id});

                                }, function (data) {
                                    if (data.data)
                                        if (data.data.error)
                                            toastr.error(data.data.error);
                                })
                            }
                        }
                    };

                    /*$scope.goHome = function () {
                        $state.transitionTo('dashboard');
                    };*/
                }

                if ($rootScope.User) {
                    executeProject();
                }
                else {
                    $rootScope.$on('userInitialized', function (event, args) {
                        executeProject();
                    });
                }

            }]);
    angular.module('easywebapp')
        .controller('editProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', '$config', 'Auth', 'Project', 'toastr', 'File','$modal',
            function ($stateParams, $scope, $state, $rootScope, $config, Auth, Project, toastr, File, $modal) {
                var user_id = Auth.getValue('id');
                var organization_id = Auth.getValue('organization_id');
                $scope.editHtml = "";
                $scope.editCss = "";
                $scope.editJs = "";
                $scope.ShowHtml = true;
                $scope.ShowCss = true;
                $scope.ShowJs = true;

                var __codeMirrorEditor;

                $scope.codemirrorLoaded = function(_editor) {
                    _editor.setSize("100%",200);
                    __codeMirrorEditor = _editor;
                }

                $scope.socialIcons = function() {
                    $modal.open({
                        templateUrl: $config.module.general.view + "socialIcons.modal.html",
                        controller: 'SocialIconCtrl',
                        size: 'lg'
                    });
                };

                $scope.editorOptions1 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'abcdef',
                    mode:'htmlmixed',
                    htmlMode : true
                };
                $scope.editorOptions2 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'abcdef',
                    mode:'css'
                };
                $scope.editorOptions3 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'abcdef',
                    mode:'javascript'
                };
                $scope.css_file="";
                $scope.js_file="";
                $scope.css_list="";
                $scope.js_list="";
                $scope.toggleHtml = function(){
                    $scope.ShowHtml = !$scope.ShowHtml;
                };
                $scope.toggleCss = function(){
                    $scope.ShowCss = !$scope.ShowCss;
                };
                $scope.toggleJs = function(){
                    $scope.ShowJs = !$scope.ShowJs;
                };


                function executeProject() {

                    function getFile(project) {
                        File.index({mode: 'editFile', 'path': project.location + 'index.html'}).then(function (resp) {
                            var div = $('<div>');
                            div.html(resp);
                            div.find('*').each(function(){
                                var href = $(this).attr('href');
                                var src = $(this).attr('src');
                                if( $(this).is('a') )
                                {
                                    if( $(this).attr('href') != "#" && $(this).attr('href').substr(0,4) != "http")
                                        $(this).attr("href","#");
                                }
                                else if( href && href != "#" && href.substr(0,2) != "//" && href.substr(0,4) != "http" )
                                    $(this).attr('href',$config.clients_path + "/" + organization_id + "/" + user_id + "/" + project.location + href );
                                else if( src && src != "#" && src.substr(0,2) != "//" && src.substr(0,4) != "http")
                                    $(this).attr('src',$config.clients_path + "/" + organization_id + "/" + user_id + "/" + project.location + src );
                            });
                            $scope.editHtml = div.html();
                            generatePreview();
                        }, function () {
                        });
                    }

                    function getCssFile(project){
                        $scope.css_list = "";
                        File.getFiles({filter: 'css', location: project.location }).then(function (resp) {
                            $scope.css_list = resp;
                            $scope.css_file = resp[0];
                            $scope.cssChange();
                        },function(error){
                        });
                    };

                    function getJsFile(project){
                        $scope.js_list = "";
                        File.getFiles({filter: 'js', location: project.location }).then(function (resp) {
                            $scope.js_list = resp;
                            $scope.js_file = resp[0];
                            $scope.jsChange();
                        },function(error){

                        });
                    };

                    function generatePreview() {
                        var ifrm = document.getElementById('preview');
                        ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
                        ifrm.document.open();
                        /* ifrm.document.write("<link href='bower_components/ckeditor/skins/kama/editor.css' rel='stylesheet'><script src='bower_components/jquery/dist/jquery.min.js'></script><script src='bower_components/ckeditor/ckeditor.js'></script><script></script><div contenteditable='true' id='a_a_test_1'>"+$scope.editHtml+"</textarea><script>CKEDITOR.disableAutoInline = true;CKEDITOR.inline( 'a_a_test_1' );</script>");
                         if( !first )
                         ifrm.document.write($scope.editHtml);
                         else {
                         ifrm.document.write($scope.editHtml + '<div class="script-holder"><link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css" /><script src="bower_components/jquery/dist/jquery.min.js"></script><link rel="stylesheet" href="bower_components/FroalaWysiwygEditor/css/froala_editor.min.css" /><link rel="stylesheet" href="bower_components/FroalaWysiwygEditor/css/froala_content.min.css" /><link rel="stylesheet" href="bower_components/FroalaWysiwygEditor/css/froala_style.min.css" /><script src="bower_components/FroalaWysiwygEditor/js/froala_editor.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/block_styles.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/char_counter.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/colors.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/entities.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/file_upload.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/font_family.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/font_size.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/fullscreen.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/inline_styles.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/lists.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/media_manager.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/tables.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/urls.min.js"></script><script src="bower_components/FroalaWysiwygEditor/js/plugins/video.min.js"></script><script>$(function() {$("body").editable({inlineMode: true}); $("body").on("editable.blur", function (e, editor) {parent.postMessage($("body").editable("getHTML", true, true),location);});});</script></div>');
                         first = 0;
                         }*/
                        ifrm.document.write($scope.editHtml);
                        ifrm.document.close();
                    };

                    function generateSnapShot(project_id){
                        return File.saveSnapShot({'id': project_id}).then(function () {
                        }, function () {
                            toastr.error("Unable to save snapshot");
                        });
                    };

                    $scope.cssChange = function(){
                        if( $scope.css_file )
                        {
                            File.index({ mode: 'editFile', 'path': $scope.css_file }).then(function (resp) {
                                $scope.editCss = resp;
                            },function(){
                                toastr.error("Unable to load file");
                            });
                        }
                        else{
                            $scope.editCss = "";
                        }
                    };
                    $scope.jsChange = function(){
                        if( $scope.js_file )
                        {
                            File.index({ mode: 'editFile', 'path': $scope.js_file }).then(function (resp) {
                                $scope.editJs = resp;
                            },function(){
                                toastr.error("Unable to load file");
                            });
                        }
                        else{
                            $scope.editJs = "";
                        }
                    };
                    $scope.saveCss = function(){
                        if( $scope.css_file ) {
                            File.index({
                                mode: 'saveFile',
                                'path': $scope.css_file ,
                                'text': $scope.editCss
                            }).then(function (resp) {
                                File.saveSnapShot({'id': $scope.Project.id}).then(function () {
                                    toastr.success("css saved successfully");
                                    generatePreview();
                                }, function () {
                                    toastr.error("Unable to save file");
                                });
                            }, function () {
                            });
                        }
                    };
                    $scope.saveJs = function(){
                        if( $scope.js_file ) {
                            File.index({
                                mode: 'saveFile',
                                'path': $scope.js_file ,
                                'text': $scope.editjs
                            }).then(function (resp) {
                                File.saveSnapShot({'id': $scope.Project.id}).then(function () {
                                    toastr.success("js saved successfully");
                                }, function () {
                                    toastr.error("Unable to save file");
                                });
                            }, function () {
                            });
                        }
                    };

                    $scope.saveFile = function()
                    {
                        File.index({mode: 'saveFile', 'path': $scope.Project.location + 'index.html' , 'text': $scope.editHtml }).then(function (resp) {
                            generateSnapShot( $scope.Project.id ).then(function(){
                                toastr.success("Project saved successfully");
                            });
                        }, function () {
                            toastr.error("Unable to save file");
                        });
                    };

                    if (!$stateParams.projectId)
                        $state.go('dashboard');

                    Project.show({'id': $stateParams.projectId}).$promise.then(function (project) {
                        $scope.Project = project;
                        getFile($scope.Project);
                        getCssFile($scope.Project);
                        getJsFile($scope.Project);
                    }, function (data) {
                        $state.go('dashboard');
                        toastr.error('unable to load project'+ $stateParams.projectId);
                    });

                    $scope.token = Auth.getValue('token');

                    $scope.renderPreview = generatePreview;
                    /*$scope.$watch('editHtml', function (oldVal,newVal) {
                      //  generatePreview();
                    });*/

                    /*$scope.goHome = function(){
                        $state.go('dashboard');
                    };*/

                    /*var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                    var eventer = window[eventMethod];
                    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

                    // Listen to message from child window
                     eventer(messageEvent,function(e) {
                     var fullHtml = '<html>'+$('iframe').contents().find('html').html()+'</html>';
                     var testhtml = $(fullHtml).find('.froala-view').html();
                     var holder = $('<div />');
                     holder.append(testhtml);
                     // console.log($(fullHtml).find('.froala-view').html());
                     holder.find('.script-holder').remove();
                     testhtml = holder.html();
                     $scope.$apply(function(){
                     $scope.editHtml = testhtml;
                     });

                     },false);*/

                    /*$scope.reindentCode = function(){
                        for (var i=0;i<__codeMirrorEditor.lineCount();i++) { __codeMirrorEditor.indentLine(i); }
                    };*/
                }


                if ($rootScope.User) {
                    executeProject();
                }
                else {
                    $rootScope.$on('userInitialized', function (event, args) {
                        executeProject();
                    });
                }

            }]);
})();