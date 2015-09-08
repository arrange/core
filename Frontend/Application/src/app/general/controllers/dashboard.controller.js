(function() {
    'use strict';
    angular
        .module('easywebapp')
        .controller('dashboardCtrl',[ 'Auth' , '$scope' , '$rootScope' , '$state' , 'Project' , '$config' , function( Auth , $scope , $rootScope , $state , Project , $config ){

            function executeDashborad()
            {
                $scope.User = $rootScope.User;
                $scope.addProject = function(){
                    $state.go('add-project');
                };
                $scope.token = Auth.getValue('token');
                Project.query().$promise.then(function (aProjects) {
                    $scope.projects = aProjects;
                }, function () {});
                $scope.project_thumb_url = $config.project_thumb_url;
            }

            if( $rootScope.User )
            {
                executeDashborad();
            }
            else
            {
                $rootScope.$on('userInitialized', function (event, args) {
                    executeDashborad();
                });
            }

    }]);
})();
