Debug.logDebug("loading googlemaps.js...");

//--------------------------
var GoogleMaps = function(parentDivId, filename, divId, left, top, right, bottom)
//--------------------------
{
	var loaded = false;
	
	// you can specify the default lat long
	var map;
	var currentPositionMarker;
	var mapCenter;
	var map;
	
	//--------------------------
	var init = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.init ---");

		// Load CSS
		//Utils.loadCSS("css/" + filename + ".css");

		// Load Html
		tmpl(filename,{}, function(html)
		{
			$("#" + parentDivId).append(html);

			if (left!=null)
			{
				$("#" + divId).css("left",left);
			}

			if (right!=null)
			{
				$("#" + divId).css("right",right);
			}

			if (top!=null)
			{
				$("#" + divId).css("top",top);
			}

			if (bottom!=null)
			{
				$("#" + divId).css("bottom",bottom);
			}

			startPage();
		});
	};

	//--------------------------
	var startPage = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.startPage ---");
		
		if (typeof(google) != 'undefined')
		{
			mapCenter = new google.maps.LatLng(14.668626, 121.24295);
		}
		
		initListeners();
		
		//---
		loaded = true;
	};
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.onResize ---");
	
		show();
	}
	
	//--------------------------
	var updatePosition = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.updatePosition ---");
		
		if (isVisible())
		{
			$("#" + divId + " #page-body").css("top", $("#" + divId + " #page-header").height() + "px");
			$("#" + divId + " #page-body").css("height", $("#mainContent").height() - $("#" + divId + " #page-header").height() - $("#" + divId + " #page-footer").height() + "px");
			$("#" + divId + " #title").css("width", $("#mainContent").width() - 124 - 5 + "px");
			$("#" + divId + " #footer-text").width($("#mainContent").width() - 10 + "px");
		}
	}
	
   // change the zoom if you want
	//--------------------------
	var initializeMap = function()
	//--------------------------
	{
		map = new google.maps.Map(document.getElementById('map_canvas'), {
		   zoom: 18,
		   center: mapCenter,
		   mapTypeId: google.maps.MapTypeId.ROADMAP
		 });
	}

	//--------------------------
	var locError = function(error)
	//--------------------------
	{
		// tell the user if the current position could not be located
		alert("The current position could not be found!");
	}

	//--------------------------
	// current position of the user
	//--------------------------
	var setCurrentPosition = function(pos)
	//--------------------------
	{
		currentPositionMarker = new google.maps.Marker(
			{
				map: map,
				position: new google.maps.LatLng(
					pos.coords.latitude,
					pos.coords.longitude
				),
				title: "Current Position"
			}
		);
		
		map.panTo(
			new google.maps.LatLng(
				pos.coords.latitude,
				pos.coords.longitude
			)
		);
	}

	//--------------------------
	var displayAndWatch = function(position)
	//--------------------------
	{
	 
		// set current position
		setCurrentPosition(position);
		 
		// watch position
		watchCurrentPosition();
	}

	//--------------------------
	var watchCurrentPosition = function()
	//--------------------------
	{
		var positionTimer = navigator.geolocation.watchPosition(
			function (position)
			{
				setMarkerPosition(
					currentPositionMarker,
					position
				);
			}
		);
	}

	//--------------------------
	var setMarkerPosition = function(marker, position)
	//--------------------------
	{
		marker.setPosition(
			new google.maps.LatLng(
				position.coords.latitude,
				position.coords.longitude
			)
		);
	}

	//--------------------------
	var initLocationProcedure = function()
	//--------------------------
	{
		if (typeof(google) != 'undefined')
		{
			initializeMap();
			
			if (navigator.geolocation)
			{
				navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
			}
			else
			{
				// tell the user if a browser doesn't support this amazing API
				alert("Your browser does not support the Geolocation API!");
			}
		}
		else
		{
			alert("Google Maps needs internet connection.")
		}
	}
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.onResize ---");
	
		if (Demo.app.portraitMode)
		{
			
		}
		else
		{
			
		}
	}
	
	//--------------------------
	var isLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.isLoaded ---, ", loaded);

		return loaded;
	};

	//--------------------------
	var start = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.start ---");
	};

	//--------------------------
	var initListeners = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.initListeners ---");
		
		$("#" + divId + " #back-button").click(function()
		{
			hide();
			Demo.app.listView.show();
		});
	};
	
	//--------------------------
	var show = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.show ---");

		$("#" + divId).show();
		
		updatePosition();
		
		initLocationProcedure();
	};
	
	//--------------------------
	var hide = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.hide ---");

		$("#" + divId).hide();
	};

	//--------------------------
	var isVisible = function()
	//--------------------------
	{
		Debug.logDebug("--- GoogleMaps.isVisible ---");
		
		return (
			$("#" + divId).is(":visible") ||
			($("#" + divId).css("display") == "block")
		);
	}

	init();
	
	return {
		startPage:startPage,
		onResize:onResize,
		isLoaded:isLoaded,
		start:start,
		initListeners:initListeners,
		show:show,
		hide:hide
	}
};