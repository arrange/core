(function(window, angular) {
    "use strict";
    angular.module('FileManagerApp').service('fileUploader', ['$http', '$q', 'fileManagerConfig','$rootScope','Upload', function ($http, $q, fileManagerConfig,$rootScope,Upload) {

        function deferredHandler(data, deferred, errorMessage) {
            if (!data || typeof data !== 'object') {
                return deferred.reject('Bridge response error, please check the docs');
            }
            if (data.result && data.result.error) {
                return deferred.reject(data);
            }
            if (data.error) {
                return deferred.reject(data);
            }
            if (errorMessage) {
                return deferred.reject(errorMessage);
            }
            deferred.resolve(data);
        }

        this.requesting = false; 
        this.upload = function(fileList, path) {
            if (! window.FormData) {
                throw new Error('Unsupported browser version');
            }
            var self = this;
            //var form = new window.FormData();
            var deferred = $q.defer();
            //form.append('destination', '/' + $rootScope.selected_project.location + path.join('/'));
            //console.log(form);
            //for (var i = 0; i < fileList.length; i++) {
            //    var fileObj = fileList.item(i);
            //    fileObj instanceof window.File && form.append('file-' + i, fileObj);
            //}

            self.requesting = true;
            Upload.upload({
                url: fileManagerConfig.uploadUrl,
                data: {file: fileList[0], 'destination': $rootScope.selected_project.location + "/" + path.join('/')}
            }).then(function (resp) {
                deferredHandler(resp, deferred);
                self.requesting = false;
            }, function (resp) {
                deferredHandler(resp, deferred, 'Unknown error uploading files');
                self.requesting = false;
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $rootScope.$broadcast('upload:progress',{file:evt.config.data.file.name,progress:progressPercentage});
            });
            //$http.post(fileManagerConfig.uploadUrl, form, {
            //    transformRequest: angular.identity,
            //    headers: {
            //        "Content-Type": undefined
            //    }
            //}).success(function(data) {
            //    deferredHandler(data, deferred);
            //}).error(function(data) {
            //    deferredHandler(data, deferred, 'Unknown error uploading files');
            //})['finally'](function(data) {
            //    self.requesting = false;
            //});;

            return deferred.promise;
        };
    }]);
})(window, angular);