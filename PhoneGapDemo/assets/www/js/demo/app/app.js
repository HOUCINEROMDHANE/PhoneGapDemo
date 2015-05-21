Debug.logDebug("loading app.js...");

//--------------------------
var App = function()
//--------------------------
{
	var deviceReady = false;

	var portraitMode = true;
	
	var background = null;
	var listView = null;
	var takePicture = null;
	var googleMaps = null;
	
	//--------------------------
	var init = function()
	//--------------------------
	{
		Debug.logDebug("--- App.init ---");
		
		document.addEventListener('deviceready', onDeviceReady, false);
		
		window.onerror = function(message, url, lineNumber)
		{
			Debug.logDebug("====> Runtime Error happened, message: " + message + ", url: " + url + ", lineNumber: ", lineNumber);
		};
		
		background = new Background("mainContent", "background", "background", null, null, null, null);
		
		listView = new ListView("mainContent", "listview", "listview", null, null, null, null);
		
		takePicture = new TakePicture("mainContent", "takepicture", "takepicture", null, null, null, null);
		
		googleMaps = new GoogleMaps("mainContent", "googlemaps", "googlemaps", null, null, null, null);
	};

	//--------------------------
	var loadTemplates = function()
	//--------------------------
	{
		Debug.logDebug("--- App.loadTemplates ---");
		
	};
	
	//--------------------------
	var isClassesLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- App.isClassesLoaded ---");
		
		return true;
	};
	
	//--------------------------
	var isTemplatesLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- App.isTemplatesLoaded ---");
		
		return (
			background.isLoaded() &&
			listView.isLoaded() &&
			takePicture.isLoaded() &&
			googleMaps.isLoaded()
		);
	};

	//--------------------------
	var start = function()
	//--------------------------
	{
		Debug.logDebug("--- App.start ---");
		
		$(window).resize(
			function()
			{
				onResize();
			}
		);
		
		// $(window).unload(function()
		// {
			// reset();
		// });

		// $(window).onbeforeunload = function (e)
		// {
			// reset();
		// };

		//window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		
		listView.show();
		
		onResize();
	};
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- App.onResize ---");
		
		if (Demo.Utils.getWidth()<=Demo.Utils.getHeight())
		{
			portraitMode = true;
		}
		else
		{
			portraitMode = false;
		}

		background.onResize();
		listView.onResize();
		takePicture.onResize();
		googleMaps.onResize();
	};
	
	//--------------------------
    var onDeviceReady = function()
	//--------------------------
	{
        deviceReady=true;
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
    };
	
	init();
	
	return {
		loadTemplates:loadTemplates,
		isClassesLoaded:isClassesLoaded,
		isTemplatesLoaded:isTemplatesLoaded,
		start:start,
		onResize:onResize,
		onDeviceReady:onDeviceReady,
		background:background,
		listView:listView,
		takePicture:takePicture,
		googleMaps:googleMaps
	}
};