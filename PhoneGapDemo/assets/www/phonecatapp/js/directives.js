'use strict';

/* Directives */
phonecatApp.directive('updatesize', function ($window, $timeout)
{
  return {
    link: function postLink(scope, element, attrs)
	{
      var onResizeFunction = function()
	  {
		scope.resize();
      };

      angular.element($window).bind('resize', function()
	  {
        onResizeFunction();
        scope.$apply();
      });
	  
	  $timeout(onResizeFunction, 0);
    }
  };
});