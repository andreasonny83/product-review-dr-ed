/**
  DrEd.com Product review
  Copyright (c) 2016 by andreasonny83. All Rights Reserved.

  This code may only be used under the MIT style license.

  MIT license: https://andreasonny.mit-license.org/@2016/
*/

(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngSanitize',
      'ngAnimate',
      'ngMaterial',
      'angular-input-stars'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider) {

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .when('/404', {
        templateUrl: '404.html'
      })
      .when('/done', {
        templateUrl: 'app/submitted/submitted.html',
        controller: 'SubmittedController',
        controllerAs: 'sbCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }
})();
