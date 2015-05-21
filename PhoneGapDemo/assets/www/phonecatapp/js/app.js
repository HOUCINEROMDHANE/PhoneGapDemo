'use strict';

/* App Module */
var JQueryReplacement = function(query)
{
	return angular.element(document.querySelector(query));
}		

var phonecatApp = angular.module(
	'phonecatApp',
	[
		'ngRoute',
		'phonecatAnimations',
		'phonecatControllers',
		'phonecatFilters',
		'phonecatServices'
	]
);

phonecatApp.config(
	[
		'$routeProvider',
		function($routeProvider)
		{
			$routeProvider.
			when(
				'/phones',
				{
					templateUrl: 'partials/phone-list.html',
					controller: 'PhoneListCtrl'
				}
			).
			when(
				'/phones/:phoneId',
				{
					templateUrl: 'partials/phone-detail.html',
					controller: 'PhoneDetailCtrl'
				}
			).
			otherwise(
			{
				redirectTo: '/phones'
			});
		}
	]
);
