Debug.logDebug("loading demo.js...");

var pictureSource;
var destinationType; 

//--------------------------
var Demo =
//--------------------------
{
	app: null,
	
	start: function()
	{
		Debug.logDebug("--------------> Loading Application <-----------");
		
		var waitForApp = function()
		{
			if (!ScriptLoader.isDefined(Demo.app))
			{
				Debug.logDebug("--------------> waitForApp <-----------");
				setTimeout(waitForApp, 50);
				return;
			}

			Debug.logDebug("--------------> waitForApp Finished <-----------");

			//--- --------------------------- ---
			var waitForClasses = function()
			{
				if (!Demo.app.isClassesLoaded())
				{
					Debug.logDebug("--------------> waitForClasses <-----------");
					setTimeout(waitForClasses, 50);
					return;
				}

				Debug.logDebug("--------------> waitForClasses Finished <-----------");

				//--- --------------------------- ---
				var waitForTemplates = function()
				{
					if (!Demo.app.isTemplatesLoaded())
					{
						Debug.logDebug("--------------> waitForTemplates <-----------");
						setTimeout(waitForTemplates, 50);
						return;
					}

					Debug.logDebug("--------------> waitForTemplates Finished <-----------");

					Demo.app.start();
				}
				
				Demo.app.loadTemplates();
				waitForTemplates();
			}

			waitForClasses();
		}

		Demo.app = new App();
		waitForApp();
	}
};
