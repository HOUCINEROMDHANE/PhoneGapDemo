Debug.logDebug("loading listview.js...");

//--------------------------
var ListView = function(parentDivId, filename, divId, left, top, right, bottom)
//--------------------------
{
	var loaded = false;

	var iScroller = null;
	
	//--------------------------
	var init = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.init ---");

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
		Debug.logDebug("--- ListView.startPage ---");

		initListeners();
		
		//---
		loaded = true;
	};
	
	//--------------------------
	var onResize = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.onResize ---");
	
		show();
	}
	
	//--------------------------
	var createScrollers = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.createScrollers ---");
		
		if (iScroller!=null)
		{
			iScroller.destroy();
			iScroller=null;
		}
		
		iScroller = new IScroll("#" + divId + " #page-body", {
			mouseWheel: true,
			scrollbars: true
		});
		
		$("#" + divId + " #page-body ul .current").focus();
	}
	
	//--------------------------
	var updatePosition = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.updatePosition ---");
		
		if (isVisible())
		{
			$("#" + divId + " #page-body").css("top", $("#" + divId + " #page-header").height() + "px");
			$("#" + divId + " #page-body").css("height", $("#mainContent").height() - $("#" + divId + " #page-header").height() - $("#" + divId + " #page-footer").height() + "px");
			$("#" + divId + " #title").width($("#mainContent").width() - 10 + "px");
			$("#" + divId + " #footer-text").width($("#mainContent").width() - 10 + "px");
			
			createScrollers();
		}
	}
	
	//--------------------------
	var isLoaded = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.isLoaded ---, ", loaded);

		return loaded;
	};

	//--------------------------
	var start = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.start ---");
	};

	//--------------------------
	var initListeners = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.initListeners ---");
		
		$("#listview-demo1").click(function()
		{
			hide();
			Demo.app.takePicture.show();
		});
		
		$("#listview-demo2").click(function()
		{
			hide();
			Demo.app.googleMaps.show();
		});
		
		$("#listview-demo3").click(function()
		{
			hide();
			location.href="phonecatapp/index.html";
		});
	};
	
	//--------------------------
	var show = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.show ---");
		
		$("#" + divId).show();
		
		updatePosition();
	};
	
	//--------------------------
	var hide = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.hide ---");
		
		$("#" + divId).hide();
	};

	//--------------------------
	var isVisible = function()
	//--------------------------
	{
		Debug.logDebug("--- ListView.isVisible ---");
		
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