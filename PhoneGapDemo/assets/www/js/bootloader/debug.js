//--------------------------
var Debug = 
//--------------------------
{
	logsCounter : 0,
	
	//--------------------------
    logDebug : function (message, param1, param2, param3, param4, param5)
	//--------------------------
	{
        if (MainConfig.activeConsoleLogs)
		{
            if (param5)
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message, param1, param2, param3, param4, param5);
            }
			else if (param4)
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message, param1, param2, param3, param4);
            }
			else if (param3)
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message, param1, param2, param3);
            }
			else if (param2)
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message, param1, param2);
            }
			else if (param1)
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message, param1);
            }
			else
			{
                console.log("[" + (Debug.logsCounter++) + "] " + message);
            }
        }
    }
};

Debug.logDebug("loading debug.js...");
