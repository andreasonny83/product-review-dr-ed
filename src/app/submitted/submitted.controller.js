/**
  DrEd.com Product review
  Copyright (c) 2016 by andreasonny83. All Rights Reserved.

  This code may only be used under the MIT style license.

  MIT license: https://andreasonny.mit-license.org/@2016/
*/

(function() {
  'use strict';

  angular
    .module('app')
    .controller('SubmittedController', SubmittedController);

  function SubmittedController($rootScope, $location) {
    /**
     * initialize the controller
     */
    function _init() {
      if (!$rootScope.done) {
        $location.path('/404/error');
      }
    }

    _init();
  }

  SubmittedController.$inject = ['$rootScope', '$location'];
})();
