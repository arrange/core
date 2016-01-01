(function(){
    'use strict';
    /* add proper href and src to link and script tag */
    function filterHtml(project,resp,$config,organization_id,user_id){
        var div = $('<div>');
        div.html(resp);
        div.find('*').each(function(){
            var href = $(this).attr('href');
            var src = $(this).attr('src');
            if( $(this).is('a') ){
                if( href && href != "#" && href.substr(0,4) != "http" && href.substr(0,2) != "\/\/")
                    $(this).attr("href","#");
            }
            else if( href && href != "#"  && href.substr(0,4) != "http" && href.substr(0,5) != "https" && href.substr(0,2) != "//")
                $(this).attr('href',$config.clients_path + "/" + organization_id + "/" + user_id + "/" + project.original_location + href );
            else if( src && src != "#" && src.substr(0,2) != "//" && src.substr(0,4) != "http" && src.substr(0,5) != "https" && src.substr(0,2) != "//") {
                $(this).attr('src', $config.clients_path + "/" + organization_id + "/" + user_id + "/" + project.original_location + src);
            }
        });
        return div.html();
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    angular.module('easywebapp')
        .controller('editProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', '$config', 'Auth', 'Project', 'toastr', 'File','$uibModal', '$localStorage' ,
            function ($stateParams, $scope, $state, $rootScope, $config, Auth, Project, toastr, File, $uibModal , $localStorage) {
                /* codemirror related code start */
                var __codeMirrorEditor;
                $scope.codemirrorLoaded = function(_editor) {
                    _editor.setSize("100%",180);
                    __codeMirrorEditor = _editor;
                };
                /* html editor options */
                $scope.editorOptions1 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'blackboard',
                    mode:'htmlmixed',
                    htmlMode : true
                };
                /* css editor options */
                $scope.editorOptions2 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'blackboard',
                    mode:'css'
                };
                /* js editor options */
                $scope.editorOptions3 = {
                    lineWrapping : true,
                    lineNumbers: true,
                    theme:'blackboard',
                    mode:'javascript'
                };
                /* codemirror related code end */

                /* Social Icon Generate - open model code */
                $scope.socialIcons = function() {
                    $uibModal.open({
                        templateUrl: $config.module.general.view + "socialIcons.modal.html",
                        controller: 'SocialIconCtrl',
                        size: 'lg'
                    });
                };

                /* executed once angular get user object */
                function executeProject() {

                    var user_id = Auth.getValue('id');
                    var organization_id = Auth.getValue('organization_id');
                    var ProjectObject = {};
                    $scope.token = Auth.getValue('token');
                    $scope.project_name = "";

                    /* conten holders */
                    $scope.editHtml = "";
                    $scope.editCss = "";
                    $scope.editJs = "";
                    $scope.previeHtml = "";

                    /* flag for hide/show editors */
                    $scope.ShowHtml = true;
                    $scope.ShowCss = true;
                    $scope.ShowJs = true;

                    /* full path name holders */
                    $scope.html_file=$localStorage.html_file;
                    $scope.css_file=$localStorage.css_file;
                    $scope.js_file=$localStorage.js_file;

                    /* extension related files holders */
                    $scope.html_list="";
                    $scope.css_list="";
                    $scope.js_list="";

                    /* toggle one of the editor part code */
                    $scope.togglePart = function(extension){
                        $scope['Show'+capitalizeFirstLetter(extension)] = !$scope['Show'+capitalizeFirstLetter(extension)];
                    };

                    /* Show design view */
                    $scope.showDesignView = function(){
                        $localStorage.html_file = $scope.html_file;
                        $localStorage.css_file = $scope.css_file;
                        $localStorage.js_file = $scope.js_file;

                        $state.go('edit-project-design',{projectId:ProjectObject.id});
                    };

                    /* code for browse files */
                    function showFileManager(project) {
                        $rootScope.selected_project = project;
                        $scope.browseFile = function (extension) {
                            $rootScope.filterByExtension = extension;
                            $uibModal.open({
                                templateUrl: $config.module.general.view + "filemanager.modal.html",
                                controller: 'filemanagerCtrl',
                                size: 'lg',
                                resolve: {
                                    projectData: function () {
                                        return project;
                                    }
                                }
                            }).result.then(function(item){
                                if( item && item.name ){
                                    if( item.currentPathMain.substring(0,1) == "\\" )
                                        item.currentPathMain = project.location + item.currentPathMain;
                                    else
                                        item.currentPathMain = project.location + "\\" + item.currentPathMain;
                                    var name_parts = item.name.split(".");
                                    if( name_parts.length > 1 ){
                                        if( name_parts[name_parts.length - 1] == "css" ) {
                                            $scope.editCss = item.content;
                                            $scope.css_file = item.currentPathMain;
                                        }
                                        else if( name_parts[name_parts.length - 1] == "html" ) {
                                            $scope.html_file = item.currentPathMain;
                                            $scope.editHtml = filterHtml(project,item.content,$config,user_id,organization_id);
                                            generatePreview();
                                        }
                                        else if( name_parts[name_parts.length - 1] == "js" ) {
                                            $scope.editJs = item.content;
                                            $scope.js_file = item.currentPathMain;
                                        }
                                    }
                                }
                            });
                        };
                    }

                    /* get html,css,js file content */
                    function getFileContent(extension){
                        if( $scope[extension+'_file'] )
                        {
                            File.index({ mode: 'editfile', 'path': $scope[extension+'_file'] }).then(function (resp) {
                                if( extension == "html" ) {
                                    $scope.editHtml = filterHtml(ProjectObject, resp.result, $config, user_id, organization_id);
                                    setTimeout(function(){
                                        generatePreview();
                                    },100);
                                }
                                else
                                    $scope['edit'+capitalizeFirstLetter(extension)] = resp.result;
                            },function(){
                                toastr.error("Unable to load file");
                            });
                        }
                        else{
                            $scope['edit'+ capitalizeFirstLetter(extension)] = "";
                        }
                    };

                    /* get all <extnsion> specific files of project */
                    function getFileList(extension){
                        $scope[extension+'_list'] = "";
                        File.getFiles({ filter: extension, location: ProjectObject.original_location }).then(function (resp) {
                            $scope[extension+'_list'] = resp;
                            $scope[extension+'_file'] = resp[0];
                            getFileContent(extension);
                        },function(error){
                        });
                    };

                    /* save file inside <extenstion>_file */
                    function saveFile(extension){
                        if( $scope[extension+'_file'] ) {
                            File.index({
                                'mode': 'savefile',
                                'path': $scope[extension+'_file'] ,
                                'content': $scope['edit'+capitalizeFirstLetter(extension)]
                            }).then(function (resp) {
                                File.saveSnapShot({'id': ProjectObject.id}).then(function () {
                                    toastr.success($scope[extension+'_file'] + " saved successfully");
                                    generatePreview();
                                }, function () {
                                    toastr.error("Unable to save file");
                                });
                            }, function () {
                            });
                        }
                    };

                    /* generate preview of html file */
                    function generatePreview() {
                        var ifrm = document.getElementById('preview');
                        ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
                        ifrm.document.open();
                        ifrm.document.write($scope.editHtml);
                        ifrm.document.close();
                    };
                    $scope.renderPreview = generatePreview;

                    /* If not get project id then redirect to dahboard */
                    if (!$stateParams.projectId)
                        $state.go('dashboard');

                    /* Save all 3 Files */
                    $scope.save = function(){
                      saveFile('html');
                      saveFile('css');
                      saveFile('js');
                    };

                    /* show project related content */
                    Project.show({'id': $stateParams.projectId}).$promise.then(function (project) {
                        ProjectObject = project;
                        ProjectObject.original_location = project.location;
                        ProjectObject.location = ProjectObject.location.substring(0, ProjectObject.location.length - 1)
                        $scope.project_name = project.name;

                        if( $localStorage.html_file != "" )
                            getFileContent('html');
                        else
                            getFileList('html');

                        if( $localStorage.css_file != "" )
                            getFileContent('css');
                        else
                            getFileList('css');

                        if( $localStorage.js_file != "" )
                            getFileContent('js');
                         else
                            getFileList('js');

                        showFileManager(ProjectObject);
                    }, function (data) {
                        $state.go('dashboard');
                        toastr.error('unable to load project'+ $stateParams.projectId);
                    });
                }

                if ($rootScope.User) {
                    executeProject();
                }
                else {
                    $rootScope.$on('userInitialized', function (event, args) {
                        executeProject();
                    });
                }
            }])
        .controller('editProjectDesignCtrl',function($scope,$rootScope,$state,Project,$config,File,$stateParams,Auth,$localStorage){
            function executeProject1(){
                $scope.editContent = "";
                var user_id = Auth.getValue('id');
                var organization_id = Auth.getValue('organization_id');
                if (!$stateParams.projectId)
                    $state.go('dashboard');

                function getFile(project) {
                    /*File.index({mode: 'editFile', 'path': project.location + 'index.html'}).then(function (resp) {
                        $scope.editContent = filterHtml(project,resp,$config,organization_id,user_id);
                    }, function () {
                    });*/
                    File.index({ mode: 'editfile', 'path': $localStorage.html_file }).then(function (resp) {
                        $scope.editContent = filterHtml(project, resp.result, $config, user_id, organization_id);
                    },function(){
                        toastr.error("Unable to load file");
                    });
                }

                Project.show({'id': $stateParams.projectId}).$promise.then(function (project) {
                    $scope.project = project;
                    getFile(project);
                    $scope.showDevelopmentMode = function(){
                        $state.go('edit-project' ,{ projectId : project.id });
                    }
                }, function (data) {
                    $state.go('dashboard');
                    toastr.error('unable to load project');
                });

                $scope.showDevelopView = function(extension){
                    $state.go('edit-project',{projectId: project.id});
                };

                $scope.saveFile = function()
                {
                   /* File.index({mode: 'saveFile', 'path': $scope.project.location + 'index.html' , 'text': $scope.editContent }).then(function (resp) {
                        generateSnapShot( $scope.project.id ).then(function(){
                            toastr.success("Project saved successfully");
                        });
                    }, function () {
                        toastr.error("Unable to save file");
                    });*/
                    File.index({
                        'mode': 'savefile',
                        'path': $localStorage.html_file ,
                        'content': $scope.editContent
                    }).then(function (resp) {
                        File.saveSnapShot({'id': $scope.project.id}).then(function () {
                            toastr.success($localStorage.html_file + " saved successfully");
                        }, function () {
                            toastr.error("Unable to save file");
                        });
                    }, function () {
                    });
                };
            };
            if ($rootScope.User) {
                executeProject1();
            }
            else {
                $rootScope.$on('userInitialized', function (event, args) {
                    executeProject1();
                });
            }
        });
})();