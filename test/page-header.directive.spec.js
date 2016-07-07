'use strict';

describe('Directive: backButton', function() {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('app'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    // $httpBackend.when('GET', 'views/tmpl/app.html').respond(false);
    $httpBackend.whenGET('app/page-header/page-header.html').passThrough();

    // Compile a piece of HTML containing the directive
    // element.click();
  }));

  it('Replaces the element with the appropriate content', function() {
    element = $compile('<page-header></page-header>')($rootScope);
    $rootScope.$apply();
    expect(1).toBe(1);
    console.log(element);
    expect(element.html()).toContain('DrEd.com Product Review');
  });
});
