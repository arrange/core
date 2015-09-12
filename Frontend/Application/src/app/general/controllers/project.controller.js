(function () {
    'use strict';

    angular.module('easywebapp')
        .controller('addProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', 'Preset', '$config', 'Auth', 'Project', 'toastr',
            function ($stateParams, $scope, $state, $rootScope, Preset, $config, Auth, Project, toastr) {

                function executeProject() {
                    $scope.Project = new Project();
                    $scope.presets = [];
                    $scope.preset_thumb_url = $config.preset_thumb_url;
                    $scope.token = Auth.getValue('token');
                    $scope.Project.preset_id = 0;
                    $scope.Project.user_id = Auth.getValue('id');
                    $scope.Project.organization_id = Auth.getValue('organization_id');

                    Preset.query().$promise.then(function (aPresets) {
                        $scope.presets = aPresets;
                    }, function () {
                    });

                    $scope.setPreset = function (id) {
                        $scope.Project.preset_id = id;
                    };

                    $scope.saveProject = function () {
                        $scope.Project.$save(function (data) {
                            toastr.success('Project created successfully!', 'Success');
                            $state.go('edit-project', {projectId: data.id});
                        }, function (data) {
                            if( data.data )
                                if ( data.data.error )
                                    toastr.error(data.data.error);
                        })
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
                            $scope.editHtml = resp;
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
                        File.index({mode: 'saveFile', 'path': $scope.Project.location + 'index1.html' , 'text': content }).then(function (resp) {
                            File.saveSnapShot({ 'id': $scope.Project.id }).then(function () {
                                toastr.success("Project saved successfully");
                            }, function () {
                                toastr.error("Unable to save file");
                            });
                        }, function () {});
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