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
    .controller('HomeController', HomeController);

  function HomeController($routeParams, $location) {
    var vm = this;
    var productName = $routeParams.productId || null;
    productName = productName.match(/(\w+)-(\w+)/);

    console.log(productName);
    if (!productName || productName.length !== 3) {
      $location.path('/404/error');
      return;
    }

    vm.productName = [productName[1].toLowerCase(),
                      productName[2].toLowerCase()
                    ].join(' ');

    vm.next = function() {
      if (!vm.selectedIndex) {
        if (!vm.user ||
            !vm.user.name ||
            !vm.user.review ||
            !vm.user.review) {
          return;
        }
      }

      vm.selectedIndex += 1;
    };
  }

  HomeController.$inject = ['$routeParams', '$location'];
})();
