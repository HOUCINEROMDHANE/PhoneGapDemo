Debug.logDebug("loading takepicture.js...");

//--------------------------
var TakePicture = function(parentDivId, filename, divId, left, top, right, bottom)
//--------------------------
{
	var loaded = false;

	//--------------------------
	var init = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.init ---");
		
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
		Debug.logDebug("--- TakePicture.startPage ---");

		initListeners();

		//---
		loaded = true;
	};
	
	//--------------------------
	var onSuccess = function(imageData)
	//--------------------------
	{
		$("#photoImage").css("display", "block");
		$("#photoImage").attr("src", imageData);
	}
	
	//--------------------------
	var onFail = function(message)
	//--------------------------
	{
	  //Debug.logDebug('Failed because: ' + message);
	}
	
	//--------------------------
	var capturePhoto = function()
	//--------------------------
	{
		navigator.camera.getPicture(onSuccess, onFail,
		{
			quality: 70,
			targetWidth: 800,
			targetHeight: 600
		});
	}
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.onResize ---");
		
		updatePosition();
	}
	
	//--------------------------
	var updatePosition = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.updatePosition ---");
		
		if (isVisible())
		{
			$("#" + divId + " #page-body").css("top", $("#" + divId + " #page-header").height() + "px");
			$("#" + divId + " #page-body").css("height", $("#mainContent").height() - $("#" + divId + " #page-header").height() - $("#" + divId + " #page-footer").height() + "px");
			$("#" + divId + " #title").css("width", $("#mainContent").width() - 124 - 5 + "px");
			$("#" + divId + " #takepicture-button").width($("#mainContent").width() - 10 + "px");
		}
	}
	
	//--------------------------
	var isLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.isLoaded ---, ", loaded);

		return loaded;
	};

	//--------------------------
	var start = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.start ---");
	};

	//--------------------------
	var initListeners = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.initListeners ---");
		
		$("#" + divId + " #takepicture-button").click(capturePhoto);
		
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
		Debug.logDebug("--- TakePicture.show ---");

		$("#" + divId).show();
		
		updatePosition();
	};
	
	//--------------------------
	var hide = function()
	//--------------------------
	{
		Debug.logDebug("--- TakePicture.hide ---");

		$("#" + divId).hide();
	};
	
	//--------------------------
	var isVisible = function()
	//--------------------------
	{
		Debug.logDebug("--- DirectionsPanelPredictiveGraph1.isVisible ---");
		
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
		hide:hide,
		isVisible:isVisible
	}
};