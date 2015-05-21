'use strict';

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller(
	'PhoneListCtrl',
	[
		'$scope',
		'$location',
		'Phone',
		function($scope, $location, Phone)
		{
			$scope.divId = "listview";
			$scope.iScroller = null;
			
			$scope.phones = Phone.query();
			$scope.orderProp = 'age';
			
			$scope.count = 0;
			$scope.lastRecord = false;
			
			//--------------------------
			$scope.executeWhenLast = function(isLast)
			//--------------------------
			{
				if (isLast)
				{
					$scope.lastRecord = true;
					//console.log("--- PhoneListCtrl.executeWhenLast ---");
					$scope.createScrollers();
				}
			};
			
			//--------------------------
			$scope.resize = function()
			//--------------------------
			{
				//console.log("--- PhoneListCtrl.resize ---");
				
				if ($("#" + $scope.divId).is(":visible"))
				{
					$scope.updateSize();
				}
			};
			
			//--------------------------
			$scope.createScrollers = function()
			//--------------------------
			{
				//console.log("--- PhoneListCtrl.createScrollers ---");
				
				if ($scope.iScroller!=null)
				{
					$scope.iScroller.destroy();
					$scope.iScroller=null;
				}
				
				$scope.iScroller = new IScroll("#" + $scope.divId + " #page-body", {
					mouseWheel: true,
					scrollbars: true
				});
				
				$("#" + $scope.divId + " #page-body ul .current").focus();
			};

			//--------------------------
			$scope.updateSize = function()
			//--------------------------
			{
				//console.log("--- PhoneListCtrl.updateSize ---");

				var localvar = "";
				
				$("#" + $scope.divId + " #page-body").css("top", $("#" + $scope.divId + " #page-header").height() + "px");
				$("#" + $scope.divId + " #page-body").css("height", $("#" + $scope.divId).height() - $("#" + $scope.divId + " #page-header").height() - $("#" + $scope.divId + " #page-footer").height() + "px");
				$("#" + $scope.divId + " #title").css("width", $("#" + $scope.divId).width() - 124 - 5 + "px");
				$("#" + $scope.divId + " #footer-text").width($("#" + $scope.divId).width() - 10 + "px");
				
				$scope.executeWhenLast($scope.lastRecord);
			};
			
			//--------------------------
			$scope.changeView = function(location)
			//--------------------------
			{
				//console.log("--- PhoneListCtrl.changeView ---");

				//alert("--- changeView ---, " + location);
				$location.path(location);
			};
			
			//--------------------------
			$scope.changeLocation = function(location)
			//--------------------------
			{
				//console.log("--- PhoneListCtrl.changeLocation ---");

				//alert("--- changeLocation ---, " + location);
				window.location = location
			};
		}
	]
);

phonecatControllers.controller(
	'PhoneDetailCtrl', 
	[
		'$scope', 
		'$location',
		'$routeParams', 
		'Phone',
		function($scope, $location, $routeParams, Phone)
		{
			$scope.divId = "phonedetails";
			$scope.iScroller = null;
			
			//--------------------------
			$scope.phone = Phone.get(
			//--------------------------
				{
					phoneId: $routeParams.phoneId
				},
				function(phone)
				{
					$scope.mainImageUrl = phone.images[0];
				}
			);

			//--------------------------
			$scope.setImage = function(imageUrl)
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.setImage ---");

				$scope.mainImageUrl = imageUrl;
			}
			
			//--------------------------
			$scope.resize = function()
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.resize ---");
				
				if ($("#" + $scope.divId).is(":visible"))
				{
					$scope.updateSize();
				}
			};

			//--------------------------
			$scope.createScrollers = function()
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.createScrollers ---");
				
				if ($scope.iScroller!=null)
				{
					$scope.iScroller.destroy();
					$scope.iScroller=null;
				}
				
				$scope.iScroller = new IScroll("#" + $scope.divId + " #page-body", {
					mouseWheel: true,
					scrollbars: true
				});
				
				$("#" + $scope.divId + " #page-body ul .current").focus();
			};

			//--------------------------
			$scope.updateSize = function()
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.updateSize ---");

				var localvar = "";
				
				$("#" + $scope.divId + " #page-body").css("top", $("#" + $scope.divId + " #page-header").height() + "px");
				$("#" + $scope.divId + " #page-body").css("height", $("#" + $scope.divId).height() - $("#" + $scope.divId + " #page-header").height() - $("#" + $scope.divId + " #page-footer").height() + "px");
				$("#" + $scope.divId + " #title").css("width", $("#" + $scope.divId).width() - 124 - 5 + "px");
				$("#" + $scope.divId + " #footer-text").width($("#" + $scope.divId).width() - 10 + "px");
				
				$scope.createScrollers();
			};
			
			//--------------------------
			$scope.changeView = function(location)
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.changeView ---");

				//alert("--- changeView ---, " + location);
				$location.path(location);
			};
			
			//--------------------------
			$scope.changeLocation = function(location)
			//--------------------------
			{
				//console.log("--- PhoneDetailCtrl.changeLocation ---");

				//alert("--- changeLocation ---, " + location);
				window.location = location
			};
		}
	]
);
