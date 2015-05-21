Debug.logDebug("loading ScriptLoader");

//-------------------
var ScriptLoader =
//-------------------
{
	//-------------------
	start : function()
	//-------------------
	{
		Debug.logDebug("--- ScriptLoader.start ---");
		
		//var versionHandler = "?" + MainConfig.version;
		var versionHandler = "";
		
		if (MainConfig.minificationProcess)
		{
			ScriptLoader.loadCSS("css/prod-min.css" + versionHandler);

			$LAB.script("js/prod-min.js" + versionHandler).wait(function()
			{
				Demo.start();
			});
		}
		else
		{
			var libCSS = [];
			var libJS = [];
			var mainCSS = [];
			var mainJS = [];

			$.ajax(
			{
				url: "js/bootloader/libraries-css-files.txt",
				async: false,
				dataType: "text",
				success: function (txt)
				{
					libCSS = txt.split("\n");
				}
			});

			$.ajax(
			{
				url: "js/bootloader/libraries-js-files.txt",
				async: false,
				dataType: "text",
				success: function (txt)
				{
					libJS = txt.split("\n");
				}
			});

			$.ajax(
			{
				url: "js/bootloader/main-css-files.txt",
				async: false,
				dataType: "text",
				success: function (txt)
				{
					mainCSS = txt.split("\n");
				}
			});

			$.ajax(
			{
				url: "js/bootloader/main-js-files.txt",
				async: false,
				dataType: "text",
				success: function (txt)
				{
					mainJS = txt.split("\n");
				}
			});
			
			//---
			var arrayCSS = [];
			var arrayJS = [];
			
			for (var i = 0; i < libCSS.length; i++)
			{
				var s = libCSS[i].trim();
				
				if (s!="")
				{
					arrayCSS.push(s + versionHandler);
				}
			}
			
			for (var i = 0; i < mainCSS.length; i++)
			{
				var s = mainCSS[i].trim();
				
				if (s!="")
				{
					arrayCSS.push(s + versionHandler);
				}
			}
			
			for (var i = 0; i < libJS.length; i++)
			{
				var s = libJS[i].trim();
				
				if (s!="")
				{
					arrayJS.push(s + versionHandler);
				}
			}
			
			for (var i = 0; i < mainJS.length; i++)
			{
				var s = mainJS[i].trim();
				
				if (s!="")
				{
					arrayJS.push(s + versionHandler);
				}
			}
			
			ScriptLoader.loadCSSFromArray(arrayCSS);
			$LAB.script(arrayJS).wait(function()
			{
				Demo.start();
			});
		}
	},
	
	//--------------------------
	isDefined : function(someObject)
	//--------------------------
	{
        //TrafficViewer.logDebug("-- TrafficViewer.Utils.isDefined ---");

		if ((typeof(someObject) != 'undefined') && (someObject != null))
		{
			return true;
		}
		else
		{
			return false;
		}
	},	
	//--------------------------
	loadCSSFromArray : function(cssArray)
	//--------------------------
	{
		for (var i = 0; i < cssArray.length; i++)
		{
			ScriptLoader.loadCSS(cssArray[i]);
		}
	},

	//--------------------------
	loadCSS : function(src)
	//--------------------------
	{
		var head = document.getElementsByTagName('head')[0],
		link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = src;
		head.appendChild(link);
	}
};