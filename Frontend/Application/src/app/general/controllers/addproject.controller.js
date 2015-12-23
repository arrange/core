(function () {
    'use strict';

    angular.module('easywebapp')
        .controller('addProjectCtrl', ['$stateParams', '$scope', '$state', '$rootScope', 'Preset', '$config', 'Auth', 'Project', 'toastr','Upload','File',
            function ($stateParams, $scope, $state, $rootScope, Preset, $config, Auth, Project, toastr,Upload,File) {

                function executeProject() {
                    $scope.btnText = "Save";
                    $scope.enableSubmit = true;
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
                            $scope.enableSubmit = false;
                            $scope.btnText = "Saving..";
                            $scope.Project.zipFile = $scope.zipFile;
                            if( $scope.zipFile ) {
                                Upload.upload({
                                    url: $config.api + 'projects',
                                    method: 'POST',
                                    async : false,
                                    headers: {'token': Auth.getValue('token')},
                                    data : ($scope.Project).toJSON()
                                    /*fields: ($scope.Project).toJSON(),
                                    file: $scope.zipFile,
                                    fileFormDataName: 'zipFile'*/
                                }).then(function(resp){
                                    toastr.success('Project created successfully!', 'Success');
                                    $scope.enableSubmit = true;
                                    $scope.btnText = "Save";
                                    $state.go('edit-project', {projectId: resp.data.id});
                                },function(data){
                                    $scope.enableSubmit = true;
                                    $scope.btnText = "Save";
                                    if (data.data) {
                                        if (data.data.error)
                                            toastr.error(data.data.error);
                                        else
                                            toastr.error("Something went wrong , please try again");
                                    }
                                    else
                                        toastr.error("Something went wrong , please try again");
                                })
                            }
                            else {

                                $scope.Project.$save(function (data) {
                                    toastr.success('Project created successfully!', 'Success');
                                    $scope.enableSubmit = true;
                                    $scope.btnText = "Save";
                                    $state.go('edit-project', {projectId: data.id});
                                }, function (data) {
                                    $scope.enableSubmit = true;
                                    $scope.btnText = "Save";
                                    if (data.data)
                                        if (data.data.error)
                                            toastr.error(data.data.error);
                                })
                            }
                        }
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
})();