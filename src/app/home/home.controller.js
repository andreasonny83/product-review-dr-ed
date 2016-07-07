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

  function HomeController($rootScope, $routeParams, $location, $mdToast) {
    var vm = this;

    /**
     * initialize the controller
     */
    function _init() {
      vm.toast = $mdToast;
      vm.secondLocked = true;
      vm.thirdLocked = true;
      $rootScope.done = false;
      vm.socials = ['Facebook', 'Twitter', 'LinkedIn'];
      vm.socialsSelected = [];
      var search = $location.search();
      var productName;

      // if (!search.product || !search.product.length) {
      //   $location.path('/404');
      //   return;
      // }

      productName = ['hello', 'world'];
      // productName = search.product.match(/(\w+)/g);

      // The product name is not valid
      // if (!productName || productName.length < 1) {
      //   $location.path('/404');
      //   return;
      // }

      productName.filter(function(val) {
        return val.toLowerCase();
      });

      vm.productName = productName.join(' ');
    }

    vm.publish = function() {
      $rootScope.done = true;
      $location.path('/done');
    };

    _init();
  }

  HomeController.prototype.next = function(isValid) {
    var vm = this;
    // If the form is not validated, show an error message
    if (!isValid) {
      vm.toast.show(
        vm.toast.simple().textContent(
          'You must fill all the required information first.'
        ));

      return;
    }
    if (vm.selectedIndex === 0) {
      vm.secondLocked = false;
    } else {
      vm.thirdLocked = false;
    }

    vm.selectedIndex += 1;
  };

  HomeController.prototype.toggleSocials = function(item) {
    var vm = this;
    var idx = vm.socialsSelected.indexOf(item);

    if (idx > -1) {
      vm.socialsSelected.splice(idx, 1);
    } else {
      vm.socialsSelected.push(item);
    }
  };

  HomeController.prototype.exists = function(item) {
    return this.socialsSelected.indexOf(item) > -1;
  };

  HomeController.$inject = ['$rootScope',
                            '$routeParams',
                            '$location',
                            '$mdToast'];
})();
