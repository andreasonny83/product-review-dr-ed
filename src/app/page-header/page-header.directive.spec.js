'use strict';

describe('page header', function() {
  beforeEach(module('app'));

  it('Render Header', function($compile, $rootScope) {
    var element = $compile('<page-header></page-header>')($rootScope);
    expect(element).toContain('DrEd.com Product Review');
  });
});
