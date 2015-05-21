/**
 * Small library for handling HTML-templates.
 * Requires jQuery to be available.
 *
 */
(function(){

	// Generate a unique random mainly used for all the necessary
	// id-attributes of DOM-elements, to ensure the ids are unique across the DOM.
	//this.random = Math.random().toString().substr(2);

	var options = {
		assetEndpoint: 'assets/templates/'
	};


	this.tmpl = function(name, data, callback){

		var id = 'script#tmpl-'+name;
		templateName = name;

		var data = $.extend({
			//random: this.random

			// Generate a unique random mainly used for all the necessary
			// id-attributes of DOM-elements, to ensure the ids are unique across the DOM.
			random: Math.random().toString().substr(2)
		}, data);

		var onTemplateReady = function(){

			var html = all_the_magic($(id).html(), data);

			callback(html);
		}

		// check if the template has been loaded already.
		if ($(id).length <= 0)
		{
			// CAUTION! This section that loads the templates on demand is not yet supported by the Map Creator project!
			// Some further PHP logic is required that converts the HTML to JSON and supports JSONP.

			var url = options.assetEndpoint+name+'.html?' + MainConfig.version;

			// Load the html-skeleton of the Layer-widget
			//switching this from ajax to use get instead. Ajax is not loading the html files when the current url is different then the doc root.
			$.get(url, function(r, r1 , r2){
					$('<script>')
						.attr('type', 'text/html')
						.attr('id', 'tmpl-'+name)
						.appendTo('head')
						//.text(r);

					$(id).get(0).text = r2.responseText;
					//$(id).get(0).text = r;

					onTemplateReady();
				});

		}
		else{
			onTemplateReady();
		}
	};



	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licenseds
	var all_the_magic = function(str, data)
	{
		try
		{
			var the_function = "var p=[],print=function(){p.push.apply(p,arguments);};" +

				// Introduce the data as local variables using with(){}
				"with(obj){p.push('" +

				// Convert the template into pure JavaScript
//				str
//				.replace(/[\r\t\n]/g, " ")
//				.split("<!").join("\t")
//				.replace(/((^|!>)[^\t]*)'/g, "$1\r")
//				.replace(/\t=(.*?)!>/g, "',$1,'")
//				.split("\t").join("');")
//				.split("!>").join("p.push('")
//				.split("\r").join("\\'")
//				+ "');}return p.join('');");


				// Convert the template into pure JavaScript
				str
				  .replace(/<!--|&lt;:|\/\*/g, "<:")
				  .replace(/!-->|-->|:&gt;|\*\/|:="">/g, ":>")
				  .replace(/\r|\*+="/g, ' ')
				  .split('<:').join("\r")
				  .replace(/(?:^|:>)[^\r]*/g,
						   function(str){return str.replace(/'|\\/g, "\\$&").replace(/\n/g, "\\n");}
						  )
				  .replace(/\r=(.*?):>/g, "',$1,'")
				  .split("\r").join("');")
				  .split(':>').join("p.push('")
                 + "');}return p.join('');";

			//$.nvt.log('The function: ', the_function);

			var fn = new Function("obj", the_function);

			// Provide some basic currying to the user
			return data ? fn( data ) : fn;
		}
		catch(e)
		{
			alert('Tmpl Error on: ');
		}
	};
})();