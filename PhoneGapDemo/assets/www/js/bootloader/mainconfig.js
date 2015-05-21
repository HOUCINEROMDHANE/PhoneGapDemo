var MainConfigLibrary =
{
	"DEV": {
		version: "",
		versionDate: "",
		versionTime: "",

		activeConsoleLogs: false,
		minificationProcess: false
	},

	"PROD": {
		version: "1.00",
		versionDate: "",
		versionTime: "",

		activeConsoleLogs: false,
		minificationProcess: true
	}
};

var MainConfig = MainConfigLibrary[Environment];