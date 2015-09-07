(function () {
    'use strict';

    angular.module('easywebapp')
        .controller('addProjectCtrl', ['$scope', '$state', '$rootScope', 'Preset', '$config', 'Auth', 'Project', 'toastr' ,
            function ($scope, $state, $rootScope, Preset, $config, Auth, Project , toastr) {
                $scope.Project = new Project();
                $scope.presets = [];
                $scope.preset_thumb_url = $config.preset_thumb_url;
                $scope.token = Auth.getValue('token');
                $scope.Project.preset_id = 0;
                $scope.Project.user_id = Auth.getValue('id');
                $scope.Project.organization_id = Auth.getValue('organization_id');

                Preset.query().$promise.then(function (aPresets) {
                    $scope.presets = aPresets;
                }, function () {});

                $scope.setPreset = function (id) {
                    $scope.Project.preset_id = id;
                };

                $scope.saveProject = function () {
                    console.log($scope.Project);
                    $scope.Project.$save(function () {
                        toastr.success('Project created successfully!', 'Success');
                    }, function (data) {
                        toastr.error(data);
                    })
                };
            }]);
})();