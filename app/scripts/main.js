/**
  DrEd.com Product review
  Copyright (c) 2016 by andreasonny83. All Rights Reserved.

  This code may only be used under the MIT style license.

  MIT license: https://andreasonny.mit-license.org/@2016/
*/
import version from './version';

(global => {
  global.VERSION = global.VERSION || {};
  var $version = global.VERSION;

  $version.name = 'dred-product-review';
  $version.version = version;
  $version.info = 'Developed by @andreasonny83. All right reserved.';

  console.log(['', $version.name, $version.version, $version.info].join('\n'));
})(window);
