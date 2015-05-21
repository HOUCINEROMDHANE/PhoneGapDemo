Debug.logDebug("loading background.js...");

//--------------------------
var Background = function(parentDivId, filename, divId, left, top, right, bottom)
//--------------------------
{
	loaded = false;
	
	currentBackground = "1";
	
	//--------------------------
	var init = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.init ---");

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
		Debug.logDebug("--- Background.startPage ---");

		initListeners();

		//---
		loaded = true;
	};
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.onResize ---");
	
		if (Demo.app.portraitMode)
		{
			//---
		}
		else
		{
			
		}
	}
	
	//--------------------------
	var isLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.isLoaded ---, ", loaded);

		return loaded;
	};

	//--------------------------
	var start = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.start ---");
	};

	//--------------------------
	var initListeners = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.initListeners ---");

	};
	
	//--------------------------
	var show = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.show ---");

		$("#" + divId).show();
	};
	
	//--------------------------
	var hide = function()
	//--------------------------
	{
		Debug.logDebug("--- Background.hide ---");

		$("#" + divId).hide();
	};

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