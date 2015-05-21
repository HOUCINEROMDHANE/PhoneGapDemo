Debug.logDebug("loading utils.js...");

//--------------------------
Demo.Utils =
//--------------------------
{
	//--------------------------
	loadCSS : function(src)
	//--------------------------
	{
		if (!MainConfig.minificationProcess)
		{
			var head = document.getElementsByTagName('head')[0],
			link = document.createElement('link');
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = src + "?" + MainConfig.version;
			head.appendChild(link);
		}
	},

	//--------------------------
	isDefined : function(someObject)
	//--------------------------
	{
		if (typeof(someObject) != 'undefined')
		{
			if (someObject != null)
			{
				return true;
			}
			
			return false;
		}
		else
		{
			return false;
		}
	},
	
	//--------------------------
	getWidth : function()
	//--------------------------
	{
		return $("#mainContent").width();
	},

	//--------------------------
	getHeight : function()
	//--------------------------
	{
		return $("#mainContent").height();	
	}
};
