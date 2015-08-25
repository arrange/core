(function() {
  'use strict';

  angular
    .module('easywebapp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
