(function () {
    'use strict';

    angular.module('easywebapp')
        .controller('addProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', 'Preset', '$config', 'Auth', 'Project', 'toastr','Upload',
            function ($stateParams, $scope, $state, $rootScope, Preset, $config, Auth, Project, toastr,Upload) {

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
                            console.log(file.name.split('.')[1]);
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
                                    headers: {'token': Auth.getValue('token')},
                                    fields: ($scope.Project).toJSON(),
                                    file: $scope.zipFile,
                                    fileFormDataName: 'zipFile'
                                }).then(function(data){
                                    toastr.success('Project created successfully!', 'Success');
                                    $state.go('edit-project', {projectId: data.id});
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

                    $scope.goBack = function () {
                        $state.transitionTo('dashboard');
                    };
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
        .controller('editProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', '$config', 'Auth', 'Project', 'toastr', 'File',
            function ($stateParams, $scope, $state, $rootScope, $config, Auth, Project, toastr, File) {
                var user_id = Auth.getValue('id');
                var organization_id = Auth.getValue('organization_id');
                $scope.editHtml = "";
                $scope.editCss = "";
                $scope.editJs = "";
                $scope.ShowHtml = true;
                $scope.ShowCss = true;
                $scope.ShowJs = true;

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
                    function generatePreview() {
                        var ifrm = document.getElementById('preview');
                        ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
                        ifrm.document.open();
                        ifrm.document.write('<style class="text/css">' + $scope.editCss + '</style>' + $scope.editHtml + '<script type="text/javascript">' + $scope.editJs + '</script>' );
                        ifrm.document.close();
                    }

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
                            //console.log($scope.editHtml);
                            generatePreview();
                        }, function () {
                        });
                        File.index({mode: 'editFile', 'path': project.location + 'style.css'}).then(function (resp) {
                            $scope.editCss = resp;
                            generatePreview();
                        }, function () {
                        });
                        File.index({mode: 'editFile', 'path': project.location + 'main.js'}).then(function (resp) {
                            $scope.editJs = resp;
                            generatePreview();
                        }, function () {
                        });
                    }

                    $scope.saveFile = function()
                    {
                        var content = '<style class="text/css">' + $scope.editCss + '</style>' + $scope.editHtml + '<script type="text/javascript">' + $scope.editJs + '</script>';
                        File.index({mode: 'saveFile', 'path': $scope.Project.location + 'index.html' , 'text': $scope.editHtml }).then(function (resp) {}, function () {});
                        File.index({mode: 'saveFile', 'path': $scope.Project.location + 'style.css' , 'text': $scope.editCss }).then(function (resp) {}, function () {});
                        File.index({mode: 'saveFile', 'path': $scope.Project.location + 'main.js' , 'text': $scope.editJs }).then(function (resp) {}, function () {});
                        //File.index({mode: 'saveFile', 'path': $scope.Project.location + 'index1.html' , 'text': content }).then(function (resp) {
                        //}, function () {});
                        File.saveSnapShot({ 'id': $scope.Project.id }).then(function () {
                            toastr.success("Project saved successfully");
                        }, function () {
                            toastr.error("Unable to save file");
                        });
                    };

                    if (!$stateParams.projectId)
                        $state.go('dashboard');

                    Project.show({'id': $stateParams.projectId}).$promise.then(function (project) {
                        $scope.Project = project;
                        getFile($scope.Project);
                    }, function (data) {
                        $state.go('dashboard');
                        toastr.error();
                    });

                    $scope.token = Auth.getValue('token');

                    $scope.$watch('editHtml', function (oldVal,newVal) {
                        generatePreview();
                    });
                    $scope.$watch('editCss', function (oldVal,newVal) {
                        generatePreview();
                    });
                    $scope.$watch('editJs', function (oldVal,newVal) {
                        generatePreview();
                    });

                    $scope.goHome = function(){
                        $state.go('dashboard');
                    }
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