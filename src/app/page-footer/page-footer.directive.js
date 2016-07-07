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
    .directive('pageFooter', pageFooter);

  function pageFooter() {
    return {
      restrict: 'E',
      templateUrl: 'app/page-footer/page-footer.html'
    };
  }
}());
