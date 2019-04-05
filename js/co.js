/*
 * co.js
 * Root namespace module
*/

var co = (function () {
  var initModule = function ($container) {
    co.shell.initModule($container);
  };
  return { initModule: initModule };
}());